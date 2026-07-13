import { useState } from "react";
import { LineupSlot } from "@/data/schedule";
import { SHOWS } from "@/data/shows";
import { POSTERS } from "@/data/posters";
import { cn } from "@/lib/utils";
import { EpisodeDialog } from "./EpisodeDialog";

const COLOR_RING: Record<string, string> = {
  "tgif-magenta": "ring-tgif-magenta",
  "tgif-yellow": "ring-tgif-yellow",
  "tgif-cyan": "ring-tgif-cyan",
  "tgif-cream": "ring-tgif-cream",
};

type Props = { slot: LineupSlot; date: string; isOnNow?: boolean };

export function SlotCard({ slot, date, isOnNow }: Props) {
  const [open, setOpen] = useState(false);
  const show = SHOWS[slot.showId];
  if (!show) {
    return (
      <div className="rounded-lg border border-dashed border-border p-4 bg-card/50">
        <div className="font-retro text-xl text-tgif-yellow">{slot.time} PM</div>
        <div className="text-tgif-cream/70 text-sm">Lineup coming soon</div>
      </div>
    );
  }
  const ep = slot.episode;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "w-full text-left rounded-lg border bg-gradient-card shadow-card p-4 transition-transform active:scale-[0.98] hover:scale-[1.01]",
          isOnNow ? "border-tgif-magenta animate-on-now" : "border-border"
        )}
      >
        <div className="flex items-start gap-4">
          {POSTERS[slot.showId] ? (
            <img
              src={POSTERS[slot.showId]}
              alt={`${show.title} retro poster`}
              loading="lazy"
              width={512}
              height={768}
              className={cn(
                "shrink-0 w-16 h-24 object-cover rounded-md ring-2 ring-offset-2 ring-offset-tgif-navy-deep",
                COLOR_RING[show.color] ?? "ring-tgif-magenta"
              )}
            />
          ) : (
            <div
              className={cn(
                "shrink-0 w-16 h-24 rounded-md font-display text-tgif-navy-deep flex items-center justify-center",
                "bg-tgif-magenta"
              )}
              aria-hidden
            >
              <span className="font-retro text-sm">{slot.time}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-retro text-tgif-yellow text-xl leading-none">{slot.time} PM</span>
              {isOnNow && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-tgif-magenta text-primary-foreground tracking-wider">
                  ON NOW
                </span>
              )}
            </div>
            <div className="font-display text-lg text-tgif-cream truncate">{show.title}</div>
            {ep ? (
              <div className="text-sm text-tgif-cream/80 mt-1">
                <span className="text-tgif-cyan">S{ep.season}·E{ep.number}</span> — "{ep.title}"
              </div>
            ) : (
              <div className="text-xs text-tgif-cream/50 mt-1 italic">Standard lineup</div>
            )}
          </div>
        </div>
      </button>
      <EpisodeDialog open={open} onOpenChange={setOpen} slot={slot} date={date} />
    </>
  );
}
