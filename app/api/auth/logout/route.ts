import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, STATE_COOKIE } from "@/lib/session";

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const response = NextResponse.redirect(new URL("/admin/sign-in", request.url), 303);
  response.cookies.delete(SESSION_COOKIE);
  response.cookies.delete(STATE_COOKIE);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
