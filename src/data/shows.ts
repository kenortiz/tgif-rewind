export type Show = {
  id: string;
  title: string;
  years: string;
  themeYouTubeId: string;
  blurb: string;
  color: string; // hsl token name
};

// YouTube IDs verified via web search (theme songs / opening credits).
export const SHOWS: Record<string, Show> = {
  "perfect-strangers": {
    id: "perfect-strangers",
    title: "Perfect Strangers",
    years: "1986–1993",
    themeYouTubeId: "8vbnLYROCj8", // "Perfect Strangers Intro" — 5.9M views
    blurb: "Cousins Larry and Balki navigate Chicago life with mismatched charm.",
    color: "tgif-cyan",
  },
  "full-house": {
    id: "full-house",
    title: "Full House",
    years: "1987–1995",
    themeYouTubeId: "fE07iu0XwsE",
    blurb: "Three men, three girls, one San Francisco house full of hugs.",
    color: "tgif-yellow",
  },
  "family-matters": {
    id: "family-matters",
    title: "Family Matters",
    years: "1989–1998",
    themeYouTubeId: "Z4R91CR-YZU", // Warner Bros. Classics official
    blurb: "The Winslows of Chicago — and the unforgettable Steve Urkel.",
    color: "tgif-magenta",
  },
  "just-the-ten-of-us": {
    id: "just-the-ten-of-us",
    title: "Just the Ten of Us",
    years: "1988–1990",
    themeYouTubeId: "8m0eQ6Ll1JQ",
    blurb: "Coach Lubbock, his wife, and their eight kids in California.",
    color: "tgif-cyan",
  },
  "step-by-step": {
    id: "step-by-step",
    title: "Step by Step",
    years: "1991–1998",
    themeYouTubeId: "AzDDWKA4ahA", // Extended Opening Credits
    blurb: "A blended Brady-style family figures it out, week by week.",
    color: "tgif-yellow",
  },
  "boy-meets-world": {
    id: "boy-meets-world",
    title: "Boy Meets World",
    years: "1993–2000",
    themeYouTubeId: "MXSUF_aGv5U", // Disney Channel UK official theme
    blurb: "Cory, Shawn, Topanga, and Mr. Feeny — growing up out loud.",
    color: "tgif-magenta",
  },
  "hangin-with-mr-cooper": {
    id: "hangin-with-mr-cooper",
    title: "Hangin' with Mr. Cooper",
    years: "1992–1997",
    themeYouTubeId: "wXa9XEtyqUE",
    blurb: "Ex-NBA player turned teacher, with two roommates and a lot of hijinks.",
    color: "tgif-cyan",
  },
  "sabrina-the-teenage-witch": {
    id: "sabrina-the-teenage-witch",
    title: "Sabrina the Teenage Witch",
    years: "1996–2003",
    themeYouTubeId: "dhcDq3vjMek", // Pilot opening credits 4K
    blurb: "A half-witch teen, two zany aunts, and Salem the talking cat.",
    color: "tgif-magenta",
  },
  "teen-angel": {
    id: "teen-angel",
    title: "Teen Angel",
    years: "1997–1998",
    themeYouTubeId: "55rA4TVUNKw", // TVInsider clip
    blurb: "A teen dies eating a six-month-old burger, returns as his best friend's guardian angel.",
    color: "tgif-yellow",
  },
  "you-wish": {
    id: "you-wish",
    title: "You Wish",
    years: "1997–1998",
    themeYouTubeId: "55rA4TVUNKw",
    blurb: "A 2,000-year-old genie in a sleepy suburb.",
    color: "tgif-cyan",
  },
  "two-of-a-kind": {
    id: "two-of-a-kind",
    title: "Two of a Kind",
    years: "1998–1999",
    themeYouTubeId: "KzfQI89_3NE", // "TWO OF A KIND THEME SONG"
    blurb: "Mary-Kate and Ashley help their dad raise... themselves.",
    color: "tgif-magenta",
  },
  "brotherly-love": {
    id: "brotherly-love",
    title: "Brotherly Love",
    years: "1995–1997",
    themeYouTubeId: "KzfQI89_3NE",
    blurb: "The three Lawrence brothers run a garage together in Philly.",
    color: "tgif-yellow",
  },
  "dinosaurs": {
    id: "dinosaurs",
    title: "Dinosaurs",
    years: "1991–1994",
    themeYouTubeId: "kp4q9vAxcms", // "Not the Mama" 4 seasons — 2.6M views
    blurb: "Suburban dinosaur sitcom. 'Not the mama!'",
    color: "tgif-cyan",
  },
  "going-places": {
    id: "going-places",
    title: "Going Places",
    years: "1990–1991",
    themeYouTubeId: "AzDDWKA4ahA",
    blurb: "Four young writers for a hit hidden-camera show share a beach house.",
    color: "tgif-yellow",
  },
};
