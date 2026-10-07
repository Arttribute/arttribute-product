import "server-only";
import { EncryptJWT, jwtDecrypt } from "jose";
import { cookies } from "next/headers";

/**
 * Admin sign-in uses Commons Identity, the same account people use for Agent
 * Commons and CommonLab. The site keeps only who signed in, sealed in an
 * encrypted cookie. It never stores Commons access tokens.
 */

export const SESSION_COOKIE = "arttribute-admin";
export const STATE_COOKIE = "arttribute-oauth";
const SESSION_HOURS = 12;

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
  picture?: string | null;
};

export const issuer = () =>
  (process.env.COMMONS_IDENTITY_ISSUER ?? "https://auth.agentcommons.io/api/auth").replace(/\/$/, "");

export function isSignInConfigured() {
  return Boolean(
    process.env.COMMONS_IDENTITY_CLIENT_ID &&
      process.env.COMMONS_IDENTITY_CLIENT_SECRET &&
      (process.env.SESSION_SECRET?.length ?? 0) >= 32,
  );
}

async function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters.");
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret)));
}

export async function seal(data: Record<string, unknown>, ttl: string) {
  return new EncryptJWT(data)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(ttl)
    .encrypt(await key());
}

export async function unseal<T>(value: string): Promise<T> {
  return (await jwtDecrypt(value, await key())).payload as T;
}

export async function startSession(session: AdminSession) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, await seal(session, `${SESSION_HOURS}h`), {
    ...cookieOptions,
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function readSession(): Promise<AdminSession | null> {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const session = await unseal<AdminSession>(value);
    return session.sub && session.email ? session : null;
  } catch {
    return null;
  }
}

/** Admins are listed by email or Commons account id in ADMIN_EMAILS / ADMIN_SUBJECTS. */
export function isAdmin(session: Pick<AdminSession, "sub" | "email"> | null) {
  if (!session) return false;
  const list = (name: string) =>
    (process.env[name] ?? "")
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean);
  return list("ADMIN_EMAILS").includes(session.email.toLowerCase()) || list("ADMIN_SUBJECTS").includes(session.sub.toLowerCase());
}

export class AdminError extends Error {}

/** Every admin action and route calls this first. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await readSession();
  if (!session || !isAdmin(session)) throw new AdminError("You need to sign in as an admin.");
  return session;
}

export async function exchange(body: URLSearchParams) {
  body.set("client_id", process.env.COMMONS_IDENTITY_CLIENT_ID ?? "");
  body.set("client_secret", process.env.COMMONS_IDENTITY_CLIENT_SECRET ?? "");
  body.set("resource", process.env.COMMONS_IDENTITY_AUDIENCE ?? "commons-platform");
  const response = await fetch(`${issuer()}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error("Commons sign-in failed.");
  return (await response.json()) as { access_token: string };
}

/** The public origin the identity provider redirects back to. */
export function siteOrigin(requestUrl: string) {
  return new URL(process.env.SITE_URL ?? requestUrl).origin;
}
