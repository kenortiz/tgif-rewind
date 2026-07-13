import { cn } from "@/lib/utils";

type Props = { size?: "sm" | "md" | "lg"; className?: string };

export function TgifLogo({ size = "md", className }: Props) {
  const sizes = {
    sm: "text-3xl",
    md: "text-6xl",
    lg: "text-8xl",
  };
  return (
    <div className={cn("inline-block font-display leading-none animate-flicker", sizes[size], className)}>
      <span className="text-tgif-magenta text-glow-pink">T</span>
      <span className="text-tgif-yellow text-glow-yellow">G</span>
      <span className="text-tgif-cyan" style={{ textShadow: "0 0 8px hsl(var(--tgif-cyan) / 0.8)" }}>I</span>
      <span className="text-tgif-magenta text-glow-pink">F</span>
    </div>
  );
}
