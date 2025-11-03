import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Separator } from "src/components";
import { useAppSelector } from "src/app/hooks";

type RootLayoutProps = {
  children: ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  const disableConfigPage = useAppSelector((s) => s.flags.disableConfigPage);

  const navItems: Array<{ to: string; label: string; hidden?: boolean }> = [
    { to: "/config", label: "Table Configuration", hidden: disableConfigPage },
    { to: "/table", label: "Data Table" },
    { to: "/admin", label: "Admin Panel" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex">
      <aside className="w-48 border-r bg-slate-50/60" aria-label="Sidebar">
        <div className="px-4 py-4">
          <div className="text-sm font-semibold tracking-tight">Assignment</div>
        </div>
        <Separator />
        <nav className="p-2 space-y-1" aria-label="Primary">
          {navItems
            .filter((item) => !item.hidden)
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "bg-slate-200 text-slate-900" }}
                className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </aside>
      <main className="flex-1">
        <div className="mx-auto max-w-5xl p-6">{children}</div>
      </main>
    </div>
  );
}
