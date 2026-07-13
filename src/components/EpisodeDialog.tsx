import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { LineupSlot } from "@/data/schedule";
import { SHOWS } from "@/data/shows";
import { POSTERS } from "@/data/posters";
import { useShowInfo } from "@/hooks/useShowInfo";
import { useEpisodeByDate } from "@/hooks/useEpisodeByDate";
import { ExternalLink, Youtube, Star } from "lucide-react";
import { providerDeepLink } from "@/lib/providerLinks";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  slot: LineupSlot;
  date: string;
};

export function EpisodeDialog({ open, onOpenChange, slot, date }: Props) {
  const show = SHOWS[slot.showId];
  const { data: info, loading: infoLoading } = useShowInfo(slot.showId);
  const { data: lookup, loading: epLoading } = useEpisodeByDate(
    slot.showId,
    date,
    open && !slot.episode,
  );
  if (!show) return null;
  const fetched = lookup?.episode ?? null;
  const ep = slot.episode ?? (fetched
    ? {
        season: fetched.season,
        number: fetched.number,
        title: fetched.name,
        synopsis: fetched.overview || "No synopsis available for this episode.",
        airDate: fetched.air_date ?? date,
      }
    : null);
  const isClosestMatch = !slot.episode && !!fetched && lookup?.exact === false;

  const searchQuery = ep
    ? `${show.title} ${ep.season}x${String(ep.number).padStart(2, "0")} ${ep.title}`
    : `${show.title} TGIF`;
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-card border-border w-[95vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="font-retro text-tgif-yellow text-lg">{slot.time} PM · {date}</div>
          <DialogTitle className="font-display text-2xl text-tgif-cream">{show.title}</DialogTitle>
          <DialogDescription className="text-tgif-cream/70">
            {show.years} · {show.blurb}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            {POSTERS[slot.showId] && (
              <div className="rounded-md overflow-hidden border border-border bg-tgif-navy-deep">
                <img
                  src={POSTERS[slot.showId]}
                  alt={`${show.title} retro poster`}
                  loading="lazy"
                  width={512}
                  height={768}
                  className="w-full h-32 md:h-64 object-cover object-center"
                />
              </div>
            )}

            {epLoading && !ep && (
              <div className="rounded-md border border-border p-3 bg-tgif-navy/60 text-sm text-tgif-cream/60 font-retro">
                Looking up the episode that aired on {date}…
              </div>
            )}

            {ep && (
              <div className="rounded-md border border-border p-3 bg-tgif-navy/60">
                {isClosestMatch && (
                  <div className="text-[10px] font-bold tracking-wider uppercase text-tgif-magenta mb-1">
                    Rerun · closest aired episode
                  </div>
                )}
                <div className="text-tgif-cyan font-retro text-lg">
                  Season {ep.season} · Episode {ep.number}
                </div>
                <div className="font-display text-lg text-tgif-cream">"{ep.title}"</div>
                <p className="text-sm text-tgif-cream/80 mt-2">{ep.synopsis}</p>
                <p className="text-xs text-tgif-cream/50 mt-2">First aired {ep.airDate}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Watch hero — always the first thing on the right column */}
            <div className="rounded-md border border-tgif-magenta/50 bg-tgif-navy/60 p-3">
              <div className="font-retro text-tgif-yellow text-sm uppercase tracking-widest mb-2">
                Watch this episode
              </div>
              {infoLoading && (
                <div className="text-sm text-tgif-cream/60">Checking where it streams…</div>
              )}
              {!infoLoading && info && info.providers.length > 0 && (
                <>
                  {(() => {
                    const primary = info.providers[0];
                    const primaryHref = providerDeepLink(primary.name, show.title) ?? info.providersLink ?? "#";
                    return (
                      <a
                        href={primaryHref}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-md bg-tgif-magenta text-primary-foreground px-3 py-2 font-display hover:scale-[1.02] transition-transform"
                      >
                        <img
                          src={primary.logo}
                          alt={primary.name}
                          width={32}
                          height={32}
                          className="rounded"
                        />
                        <span className="flex-1">Watch on {primary.name}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    );
                  })()}
                  {info.providers.length > 1 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {info.providers.slice(1).map((p) => {
                        const href = providerDeepLink(p.name, show.title) ?? info.providersLink ?? "#";
                        return (
                          <a
                            key={p.name}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            title={`Watch on ${p.name}`}
                            className="rounded-md overflow-hidden border border-border hover:scale-105 transition-transform"
                          >
                            <img src={p.logo} alt={p.name} width={36} height={36} className="block" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                  {info.providersLink && (
                    <a
                      href={info.providersLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-tgif-cream/60 underline mt-2 mr-3 inline-flex items-center gap-1"
                    >
                      Compare on JustWatch <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-tgif-cream/60 underline mt-2 inline-flex items-center gap-1"
                  >
                    Or search YouTube <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
              {!infoLoading && info && info.providers.length === 0 && (
                <>
                  <div className="text-sm text-tgif-cream/80 mb-2">
                    Not currently streaming in the US — but YouTube uploads come and go.
                  </div>
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-md bg-tgif-cyan/90 text-tgif-navy-deep px-3 py-2 font-display hover:scale-[1.02] transition-transform"
                  >
                    <Youtube className="h-5 w-5" />
                    <span className="flex-1">Try YouTube</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </>
              )}
              {!infoLoading && !info && (
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-md bg-tgif-cyan/90 text-tgif-navy-deep px-3 py-2 font-display hover:scale-[1.02] transition-transform"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="flex-1">Try YouTube</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div>
              <div className="font-retro text-tgif-yellow text-lg mb-2 flex items-center gap-2">
                <Youtube className="h-5 w-5" /> Theme song
              </div>
              <div className="aspect-video rounded-md overflow-hidden border border-border bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${show.themeYouTubeId}`}
                  title={`${show.title} theme`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* Show metadata strip */}
        {(infoLoading || info) && (
          <div className="rounded-md border border-border p-3 bg-tgif-navy/60 space-y-3">
            {info && info.rating !== null && (
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-tgif-yellow fill-tgif-yellow" />
                <span className="font-display text-xl text-tgif-cream">{info.rating}</span>
                <span className="text-xs text-tgif-cream/60">/ 10 · {info.voteCount.toLocaleString()} votes</span>
              </div>
            )}
            {info && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {info.imdbId && (
                  <a
                    href={`https://www.imdb.com/title/${info.imdbId}/${ep ? `episodes/?season=${ep.season}` : ""}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-tgif-cyan underline inline-flex items-center gap-1"
                  >
                    {ep ? `S${ep.season} episodes on IMDb` : "View show on IMDb"} <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                <a
                  href={ep ? `${info.tmdbUrl}/season/${ep.season}/episode/${ep.number}` : info.tmdbUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-tgif-cyan underline inline-flex items-center gap-1"
                >
                  {ep ? `S${ep.season}E${ep.number} on TMDB` : "View show on TMDB"} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
