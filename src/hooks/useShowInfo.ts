import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TMDB_IDS } from "@/data/tmdbIds";

export type ShowInfo = {
  rating: number | null;
  voteCount: number;
  imdbId: string | null;
  tmdbUrl: string;
  providers: { name: string; logo: string }[];
  providersLink: string | null;
};

// Tiny in-memory cache so opening the same show twice doesn't refetch.
// Real apps would use react-query; this keeps deps minimal.
const cache = new Map<string, ShowInfo>();

export function useShowInfo(showId: string) {
  const [data, setData] = useState<ShowInfo | null>(cache.get(showId) ?? null);
  const [loading, setLoading] = useState(!cache.has(showId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tmdbId = TMDB_IDS[showId];
    if (!tmdbId) { setLoading(false); return; }
    if (cache.has(showId)) { setData(cache.get(showId)!); setLoading(false); return; }

    let cancelled = false;
    setLoading(true);
    supabase.functions
      .invoke("get-show-info", { body: { tmdbId } })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) { setError(error.message); setLoading(false); return; }
        cache.set(showId, data as ShowInfo);
        setData(data as ShowInfo);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [showId]);

  return { data, loading, error };
}
