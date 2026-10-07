import { NextResponse, type NextRequest } from "next/server";
import { STATE_COOKIE, exchange, issuer, siteOrigin, startSession, unseal } from "@/lib/session";

type PendingSignIn = { state: string; verifier: string; redirect: string; next: string };

export async function GET(request: NextRequest) {
  const origin = siteOrigin(request.url);
  try {
    const pending = await unseal<PendingSignIn>(request.cookies.get(STATE_COOKIE)?.value ?? "");
    const code = request.nextUrl.searchParams.get("code");
    if (!code || pending.state !== request.nextUrl.searchParams.get("state")) {
      throw new Error("Sign-in state did not match.");
    }

    const token = await exchange(
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        code_verifier: pending.verifier,
        redirect_uri: pending.redirect,
      }),
    );
    const info = await fetch(`${issuer()}/oauth2/userinfo`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(15_000),
    });
    if (!info.ok) throw new Error("Could not read the Commons account.");
    const user = (await info.json()) as {
      sub?: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      picture?: string;
    };
    if (!user.sub || !user.email || user.email_verified === false) {
      throw new Error("The Commons account needs a verified email.");
    }

    await startSession({
      sub: user.sub,
      email: user.email,
      name: user.name?.trim() || user.email,
      picture: user.picture ?? null,
    });
    const response = NextResponse.redirect(new URL(pending.next, origin));
    response.cookies.delete(STATE_COOKIE);
    return response;
  } catch (error) {
    console.error("[auth] callback failed:", error instanceof Error ? error.message : error);
    const response = NextResponse.redirect(new URL("/admin/sign-in?error=failed", origin));
    response.cookies.delete(STATE_COOKIE);
    return response;
  }
}
