import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { TGIF_END, TGIF_START, formatDateKey, nearestFridayInRange, randomFriday } from "@/data/schedule";
import { Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Picker() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date(1993, 8, 24));

  const goToDate = (d: Date | undefined) => {
    if (!d) return;
    const friday = nearestFridayInRange(d);
    navigate(`/friday/${formatDateKey(friday)}`);
  };

  return (
    <AppShell>
      <h1 className="font-display text-3xl text-tgif-cream mb-1">Time Machine</h1>
      <p className="text-tgif-cream/70 text-sm mb-4">
        Pick any Friday between Sept 1989 and Sept 2000.
      </p>

      <div className="rounded-lg border border-border bg-gradient-card p-2 shadow-card flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={TGIF_START}
          toDate={TGIF_END}
          disabled={(d) => d.getDay() !== 5}
          defaultMonth={date}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </div>

      <div className="flex gap-2 mt-4">
        <Button className="flex-1 bg-tgif-magenta text-primary-foreground hover:bg-tgif-magenta/90" onClick={() => goToDate(date)}>
          Travel to {date ? date.toLocaleDateString() : "..."}
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/friday/${formatDateKey(randomFriday())}`)}>
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>
    </AppShell>
  );
}
