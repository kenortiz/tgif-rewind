import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { LineupView } from "@/components/LineupView";
import { Button } from "@/components/ui/button";
import { getLineup, parseDateKey, randomFriday, formatDateKey, isFriday, nearestFridayInRange } from "@/data/schedule";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { recordLastViewedFriday } from "@/hooks/useLastViewedFriday";

export default function FridayPage() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const parsed = date ? parseDateKey(date) : new Date();
  const safe = isFriday(parsed) ? parsed : nearestFridayInRange(parsed);
  const lineup = getLineup(safe);

  useEffect(() => {
    recordLastViewedFriday(lineup.season.year, lineup.date);
  }, [lineup.season.year, lineup.date]);

  const goRel = (days: number) => {
    const d = new Date(safe);
    d.setDate(d.getDate() + days);
    navigate(`/friday/${formatDateKey(nearestFridayInRange(d))}`);
  };

  const dateLabel = safe.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <AppShell>
      <div className="text-center mb-4">
        <div className="font-retro text-tgif-cyan text-lg uppercase tracking-widest">A Friday in</div>
        <h1 className="font-display text-4xl text-tgif-yellow text-glow-yellow">{safe.getFullYear()}</h1>
        <div className="font-retro text-tgif-cream/80 text-xl mt-1">{dateLabel}</div>
        <div className="text-tgif-cream/60 text-xs mt-1 italic">"{lineup.season.tagline}"</div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="icon" onClick={() => goRel(-7)} aria-label="Previous Friday">
          <ChevronLeft />
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => navigate(`/friday/${formatDateKey(randomFriday())}`)}>
          <Shuffle className="h-4 w-4" /> Random
        </Button>
        <Button variant="outline" size="icon" onClick={() => goRel(7)} aria-label="Next Friday">
          <ChevronRight />
        </Button>
      </div>

      <LineupView lineup={lineup} />

      <div className="mt-8 flex flex-col gap-2 text-center text-sm">
        <Link to={`/seasons/${lineup.season.year}`} className="text-tgif-magenta underline">
          See the whole {lineup.season.label} season →
        </Link>
        <Link to="/picker" className="text-tgif-cyan underline">Pick a different date</Link>
      </div>
    </AppShell>
  );
}
