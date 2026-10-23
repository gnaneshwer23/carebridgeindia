import { DemoProvider } from "@/components/demo/provider";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <DemoProvider>{children}</DemoProvider>;
}
