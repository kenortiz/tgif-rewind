import { Commercial } from "@/data/commercials";

export function CommercialBreak({ year, ads }: { year: number; ads: Commercial[] }) {
  return (
    <div className="rounded-lg border border-tgif-yellow/40 bg-tgif-navy-deep/70 p-3">
      <div className="font-retro text-tgif-yellow text-lg mb-2 tracking-widest">
        ⚡ COMMERCIAL BREAK · {year} ⚡
      </div>
      <div className="grid grid-cols-1 gap-2">
        {ads.map((ad) => (
          <div key={ad.youtubeId} className="aspect-video rounded-md overflow-hidden border border-border bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${ad.youtubeId}`}
              title={ad.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
}
