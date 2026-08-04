import { useEffect, useState } from "react";
import collagenBottle from "@/assets/collagen-bottle.png.asset.json";
import magnesiumBottle from "@/assets/magnesium-bottle.png.asset.json";
import omegaBottle from "@/assets/omega-bottle.png.asset.json";

const bottles = [
  { src: collagenBottle.url, alt: "Коллаген FonteVita, 120 капсул", label: "Коллаген" },
  { src: omegaBottle.url, alt: "Омега 3 FonteVita, 180 капсул", label: "Омега 3" },
  { src: magnesiumBottle.url, alt: "Магний + B6 FonteVita, 120 капсул", label: "Магний + B6" },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function BottleImg({
  src,
  alt,
  isFront,
}: {
  src: string;
  alt: string;
  isFront: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`h-full w-auto object-contain transition-opacity duration-300 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${
        isFront
          ? "drop-shadow-[0_46px_46px_rgba(60,70,90,0.26)]"
          : "drop-shadow-[0_28px_34px_rgba(60,70,90,0.16)]"
      }`}
      loading="eager"
      decoding="async"
    />
  );
}

export function HeroBottles() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % bottles.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative mx-auto flex w-full max-w-[40rem] items-center justify-center px-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* single soft premium glow behind the whole composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--sun)_22%,transparent),transparent_75%)] blur-2xl sm:h-[32rem] sm:w-[36rem]"
      />

      <div className="relative h-[22rem] w-full sm:h-[30rem] lg:h-[34rem]">
        {bottles.map((b, i) => {
          const offset = ((i - active + bottles.length) % bottles.length) as 0 | 1 | 2;
          // 0 = center (front), 1 = right, 2 = left
          const isFront = offset === 0;
          const x = offset === 0 ? "0%" : offset === 1 ? "30%" : "-30%";
          const scale = isFront ? 1 : 0.58;
          const rotate = offset === 0 ? "0deg" : offset === 1 ? "6deg" : "-6deg";

          return (
            <div
              key={b.label}
              className="absolute left-1/2 top-1/2 flex h-full w-full items-center justify-center"
              style={{
                transform: `translate(-50%, -50%) translateX(${x}) scale(${scale}) rotateY(${rotate})`,
                transition: `transform 1100ms ${EASE}`,
                zIndex: isFront ? 30 : 10,
              }}
              aria-hidden={!isFront}
            >
              <BottleImg src={b.src} alt={b.alt} isFront={isFront} />
            </div>
          );
        })}
      </div>

      <div className="absolute -bottom-1 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
        {bottles.map((b, i) => (
          <button
            key={b.label}
            onClick={() => setActive(i)}
            aria-label={`Показать ${b.label}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === active ? "w-7 bg-primary" : "w-2 bg-foreground/15 hover:bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
