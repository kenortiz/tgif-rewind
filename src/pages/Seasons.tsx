import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { SEASONS } from "@/data/seasons";

export default function Seasons() {
  return (
    <AppShell>
      <h1 className="font-display text-3xl text-tgif-cream mb-1">11 Seasons of TGIF</h1>
      <p className="text-tgif-cream/70 mb-6 text-sm">From the 1989 launch to the year-2000 finale.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SEASONS.map((s) => (
          <Link
            key={s.year}
            to={`/seasons/${s.year}`}
            className="rounded-lg border border-border bg-gradient-card p-4 shadow-card hover:border-tgif-magenta transition-colors"
          >
            <div className="font-display text-2xl text-tgif-yellow">{s.label}</div>
            <div className="text-sm text-tgif-cream/80 italic mt-1">"{s.tagline}"</div>
            <div className="text-xs text-tgif-cyan mt-2 font-retro">
              {s.slots.length} shows · {s.slots[0].time}–10:00 PM
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
