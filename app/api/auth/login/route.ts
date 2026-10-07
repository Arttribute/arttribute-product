import { NextResponse, type NextRequest } from "next/server";
import { STATE_COOKIE, cookieOptions, isSignInConfigured, issuer, seal, siteOrigin } from "@/lib/session";

function safeNext(value: string | null) {
  return value && value.startsWith("/admin") && !value.startsWith("//") && !value.includes("\\") ? value : "/admin";
}

export async function GET(request: NextRequest) {
  if (!isSignInConfigured()) {
    return NextResponse.redirect(new URL("/admin/sign-in?error=config", request.url));
  }
  const origin = siteOrigin(request.url);
  // Start on the callback host so the state cookie is there when Commons returns.
  if (request.nextUrl.origin !== origin) {
    return NextResponse.redirect(new URL(request.nextUrl.pathname + request.nextUrl.search, origin));
  }

  const state = crypto.randomUUID();
  const verifier = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64url");
  const challenge = Buffer.from(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)),
  ).toString("base64url");
  const redirect = `${origin}/api/auth/callback`;
  const next = safeNext(request.nextUrl.searchParams.get("next"));

  const url = new URL(`${issuer()}/oauth2/authorize`);
  url.search = new URLSearchParams({
    client_id: process.env.COMMONS_IDENTITY_CLIENT_ID!,
    redirect_uri: redirect,
    response_type: "code",
    scope: "openid profile email",
    resource: process.env.COMMONS_IDENTITY_AUDIENCE ?? "commons-platform",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  }).toString();

  const response = NextResponse.redirect(url);
  response.cookies.set(STATE_COOKIE, await seal({ state, verifier, redirect, next }, "10m"), {
    ...cookieOptions,
    maxAge: 600,
  });
  return response;
}
