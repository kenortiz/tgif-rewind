// Edge function: get-show-info
// Accepts a TMDB show ID, returns rating + IMDb ID + US streaming providers.
// Runs on Deno (not Node). Uses the TMDB_API_KEY secret stored in Supabase edge function secrets.

import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

// "Deno.serve" is the standard way to start an HTTP server in Deno.
Deno.serve(async (req) => {
  // 1) CORS preflight: browsers send an OPTIONS request first to ask "am I allowed
  //    to call this from my origin?" We have to answer "yes" with the right headers.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { tmdbId } = await req.json();

    // 2) Validate input. NEVER trust the client.
    if (typeof tmdbId !== "number" || !Number.isFinite(tmdbId)) {
      return new Response(
        JSON.stringify({ error: "tmdbId (number) is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("TMDB_API_KEY");
    if (!apiKey) {
      console.error("TMDB_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Server misconfigured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 3) Fetch details + watch providers in parallel. Promise.all = faster.
    const [detailsRes, providersRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${apiKey}&append_to_response=external_ids`),
      fetch(`https://api.themoviedb.org/3/tv/${tmdbId}/watch/providers?api_key=${apiKey}`),
    ]);

    if (!detailsRes.ok) {
      console.error("TMDB details failed", detailsRes.status, await detailsRes.text());
      return new Response(
        JSON.stringify({ error: "TMDB lookup failed" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const details = await detailsRes.json();
    const providersJson = providersRes.ok ? await providersRes.json() : { results: {} };

    // US streaming providers (flatrate = subscription services like Hulu/Disney+).
    const us = providersJson?.results?.US ?? {};
    const flatrate = (us.flatrate ?? []).map((p: any) => ({
      name: p.provider_name,
      logo: `https://image.tmdb.org/t/p/w92${p.logo_path}`,
    }));

    const payload = {
      rating: typeof details.vote_average === "number" ? Number(details.vote_average.toFixed(1)) : null,
      voteCount: details.vote_count ?? 0,
      imdbId: details.external_ids?.imdb_id ?? null,
      tmdbUrl: `https://www.themoviedb.org/tv/${tmdbId}`,
      providers: flatrate,
      providersLink: us.link ?? null, // JustWatch deep link
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("get-show-info error", err);
    return new Response(
      JSON.stringify({ error: "Unexpected error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
