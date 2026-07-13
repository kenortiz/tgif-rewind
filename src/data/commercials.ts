export type Commercial = {
  year: number;
  youtubeId: string;
  title: string;
};

// Curated 80s/90s commercial pool. YouTube IDs verified via web search.
// Years are approximate air dates; the picker uses a ±2 year window.
export const COMMERCIALS: Commercial[] = [
  // Soda & beverages
  { year: 1993, youtubeId: "KPvyq_KmXhc", title: "Crystal Pepsi — Super Bowl XXVII" },
  { year: 1996, youtubeId: "SnUBvULphfA", title: "Surge — Feed the Rush" },
  { year: 1998, youtubeId: "TEJa2ppD5Uw", title: "Sprite — Obey Your Thirst" },
  { year: 1992, youtubeId: "YtK-yq-BQDU", title: "Pepsi — Cindy Crawford" },
  { year: 1993, youtubeId: "47Dlkfg9Jhk", title: "Coca-Cola — Polar Bears" },

  // Snacks & food
  { year: 1993, youtubeId: "0Gkqzxss8Ss", title: "Got Milk? — Aaron Burr" },
  { year: 1995, youtubeId: "jkR-RwV-xAY", title: "Pizza Hut — Stuffed Crust" },
  { year: 1992, youtubeId: "bTlvcwX2Xa0", title: "Bagel Bites — Pizza in the Morning" },
  { year: 1994, youtubeId: "3uO_d-4TJPo", title: "Gushers — Fruithead" },
  { year: 1996, youtubeId: "93_TkhmEARc", title: "Lunchables — All You Need" },
  { year: 1990, youtubeId: "aq-IxDT4i-s", title: "Hot Pockets — Hot Pockets!" },
  { year: 1998, youtubeId: "zxTHSl0BQ5I", title: "Cinnamon Toast Crunch" },

  // Toys & games
  { year: 1991, youtubeId: "k7nsBoqJ6s8", title: "Sega Genesis — Does What Nintendon't" },
  { year: 1992, youtubeId: "3Ga0aTzC8bo", title: "Super Soaker 50" },
  { year: 1990, youtubeId: "IoEwM5Ykqmk", title: "Skip-It" },
  { year: 1993, youtubeId: "lk6gfg5EPS0", title: "Lisa Frank — Mila Kunis" },
  { year: 1996, youtubeId: "gUy1_z2l4SI", title: "Tickle Me Elmo" },
  { year: 1997, youtubeId: "YueDmq-w9X8", title: "Tamagotchi" },
  { year: 1998, youtubeId: "PHWcBbf0Eng", title: "Furby" },
  { year: 1996, youtubeId: "7NnEWjcjW80", title: "Nintendo 64 — Launch" },
  { year: 1989, youtubeId: "E-ej_8XBwmI", title: "Game Boy — Original" },
  { year: 1994, youtubeId: "8EI02Ijlcww", title: "Power Rangers Megazord" },
  { year: 1995, youtubeId: "wonWdQ6fnYk", title: "Polly Pocket" },
  { year: 1993, youtubeId: "ePrAxox-sq0", title: "Talkboy — Home Alone 2" },

  // Tech
  { year: 1998, youtubeId: "Xog_P0Z8wCs", title: "iMac G3 — Hello Again" },
  { year: 1995, youtubeId: "wRdl1BjTG7c", title: "Windows 95 — Start Me Up" },
  { year: 1997, youtubeId: "KhXhhLH71ys", title: "AOL — You've Got Mail" },

  // Pop culture & toys cont.
  { year: 1999, youtubeId: "L8OVj2m8bFA", title: "Pokémon — PokéRap" },
  { year: 1997, youtubeId: "3foQJKw7ihI", title: "Beanie Babies — McDonald's" },
  { year: 1989, youtubeId: "SAKbtJjAV18", title: "Nintendo Power Glove" },
  { year: 1991, youtubeId: "HNR4hKbSH7I", title: "Dinosaurs — Not the Mama" },

  // Cereal & sugary classics
  { year: 1990, youtubeId: "CUIYYx2n1bI", title: "Trix — Silly Rabbit" },
  { year: 1994, youtubeId: "cHfLGYJ4F5w", title: "Lucky Charms — Magically Delicious" },
  { year: 1992, youtubeId: "9zcr6TMOGe0", title: "Capri Sun — Disappearing Kid" },
];

/**
 * Pick `count` unique commercials for a given year, optionally avoiding ones
 * already used elsewhere in the same Friday. Uses a ±2 year window with a
 * fallback to the full pool.
 */
export function commercialsForYear(
  year: number,
  count = 2,
  exclude: Set<string> = new Set()
): Commercial[] {
  const window = COMMERCIALS.filter(
    (c) => Math.abs(c.year - year) <= 2 && !exclude.has(c.youtubeId)
  );
  const pool = window.length >= count
    ? window
    : COMMERCIALS.filter((c) => !exclude.has(c.youtubeId));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Pre-generate a deduplicated set of commercial breaks for a Friday lineup.
 * Returns one array of ads per requested break, with no YouTube ID repeating
 * across the entire night.
 */
export function commercialsForLineup(
  year: number,
  breakCount: number,
  perBreak = 2
): Commercial[][] {
  const used = new Set<string>();
  const breaks: Commercial[][] = [];
  for (let i = 0; i < breakCount; i++) {
    const ads = commercialsForYear(year, perBreak, used);
    ads.forEach((a) => used.add(a.youtubeId));
    breaks.push(ads);
  }
  return breaks;
}
