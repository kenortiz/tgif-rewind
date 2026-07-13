// Edge function: get-episode-by-date
// Given a TMDB show id + a target air date, returns the episode that aired on
// (or closest to) that date. Caches the show's full episode list in the DB so
// we only hit TMDB once per show.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CachedEpisode = {
  season: number;
  number: number;
  name: string;
  overview: string;
  air_date: string | null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { tmdbId, showId, airDate } = await req.json();

    if (typeof tmdbId !== "number" || typeof showId !== "string" || typeof airDate !== "string") {
      return json({ error: "tmdbId (number), showId (string), airDate (YYYY-MM-DD) required" }, 400);
    }

    const apiKey = Deno.env.get("TMDB_API_KEY");
    if (!apiKey) return json({ error: "Server misconfigured" }, 500);

    // We use the service role here because only the backend should write to the cache.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1) Try cache first.
    let episodes: CachedEpisode[] | null = null;
    const { data: cached } = await supabase
      .from("episode_cache")
      .select("episodes")
      .eq("tmdb_id", tmdbId)
      .maybeSingle();

    if (cached) {
      episodes = cached.episodes as CachedEpisode[];
    } else {
      // 2) Cache miss: fetch the show's full season list, then each season's episodes.
      const detailsRes = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${apiKey}`);
      if (!detailsRes.ok) return json({ error: "TMDB show lookup failed" }, 502);
      const details = await detailsRes.json();

      // seasons array includes a "season_number". 0 is usually specials — keep it but it rarely matches.
      const seasonNumbers: number[] = (details.seasons ?? []).map((s: any) => s.season_number);

      // Fetch all seasons in parallel. TMDB allows this for small shows; TGIF shows have ≤9 seasons.
      const seasonResults = await Promise.all(
        seasonNumbers.map((n) =>
          fetch(`https://api.themoviedb.org/3/tv/${tmdbId}/season/${n}?api_key=${apiKey}`).then((r) =>
            r.ok ? r.json() : null,
          ),
        ),
      );

      episodes = seasonResults
        .filter(Boolean)
        .flatMap((s: any) =>
          (s.episodes ?? []).map((e: any) => ({
            season: e.season_number,
            number: e.episode_number,
            name: e.name ?? "",
            overview: e.overview ?? "",
            air_date: e.air_date ?? null,
          })),
        );

      // Write to cache. Don't await failure-handling too aggressively — cache is best-effort.
      const { error: insertErr } = await supabase
        .from("episode_cache")
        .insert({ tmdb_id: tmdbId, show_id: showId, episodes });
      if (insertErr) console.error("cache insert failed", insertErr);
    }

    // 3) Find the episode matching the requested air date.
    //    Prefer exact match; otherwise fall back to the closest prior episode within 7 days
    //    (TGIF dates aren't always exact in TMDB).
    const target = new Date(airDate + "T00:00:00").getTime();
    let exact: CachedEpisode | null = null;
    let nearest: { ep: CachedEpisode; diff: number } | null = null;

    for (const ep of episodes!) {
      if (!ep.air_date) continue;
      if (ep.air_date === airDate) { exact = ep; break; }
      const diff = Math.abs(new Date(ep.air_date + "T00:00:00").getTime() - target);
      if (!nearest || diff < nearest.diff) nearest = { ep, diff };
    }

    // Always return the nearest episode if one exists. The client decides whether
    // to label it as "exact" or "closest" (e.g., for summer reruns).
    const match = exact ?? nearest?.ep ?? null;
    const diffDays = nearest ? Math.round(nearest.diff / 86400000) : null;

    return json({
      episode: match,
      exact: !!exact,
      diffDays: exact ? 0 : diffDays,
      totalEpisodes: episodes!.length,
    }, 200);
  } catch (err) {
    console.error("get-episode-by-date error", err);
    return json({ error: "Unexpected error" }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
