// Static lookup: our internal showId -> TMDB show ID.
// Verified by querying TMDB's /search/tv endpoint with title + first-air year.
export const TMDB_IDS: Record<string, number> = {
  "perfect-strangers": 1786,
  "full-house": 4313,
  "family-matters": 2685,
  "just-the-ten-of-us": 2174,
  "step-by-step": 2617,
  "boy-meets-world": 1777,
  "hangin-with-mr-cooper": 4438,
  "sabrina-the-teenage-witch": 605,
  "teen-angel": 307,
  "you-wish": 6762,
  "two-of-a-kind": 2141,
  "brotherly-love": 4442,
  "dinosaurs": 3763,
  "going-places": 6743,
};
