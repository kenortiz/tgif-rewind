import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CommercialsMode = "off" | "light" | "all";

type Settings = {
  commercialsMode: CommercialsMode;
  treatTodayAsFriday: boolean;
};

type Ctx = Settings & {
  commercialsEnabled: boolean; // back-compat derived value
  setCommercialsMode: (v: CommercialsMode) => void;
  setTreatTodayAsFriday: (v: boolean) => void;
};

const SettingsContext = createContext<Ctx | null>(null);
const KEY = "tgif:settings:v2";
const LEGACY_KEY = "tgif:settings:v1";

const defaults: Settings = { commercialsMode: "all", treatTodayAsFriday: true };

function load(): Settings {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      return {
        commercialsMode: parsed.commercialsEnabled === false ? "off" : "all",
        treatTodayAsFriday: parsed.treatTodayAsFriday ?? true,
      };
    }
  } catch {}
  return defaults;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch {}
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        commercialsEnabled: settings.commercialsMode !== "off",
        setCommercialsMode: (v) => setSettings((s) => ({ ...s, commercialsMode: v })),
        setTreatTodayAsFriday: (v) => setSettings((s) => ({ ...s, treatTodayAsFriday: v })),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
