import { EPISODES, findEpisode, type Episode } from "./episodes";
import { getSeasonForDate, type SeasonLineup } from "./seasons";

export type LineupSlot = {
  time: string;
  showId: string;
  episode: Episode | null;
};

export type Lineup = {
  date: string; // YYYY-MM-DD
  season: SeasonLineup;
  slots: LineupSlot[];
  isCurated: boolean; // true if we have specific episode data for this date
};

export const TGIF_START = new Date("1989-09-22T00:00:00");
export const TGIF_END = new Date("2000-09-08T00:00:00");

export function formatDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDateKey(key: string): Date {
  return new Date(`${key}T00:00:00`);
}

export function isFriday(d: Date): boolean {
  return d.getDay() === 5;
}

export function nearestFriday(d: Date): Date {
  const out = new Date(d);
  const day = out.getDay();
  // 5 = Friday. Map to nearest Friday (look back up to 6 days, then forward).
  const diff = (5 - day + 7) % 7; // days forward to next Friday
  // If today isn't Friday, prefer the most recent past Friday
  if (day !== 5) {
    const back = (day - 5 + 7) % 7;
    out.setDate(out.getDate() - back);
  }
  return out;
}

// Map today's date to a TGIF-era Friday for the "Tonight" view.
// Strategy: take month/day from today, pair with a featured year (round-robin).
export function tgifEraFridayForToday(today = new Date()): Date {
  const featuredYears = [1989, 1991, 1993, 1995, 1996, 1997, 1998];
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const year = featuredYears[dayOfYear % featuredYears.length];
  // Find the Friday in that year closest to today's month/day
  const target = new Date(year, today.getMonth(), today.getDate());
  return nearestFridayInRange(target);
}

export function nearestFridayInRange(d: Date): Date {
  let out = nearestFriday(d);
  if (out < TGIF_START) out = new Date(TGIF_START);
  if (out > TGIF_END) out = new Date(TGIF_END);
  // Re-snap to Friday after clamping
  if (!isFriday(out)) out = nearestFriday(out);
  return out;
}

export function getLineup(date: Date): Lineup {
  const dateKey = formatDateKey(date);
  const season = getSeasonForDate(date);
  const slots: LineupSlot[] = season.slots.map((s) => ({
    time: s.time,
    showId: s.showId,
    episode: findEpisode(s.showId, dateKey),
  }));
  const isCurated = slots.some((s) => s.episode !== null);
  return { date: dateKey, season, slots, isCurated };
}

export function allCuratedFridays(): string[] {
  return Array.from(new Set(EPISODES.map((e) => e.airDate))).sort();
}

export function fridaysInYear(year: number): Date[] {
  const out: Date[] = [];
  const start = new Date(year, 8, 1); // Sept 1
  const end = new Date(year + 1, 4, 31); // May 31
  const d = new Date(start);
  while (d <= end) {
    if (d.getDay() === 5) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function randomFriday(): Date {
  const span = TGIF_END.getTime() - TGIF_START.getTime();
  const t = TGIF_START.getTime() + Math.random() * span;
  return nearestFridayInRange(new Date(t));
}
