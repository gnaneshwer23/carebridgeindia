import { connection } from "next/server";
import Link from "next/link";
import { ProviderForm } from "@/components/provider-form";

export const instant = false;

export default async function NewProviderPage() {
  await connection();
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Link href="/coordinator/providers" className="text-sm underline">
          Providers
        </Link>
        <h1 className="text-4xl">Add a provider</h1>
      </div>
      <ProviderForm provider={null} />
    </div>
  );
}
