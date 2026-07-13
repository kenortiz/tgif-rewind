// Standard fall lineup per TGIF season. Used as fallback when a specific Friday isn't seeded.
export type SeasonLineup = {
  year: number; // fall year, e.g. 1989 means 1989–1990 season
  label: string;
  tagline: string;
  slots: { time: string; showId: string }[];
};

export const SEASONS: SeasonLineup[] = [
  {
    year: 1989,
    label: "1989–1990",
    tagline: "The night TGIF was born.",
    slots: [
      { time: "8:00", showId: "perfect-strangers" },
      { time: "8:30", showId: "family-matters" },
      { time: "9:00", showId: "full-house" },
      { time: "9:30", showId: "just-the-ten-of-us" },
    ],
  },
  {
    year: 1990,
    label: "1990–1991",
    tagline: "The block finds its groove.",
    slots: [
      { time: "8:00", showId: "full-house" },
      { time: "8:30", showId: "family-matters" },
      { time: "9:00", showId: "perfect-strangers" },
      { time: "9:30", showId: "going-places" },
    ],
  },
  {
    year: 1991,
    label: "1991–1992",
    tagline: "Step by Step joins the family.",
    slots: [
      { time: "8:00", showId: "family-matters" },
      { time: "8:30", showId: "step-by-step" },
      { time: "9:00", showId: "perfect-strangers" },
      { time: "9:30", showId: "dinosaurs" },
    ],
  },
  {
    year: 1992,
    label: "1992–1993",
    tagline: "Mr. Cooper hangs out.",
    slots: [
      { time: "8:00", showId: "family-matters" },
      { time: "8:30", showId: "step-by-step" },
      { time: "9:00", showId: "hangin-with-mr-cooper" },
      { time: "9:30", showId: "dinosaurs" },
    ],
  },
  {
    year: 1993,
    label: "1993–1994",
    tagline: "Cory Matthews meets the world.",
    slots: [
      { time: "8:00", showId: "family-matters" },
      { time: "8:30", showId: "boy-meets-world" },
      { time: "9:00", showId: "step-by-step" },
      { time: "9:30", showId: "hangin-with-mr-cooper" },
    ],
  },
  {
    year: 1994,
    label: "1994–1995",
    tagline: "Full House's farewell year.",
    slots: [
      { time: "8:00", showId: "family-matters" },
      { time: "8:30", showId: "boy-meets-world" },
      { time: "9:00", showId: "step-by-step" },
      { time: "9:30", showId: "full-house" },
    ],
  },
  {
    year: 1995,
    label: "1995–1996",
    tagline: "Brotherly Love crashes the party.",
    slots: [
      { time: "8:00", showId: "family-matters" },
      { time: "8:30", showId: "boy-meets-world" },
      { time: "9:00", showId: "step-by-step" },
      { time: "9:30", showId: "brotherly-love" },
    ],
  },
  {
    year: 1996,
    label: "1996–1997",
    tagline: "Sabrina casts her spell.",
    slots: [
      { time: "8:00", showId: "family-matters" },
      { time: "8:30", showId: "sabrina-the-teenage-witch" },
      { time: "9:00", showId: "boy-meets-world" },
      { time: "9:30", showId: "step-by-step" },
    ],
  },
  {
    year: 1997,
    label: "1997–1998",
    tagline: "The Teen Angel era.",
    slots: [
      { time: "8:00", showId: "you-wish" },
      { time: "8:30", showId: "boy-meets-world" },
      { time: "9:00", showId: "sabrina-the-teenage-witch" },
      { time: "9:30", showId: "teen-angel" },
    ],
  },
  {
    year: 1998,
    label: "1998–1999",
    tagline: "Two of a Kind brings the Olsens.",
    slots: [
      { time: "8:00", showId: "boy-meets-world" },
      { time: "8:30", showId: "two-of-a-kind" },
      { time: "9:00", showId: "sabrina-the-teenage-witch" },
      { time: "9:30", showId: "step-by-step" },
    ],
  },
  {
    year: 1999,
    label: "1999–2000",
    tagline: "The final TGIF curtain.",
    slots: [
      { time: "8:00", showId: "boy-meets-world" },
      { time: "8:30", showId: "sabrina-the-teenage-witch" },
      { time: "9:00", showId: "odd-man-out" },
      { time: "9:30", showId: "making-the-band" },
    ],
  },
];

export function getSeasonForDate(date: Date): SeasonLineup {
  // TGIF "season" runs roughly Sept–May. Use the fall year.
  const m = date.getMonth();
  const y = date.getFullYear();
  const fallYear = m >= 8 ? y : y - 1; // Sept (8) onward is current season
  // Clamp into TGIF era 1989–1999
  const clamped = Math.max(1989, Math.min(1999, fallYear));
  return SEASONS.find((s) => s.year === clamped) ?? SEASONS[0];
}
