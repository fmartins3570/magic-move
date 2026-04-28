import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Film Grain Overlay                                                 */
/*                                                                     */
/*  A full-screen CSS-only noise overlay that adds cinematic texture.  */
/*  Uses an inline SVG feTurbulence filter for the grain pattern and   */
/*  a subtle opacity flicker for organic movement. Automatically       */
/*  disabled when the user prefers reduced motion.                     */
/* ------------------------------------------------------------------ */

export default function FilmGrain() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    function onChange(e: MediaQueryListEvent) {
      setReducedMotion(e.matches);
    }

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion) return null;

  return (
    <>
      {/* Inline SVG filter definition (hidden, zero-size) */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="film-grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="mono"
          />
        </filter>
      </svg>

      <div
        className="pointer-events-none fixed inset-0 z-[100]"
        aria-hidden="true"
        style={{
          filter: "url(#film-grain-noise)",
          opacity: 0.04,
          animation: "grain-flicker 8s steps(10) infinite",
        }}
      />

      <style>{`
        @keyframes grain-flicker {
          0%, 100% { opacity: 0.04; }
          10% { opacity: 0.035; }
          20% { opacity: 0.05; }
          30% { opacity: 0.03; }
          40% { opacity: 0.045; }
          50% { opacity: 0.035; }
          60% { opacity: 0.05; }
          70% { opacity: 0.04; }
          80% { opacity: 0.03; }
          90% { opacity: 0.045; }
        }
      `}</style>
    </>
  );
}
