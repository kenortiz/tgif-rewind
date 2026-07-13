import { Link, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { SEASONS } from "@/data/seasons";
import { SHOWS } from "@/data/shows";
import { fridaysInYear, formatDateKey, parseDateKey } from "@/data/schedule";
import { useLastViewedFriday } from "@/hooks/useLastViewedFriday";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SeasonDetail() {
  const { year } = useParams<{ year: string }>();
  const yr = Number(year);
  const season = SEASONS.find((s) => s.year === yr);
  const { date: lastDate, clear } = useLastViewedFriday(yr);

  if (!season) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl text-tgif-cream">Season not found</h1>
          <Link to="/seasons" className="text-tgif-magenta underline">Back to seasons</Link>
        </div>
      </AppShell>
    );
  }
  const fridays = fridaysInYear(yr);

  // Compute "next Friday" after the last viewed one (if any)
  const nextAfterLast = (() => {
    if (!lastDate) return null;
    const idx = fridays.findIndex((d) => formatDateKey(d) === lastDate);
    if (idx === -1) return null;
    return fridays[idx + 1] ?? null;
  })();

  const lastLabel = lastDate
    ? parseDateKey(lastDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <AppShell>
      <Link to="/seasons" className="text-tgif-cyan text-sm underline">← All seasons</Link>
      <h1 className="font-display text-3xl text-tgif-yellow mt-2">{season.label}</h1>
      <p className="text-tgif-cream/80 italic mt-1">"{season.tagline}"</p>

      {lastDate && (
        <div className="mt-4 rounded-lg border border-tgif-magenta/50 bg-tgif-navy/60 p-3 shadow-card">
          <div className="font-retro text-tgif-yellow text-sm uppercase tracking-widest">Pick up where you left off</div>
          <div className="text-tgif-cream/80 text-sm mt-1">Last visited: {lastLabel}</div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Button asChild size="sm" variant="secondary">
              <Link to={`/friday/${lastDate}`}>
                <Play className="h-4 w-4" /> Resume that Friday
              </Link>
            </Button>
            {nextAfterLast && (
              <Button asChild size="sm" variant="default">
                <Link to={`/friday/${formatDateKey(nextAfterLast)}`}>
                  Next Friday →
                </Link>
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={clear}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </div>
      )}

      <h2 className="font-display text-xl text-tgif-cream mt-6 mb-2">Standard lineup</h2>
      <div className="space-y-2">
        {season.slots.map((slot) => {
          const show = SHOWS[slot.showId];
          return (
            <div key={slot.time} className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
              <span className="font-retro text-tgif-yellow text-lg w-16">{slot.time} PM</span>
              <span className="font-display text-tgif-cream">{show?.title ?? slot.showId}</span>
            </div>
          );
        })}
      </div>

      <h2 className="font-display text-xl text-tgif-cream mt-6 mb-2">Pick a Friday</h2>
      <div className="grid grid-cols-3 gap-2">
        {fridays.map((d) => {
          const key = formatDateKey(d);
          const isLast = key === lastDate;
          return (
            <Link
              key={d.toISOString()}
              to={`/friday/${key}`}
              className={cn(
                "rounded-md border bg-card p-2 text-center text-xs transition-colors",
                isLast
                  ? "border-tgif-magenta ring-1 ring-tgif-magenta/60"
                  : "border-border hover:border-tgif-magenta"
              )}
            >
              <div className="font-retro text-tgif-cyan text-sm">
                {d.toLocaleDateString("en-US", { month: "short" })}
              </div>
              <div className="font-display text-tgif-cream">{d.getDate()}</div>
              {isLast && <div className="text-[9px] font-bold text-tgif-magenta mt-0.5">LAST</div>}
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
