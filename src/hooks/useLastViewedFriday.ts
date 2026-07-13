import { useCallback, useEffect, useState } from "react";

const KEY = "tgif:lastViewed:v1";

type Store = Record<string, string>; // year -> dateKey

function load(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) ?? "{}"); } catch { return {}; }
}

function save(store: Store) {
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {}
}

export function recordLastViewedFriday(year: number, dateKey: string) {
  const store = load();
  store[String(year)] = dateKey;
  save(store);
}

export function useLastViewedFriday(year: number) {
  const [date, setDate] = useState<string | null>(() => load()[String(year)] ?? null);
  useEffect(() => {
    setDate(load()[String(year)] ?? null);
  }, [year]);
  const clear = useCallback(() => {
    const store = load();
    delete store[String(year)];
    save(store);
    setDate(null);
  }, [year]);
  return { date, clear };
}
