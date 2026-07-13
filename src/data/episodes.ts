export type Episode = {
  showId: string;
  season: number;
  number: number;
  title: string;
  synopsis: string;
  airDate: string; // YYYY-MM-DD
};

// Curated highlight episodes. Used for premiere night, key Fridays, and finales.
export const EPISODES: Episode[] = [
  // 1989-09-22 premiere night
  { showId: "perfect-strangers", season: 5, number: 1, title: "T-t-t-trouble", synopsis: "Larry's nerves get the best of him before a big presentation.", airDate: "1989-09-22" },
  { showId: "family-matters", season: 1, number: 1, title: "The Mama Who Came to Dinner", synopsis: "Carl's mother moves in with the Winslows. The very first episode.", airDate: "1989-09-22" },
  { showId: "full-house", season: 3, number: 1, title: "Tough Love", synopsis: "DJ struggles with peer pressure as the new school year begins.", airDate: "1989-09-22" },
  { showId: "just-the-ten-of-us", season: 2, number: 1, title: "Wendy's Big Game", synopsis: "Wendy tries out for the boys' basketball team.", airDate: "1989-09-22" },

  // 1993-09-24 — Boy Meets World premiere
  { showId: "family-matters", season: 5, number: 1, title: "Surely You Joust", synopsis: "Carl gets caught up in a renaissance fair rivalry.", airDate: "1993-09-24" },
  { showId: "boy-meets-world", season: 1, number: 1, title: "Pilot", synopsis: "Cory Matthews would rather watch the Phillies than do homework — meet Mr. Feeny.", airDate: "1993-09-24" },
  { showId: "step-by-step", season: 3, number: 1, title: "The Plan", synopsis: "Frank and Carol hatch a plan to get the kids to behave.", airDate: "1993-09-24" },
  { showId: "hangin-with-mr-cooper", season: 2, number: 1, title: "Trick or Treat", synopsis: "Mark plans the perfect Halloween for his students.", airDate: "1993-09-24" },

  // 1996-09-27 — Sabrina premiere
  { showId: "family-matters", season: 8, number: 1, title: "Pop Goes the Question", synopsis: "Carl prepares to propose — to a vow renewal.", airDate: "1996-09-27" },
  { showId: "sabrina-the-teenage-witch", season: 1, number: 1, title: "Pilot", synopsis: "Sabrina turns 16 and discovers she's a witch. Salem cracks wise.", airDate: "1996-09-27" },
  { showId: "boy-meets-world", season: 4, number: 1, title: "Back 2 School", synopsis: "Cory, Shawn, and Topanga start high school. Mr. Turner's still cool.", airDate: "1996-09-27" },
  { showId: "step-by-step", season: 6, number: 1, title: "Wedding Bell Blues", synopsis: "Dana's wedding plans go sideways.", airDate: "1996-09-27" },

  // 2000-09-08 — final TGIF night
  { showId: "boy-meets-world", season: 7, number: 22, title: "Brave New World (Part 2)", synopsis: "The gang says goodbye to Mr. Feeny. Series finale.", airDate: "2000-05-05" },
  { showId: "sabrina-the-teenage-witch", season: 5, number: 1, title: "The Whole Ball of Wax", synopsis: "Sabrina starts college and her own band.", airDate: "2000-09-22" },
];

export function findEpisode(showId: string, date: string): Episode | null {
  return EPISODES.find((e) => e.showId === showId && e.airDate === date) ?? null;
}
