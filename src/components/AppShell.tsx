import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Settings as SettingsIcon, Tv } from "lucide-react";
import { TgifLogo } from "./TgifLogo";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  const nav = [
    { to: "/", icon: Home, label: "Tonight" },
    { to: "/seasons", icon: Tv, label: "Seasons" },
    { to: "/picker", icon: Calendar, label: "Pick" },
    { to: "/settings", icon: SettingsIcon, label: "Settings" },
  ];
  return (
    <div className="min-h-screen flex flex-col scanlines">
      <header className="sticky top-0 z-20 backdrop-blur-md bg-tgif-navy-deep/80 border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 flex items-center justify-between gap-4 py-3">
          <Link to="/" aria-label="TGIF home" className="flex items-center gap-3">
            <TgifLogo size="sm" />
            <span className="hidden sm:inline font-retro text-base md:text-lg text-tgif-cream/70">Nostalgia Channel</span>
          </Link>
          {/* Desktop top nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map(({ to, icon: Icon, label }) => {
              const active = to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "text-tgif-magenta text-glow-pink bg-tgif-navy/60"
                      : "text-tgif-cream/60 hover:text-tgif-cream hover:bg-tgif-navy/40"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-10 animate-fade-in">{children}</main>
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-tgif-navy-deep/95 backdrop-blur border-t border-border">
        <div className="container grid grid-cols-4 py-2">
          {nav.map(({ to, icon: Icon, label }) => {
            const active = to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors",
                  active ? "text-tgif-magenta text-glow-pink" : "text-tgif-cream/60 hover:text-tgif-cream"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
