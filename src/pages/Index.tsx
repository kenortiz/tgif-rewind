import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { TgifLogo } from "@/components/TgifLogo";
import { LineupView } from "@/components/LineupView";
import { Button } from "@/components/ui/button";
import { getLineup, isFriday, tgifEraFridayForToday, randomFriday, formatDateKey } from "@/data/schedule";
import { useSettings } from "@/hooks/useSettings";
import { Shuffle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { treatTodayAsFriday } = useSettings();
  const navigate = useNavigate();

  const today = new Date();
  const fridayToday = isFriday(today);
  const eraDate = tgifEraFridayForToday(today);
  const lineup = getLineup(eraDate);
  const isLive = fridayToday || treatTodayAsFriday;

  const dateLabel = eraDate.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <AppShell>
      <section className="text-center mb-6">
        <div className="font-retro text-tgif-cyan text-xl tracking-widest uppercase mb-1">
          {isLive ? "Tonight on" : "Most recent Friday"}
        </div>
        <TgifLogo size="lg" />
        <div className="font-retro text-tgif-cream/80 text-2xl mt-2">{dateLabel}</div>
        <div className="text-tgif-cream/60 text-sm mt-1 italic">"{lineup.season.tagline}"</div>
        {!fridayToday && (
          <div className="text-xs text-tgif-cream/40 mt-1">
            (It's not actually Friday — but the magic doesn't wait.)
          </div>
        )}
      </section>

      <div className="flex gap-2 mb-4">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => navigate(`/friday/${formatDateKey(randomFriday())}`)}
        >
          <Shuffle className="h-4 w-4" /> Random Friday
        </Button>
        <Button asChild variant="outline" className="flex-1 border-tgif-cyan text-tgif-cyan hover:bg-tgif-cyan/10 hover:text-tgif-cyan">
          <Link to="/picker"><Calendar className="h-4 w-4" /> Time machine</Link>
        </Button>
      </div>

      <LineupView lineup={lineup} isLive={isLive} />

      <div className="mt-8 text-center">
        <Link to={`/friday/${lineup.date}`} className="text-tgif-magenta underline text-sm">
          View this Friday's full page →
        </Link>
      </div>
    </AppShell>
  );
}
