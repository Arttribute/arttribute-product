import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { isDatabaseConfigured } from "@/lib/db";
import { isAdmin, readSession } from "@/lib/session";

export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const session = await readSession();
  if (!session) redirect("/admin/sign-in");
  if (!isAdmin(session)) redirect("/admin/sign-in?error=denied");

  return (
    <AdminShell user={{ name: session.name, email: session.email, picture: session.picture ?? null }}>
      {isDatabaseConfigured() ? (
        children
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          The database is not configured. Set MONGODB_URI for this deployment, then reload.
        </div>
      )}
    </AdminShell>
  );
}
