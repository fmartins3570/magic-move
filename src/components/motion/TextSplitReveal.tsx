import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Text Split Reveal                                                  */
/*                                                                     */
/*  A dramatic character-by-character reveal animation. Each character  */
/*  slides in from below (or above, or random order) with a stagger.   */
/*  Characters are clipped by an overflow-hidden parent so they slide   */
/*  into view instead of fading.                                       */
/* ------------------------------------------------------------------ */

interface TextSplitRevealProps {
  text: string;
  className?: string;
  /** Delay before the animation starts (seconds). */
  delay?: number;
  /** Delay between each character (seconds). Default 0.03. */
  staggerDelay?: number;
  /** Direction from which characters appear. */
  animateFrom?: "bottom" | "top" | "random";
}

/* Fisher-Yates shuffle for deterministic-looking random order. We use
   the text as a seed-like key so re-renders produce the same shuffle. */
function shuffleIndices(length: number, seed: string): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  let s = 0;
  for (let i = 0; i < seed.length; i++) {
    s = (s + seed.charCodeAt(i)) | 0;
  }
  for (let i = length - 1; i > 0; i--) {
    s = ((s * 1103515245 + 12345) & 0x7fffffff) >>> 0;
    const j = s % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

const containerVariants = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const charVariants = (fromTop: boolean): Variants => ({
  hidden: {
    y: fromTop ? "-110%" : "110%",
  },
  visible: {
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.23, 0.86, 0.39, 0.96],
    },
  },
});

export default function TextSplitReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  animateFrom = "bottom",
}: TextSplitRevealProps) {
  /* Split by explicit newlines so we can wrap each line independently. */
  const lines = text.split("\n");

  /* Pre-compute random order map when needed. */
  const randomOrderMap = useMemo(() => {
    if (animateFrom !== "random") return null;
    const totalChars = text.replace(/\n/g, "").length;
    const shuffled = shuffleIndices(totalChars, text);
    /* Build a map: flat character index -> its random stagger order */
    const orderMap = new Map<number, number>();
    shuffled.forEach((originalIdx, newOrder) => {
      orderMap.set(originalIdx, newOrder);
    });
    return orderMap;
  }, [animateFrom, text]);

  const fromTop = animateFrom === "top";

  let flatIndex = 0;

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {lines.map((line, lineIdx) => {
        const chars = line.split("");

        const lineElement = (
          <motion.span
            key={lineIdx}
            className="inline-block"
            variants={containerVariants(delay, staggerDelay)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {chars.map((char, charIdx) => {
              const currentFlatIndex = flatIndex;
              flatIndex++;

              const isSpace = char === " ";

              /* For random mode, use a custom transition delay per character */
              const randomDelay =
                animateFrom === "random" && randomOrderMap
                  ? (randomOrderMap.get(currentFlatIndex) ?? 0) * staggerDelay
                  : undefined;

              return (
                <span
                  key={`${lineIdx}-${charIdx}`}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <motion.span
                    className="inline-block"
                    variants={
                      animateFrom === "random"
                        ? {
                            hidden: { y: "110%" },
                            visible: {
                              y: "0%",
                              transition: {
                                duration: 0.6,
                                delay: (randomDelay ?? 0) + delay,
                                ease: [0.23, 0.86, 0.39, 0.96],
                              },
                            },
                          }
                        : charVariants(fromTop)
                    }
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                  >
                    {isSpace ? " " : char}
                  </motion.span>
                </span>
              );
            })}

            {/* Line break between lines (except last) */}
            {lineIdx < lines.length - 1 && <br />}
          </motion.span>
        );

        return lineElement;
      })}
    </span>
  );
}
