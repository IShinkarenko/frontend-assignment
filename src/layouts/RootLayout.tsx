import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Divider } from "src/components";
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
    <div className="min-h-screen bg-background text-foreground antialiased flex">
      <aside
        className="w-56 border-r bg-white/70 backdrop-blur-sm"
        aria-label="Sidebar"
      >
        <div className="px-4 py-4">
          <div className="text-base font-semibold tracking-tight">
            Frontend Assignment
          </div>
          <div className="text-xs text-muted-foreground">Demo</div>
        </div>
        <Divider />
        <nav className="p-2 space-y-1" aria-label="Primary">
          {navItems
            .filter((item) => !item.hidden)
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "bg-slate-100 text-slate-900" }}
                className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-3">
                    <span className="truncate">{item.label}</span>
                    <span
                      aria-hidden
                      className={
                        "ml-auto inline-block h-1.5 w-1.5 rounded-full " +
                        (isActive ? "bg-primary" : "bg-transparent")
                      }
                    />
                  </span>
                )}
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
