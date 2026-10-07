import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CubeMark } from "@/components/site/logo";
import { isAdmin, isSignInConfigured, readSession } from "@/lib/session";

export const metadata: Metadata = { title: "Sign in" };

const MESSAGES: Record<string, string> = {
  failed: "Sign-in did not finish. Please try again.",
  config:
    "Commons sign-in is not set up for this site yet. Add the Commons Identity client to the environment.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const session = await readSession();
  if (session && isAdmin(session))
    redirect(next?.startsWith("/admin") ? next : "/admin");
  const denied = session && !isAdmin(session);
  const configured = isSignInConfigured();
  const message = error
    ? MESSAGES[error]
    : !configured
      ? MESSAGES.config
      : null;
  const loginHref = `/api/auth/login${next ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-page px-4">
      <div className="relative w-full max-w-sm animate-rise rounded-md border border-border bg-white p-7 shadow-floating">
        <CubeMark className="h-9" />
        <h1 className="mt-5 text-xl font-medium tracking-[-0.025em] text-stone-950">
          Arttribute admin
        </h1>
        <p className="mt-1.5 text-sm leading-6 text-stone-600">
          Sign in with your Commons account, the same one you use for Agent
          Commons and CommonLab.
        </p>

        {denied ? (
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            You are signed in as {session.email}, which does not have admin
            access. Ask an admin to add you, or sign in with another account.
          </div>
        ) : null}
        {message ? (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {message}
          </div>
        ) : null}

        {denied ? (
          <form action="/api/auth/logout" method="post" className="mt-6">
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-lg border border-border bg-white text-sm font-medium text-stone-800 shadow-card hover:bg-muted"
            >
              Sign out
            </button>
          </form>
        ) : (
          <a
            href={configured ? loginHref : undefined}
            aria-disabled={!configured}
            className={
              configured
                ? "mt-6 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-sm font-medium text-white transition-colors hover:bg-stone-800"
                : "mt-6 flex h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-stone-200 text-sm font-medium text-stone-500"
            }
          >
            Continue with Commons
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        )}

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 text-xs text-stone-500 transition-colors hover:text-stone-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Back to arttribute.io
        </Link>
      </div>
    </main>
  );
}
