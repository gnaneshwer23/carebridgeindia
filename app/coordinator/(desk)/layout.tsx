import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/lib/actions/staff";
import { getStaffSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const instant = false;

export default async function DeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const staff = await getStaffSession();
  if (!staff) redirect("/coordinator/login");
  return (
    <div className="min-h-full bg-background">
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <Link href="/coordinator" className="font-serif text-xl">
            Coordinator queue
          </Link>
          <p className="text-sm text-muted-foreground">
            {staff.name} · validation workspace · no live providers
          </p>
        </div>
        <form action={logout}>
          <Button type="submit" variant="secondary" className="h-11 px-4">
            Sign out
          </Button>
        </form>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-5 py-8">
        {children}
      </main>
    </div>
  );
}
