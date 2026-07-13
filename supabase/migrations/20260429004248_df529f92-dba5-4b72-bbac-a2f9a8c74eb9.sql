-- Cache TMDB episode lists per show. Public read, server-only write.
CREATE TABLE public.episode_cache (
  tmdb_id INTEGER PRIMARY KEY,
  show_id TEXT NOT NULL,
  episodes JSONB NOT NULL, -- array of { season, number, name, overview, air_date }
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.episode_cache ENABLE ROW LEVEL SECURITY;

-- Public can read cached episode data (it's not sensitive).
CREATE POLICY "Anyone can read episode cache"
  ON public.episode_cache
  FOR SELECT
  USING (true);

-- No insert/update/delete policies = only service role (used by edge function) can write.
