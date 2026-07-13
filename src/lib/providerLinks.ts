// Map a TMDB provider name to a direct deep link / search URL on that provider's site.
// TMDB's `watch/providers.link` points to JustWatch, which then redirects — users expect
// to land on Hulu/Disney+/etc. directly. We construct a best-effort search URL per provider.

type Builder = (title: string) => string;

const enc = (s: string) => encodeURIComponent(s);

const BUILDERS: Record<string, Builder> = {
  "Hulu": (t) => `https://www.hulu.com/search?q=${enc(t)}`,
  "Disney Plus": (t) => `https://www.disneyplus.com/search?q=${enc(t)}`,
  "Netflix": (t) => `https://www.netflix.com/search?q=${enc(t)}`,
  "Amazon Prime Video": (t) => `https://www.amazon.com/s?k=${enc(t)}&i=instant-video`,
  "Amazon Video": (t) => `https://www.amazon.com/s?k=${enc(t)}&i=instant-video`,
  "Max": (t) => `https://play.max.com/search?q=${enc(t)}`,
  "HBO Max": (t) => `https://play.max.com/search?q=${enc(t)}`,
  "Peacock": (t) => `https://www.peacocktv.com/search?q=${enc(t)}`,
  "Peacock Premium": (t) => `https://www.peacocktv.com/search?q=${enc(t)}`,
  "Paramount Plus": (t) => `https://www.paramountplus.com/search/?q=${enc(t)}`,
  "Paramount+": (t) => `https://www.paramountplus.com/search/?q=${enc(t)}`,
  "Apple TV Plus": (t) => `https://tv.apple.com/search?term=${enc(t)}`,
  "Apple TV": (t) => `https://tv.apple.com/search?term=${enc(t)}`,
  "Tubi": (t) => `https://tubitv.com/search/${enc(t)}`,
  "Pluto TV": (t) => `https://pluto.tv/en/search/details?q=${enc(t)}`,
  "The Roku Channel": (t) => `https://therokuchannel.roku.com/search/${enc(t)}`,
  "Freevee": (t) => `https://www.amazon.com/s?k=${enc(t)}&i=instant-video`,
  "YouTube": (t) => `https://www.youtube.com/results?search_query=${enc(t)}`,
  "Google Play Movies": (t) => `https://play.google.com/store/search?q=${enc(t)}&c=movies`,
  "Vudu": (t) => `https://www.vudu.com/content/movies/search?searchString=${enc(t)}`,
  "Fandango At Home": (t) => `https://www.vudu.com/content/movies/search?searchString=${enc(t)}`,
  "Microsoft Store": (t) => `https://www.microsoft.com/en-us/search?q=${enc(t)}`,
  "fuboTV": (t) => `https://www.fubo.tv/search?query=${enc(t)}`,
  "Sling TV": (t) => `https://www.sling.com/search?q=${enc(t)}`,
  "Philo": (t) => `https://www.philo.com/search?q=${enc(t)}`,
};

/**
 * Return a deep link into the provider's site (search results for the show),
 * or null if we don't have a builder for that provider.
 */
export function providerDeepLink(providerName: string, showTitle: string): string | null {
  const b = BUILDERS[providerName];
  return b ? b(showTitle) : null;
}
