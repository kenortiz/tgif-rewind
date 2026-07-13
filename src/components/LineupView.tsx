import { useMemo } from "react";
import { Lineup } from "@/data/schedule";
import { SlotCard } from "./SlotCard";
import { CommercialBreak } from "./CommercialBreak";
import { useSettings } from "@/hooks/useSettings";
import { commercialsForLineup } from "@/data/commercials";

type Props = { lineup: Lineup; isLive?: boolean };

function currentOnNowTime(): string | null {
  const now = new Date();
  if (now.getDay() !== 5) return null;
  const h = now.getHours();
  const m = now.getMinutes();
  if (h === 20 && m < 30) return "8:00";
  if (h === 20) return "8:30";
  if (h === 21 && m < 30) return "9:00";
  if (h === 21) return "9:30";
  return null;
}

export function LineupView({ lineup, isLive }: Props) {
  const { commercialsMode } = useSettings();
  const onNow = isLive ? currentOnNowTime() : null;
  const year = lineup.season.year;
  const totalGaps = Math.max(0, lineup.slots.length - 1);

  // How many breaks do we actually want, and at which slot indices?
  // off  -> none
  // light -> one break, placed at the middle gap
  // all  -> a break after every show except the last
  const breakIndices = useMemo<Set<number>>(() => {
    if (commercialsMode === "off" || totalGaps === 0) return new Set();
    if (commercialsMode === "light") return new Set([Math.floor((totalGaps - 1) / 2)]);
    return new Set(Array.from({ length: totalGaps }, (_, i) => i));
  }, [commercialsMode, totalGaps]);

  const breaks = useMemo(
    () => commercialsForLineup(year, breakIndices.size, 2),
    [lineup.date, year, breakIndices.size]
  );

  // Map slot-gap index -> ad set
  const breakAt = useMemo(() => {
    const m = new Map<number, ReturnType<typeof commercialsForLineup>[number]>();
    let n = 0;
    for (let i = 0; i < totalGaps; i++) {
      if (breakIndices.has(i)) m.set(i, breaks[n++]);
    }
    return m;
  }, [breakIndices, breaks, totalGaps]);

  const noEpisodeData = lineup.slots.every((s) => s.episode === null);

  return (
    <div className="space-y-3">
      {noEpisodeData && (
        <div className="rounded-md border border-tgif-cyan/40 bg-tgif-navy/60 p-3 text-sm text-tgif-cream/80 font-retro">
          No episode logs survived for this Friday — but here's the standard lineup that would've aired.
        </div>
      )}
      {lineup.slots.map((slot, i) => (
        <div key={`${slot.time}-${slot.showId}`} className="space-y-3">
          <SlotCard slot={slot} date={lineup.date} isOnNow={onNow === slot.time} />
          {i < lineup.slots.length - 1 && breakAt.get(i) && (
            <CommercialBreak year={year} ads={breakAt.get(i)!} />
          )}
        </div>
      ))}
    </div>
  );
}
