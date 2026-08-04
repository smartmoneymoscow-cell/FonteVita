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
      className="relative mx-auto flex w-full max-w-[42rem] items-center justify-center"
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
          const x = offset === 0 ? "0%" : offset === 1 ? "78%" : "-78%";
          const scale = isFront ? 1 : 0.62;
          const rotate = offset === 0 ? "0deg" : offset === 1 ? "6deg" : "-6deg";

          return (
            <div
              key={b.label}
              className="absolute left-1/2 top-1/2 flex h-full w-full items-center justify-center will-change-transform"
              style={{
                transform: `translate(-50%, -50%) translateX(${x}) scale(${scale}) rotateY(${rotate})`,
                transition: `transform 1100ms ${EASE}, opacity 900ms ${EASE}, filter 900ms ${EASE}`,
                zIndex: isFront ? 30 : 10,
                opacity: isFront ? 1 : 0.85,
                filter: isFront ? "none" : "saturate(0.9) brightness(0.99)",
              }}
              aria-hidden={!isFront}
            >
              <img
                src={b.src}
                alt={b.alt}
                className={`h-full w-auto object-contain ${
                  isFront
                    ? "drop-shadow-[0_46px_46px_rgba(60,70,90,0.26)]"
                    : "drop-shadow-[0_28px_34px_rgba(60,70,90,0.16)]"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
              />
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
