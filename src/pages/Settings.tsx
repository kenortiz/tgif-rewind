import { AppShell } from "@/components/AppShell";
import { Switch } from "@/components/ui/switch";
import { useSettings, type CommercialsMode } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";

const MODES: { value: CommercialsMode; label: string; desc: string }[] = [
  { value: "off", label: "Off", desc: "Skip ads. Just the lineup." },
  { value: "light", label: "One break", desc: "A single mid-night commercial break." },
  { value: "all", label: "Between every show", desc: "The full TGIF experience." },
];

export default function Settings() {
  const s = useSettings();
  return (
    <AppShell>
      <h1 className="font-display text-3xl text-tgif-cream mb-6">Settings</h1>
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-gradient-card p-4 shadow-card">
          <div className="font-display text-lg text-tgif-cream">Period commercials</div>
          <div className="text-sm text-tgif-cream/70 mt-1 mb-3">
            Authentic 80s/90s spots between episodes.
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((m) => {
              const active = s.commercialsMode === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => s.setCommercialsMode(m.value)}
                  className={cn(
                    "rounded-md border p-2 text-left transition-colors",
                    active
                      ? "border-tgif-magenta bg-tgif-navy/60 text-tgif-cream"
                      : "border-border bg-card hover:border-tgif-cream/40 text-tgif-cream/70"
                  )}
                >
                  <div className="font-retro text-sm text-tgif-yellow">{m.label}</div>
                  <div className="text-[11px] mt-1 leading-snug">{m.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
        <Row
          title="Treat today as Friday"
          desc="Always show the 'Tonight on TGIF' lineup as if it's airing now."
          checked={s.treatTodayAsFriday}
          onChange={s.setTreatTodayAsFriday}
        />
      </div>
      <p className="text-xs text-tgif-cream/50 mt-8 text-center font-retro">
        Built with love by people who remember Urkel.
      </p>
    </AppShell>
  );
}

function Row({ title, desc, checked, onChange }: { title: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-4 rounded-lg border border-border bg-gradient-card p-4 shadow-card cursor-pointer">
      <div className="flex-1">
        <div className="font-display text-lg text-tgif-cream">{title}</div>
        <div className="text-sm text-tgif-cream/70 mt-1">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
