import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TMDB_IDS } from "@/data/tmdbIds";

export type FetchedEpisode = {
  season: number;
  number: number;
  name: string;
  overview: string;
  air_date: string | null;
};

export type EpisodeLookup = {
  episode: FetchedEpisode | null;
  exact: boolean;
  diffDays: number | null;
};

// In-memory cache keyed by `${showId}:${airDate}`.
const cache = new Map<string, EpisodeLookup>();

export function useEpisodeByDate(showId: string, airDate: string, enabled: boolean) {
  const key = `${showId}:${airDate}`;
  const [data, setData] = useState<EpisodeLookup | null>(cache.get(key) ?? null);
  const [loading, setLoading] = useState(enabled && !cache.has(key));

  useEffect(() => {
    if (!enabled) { setLoading(false); return; }
    const tmdbId = TMDB_IDS[showId];
    if (!tmdbId) { setLoading(false); return; }
    if (cache.has(key)) { setData(cache.get(key)!); setLoading(false); return; }

    let cancelled = false;
    setLoading(true);
    supabase.functions
      .invoke("get-episode-by-date", { body: { tmdbId, showId, airDate } })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) { setLoading(false); return; }
        const lookup: EpisodeLookup = {
          episode: data?.episode ?? null,
          exact: !!data?.exact,
          diffDays: data?.diffDays ?? null,
        };
        cache.set(key, lookup);
        setData(lookup);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [key, enabled, showId, airDate]);

  return { data, loading };
}
