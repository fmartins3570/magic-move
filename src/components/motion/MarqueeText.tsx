import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Marquee Text                                                       */
/*                                                                     */
/*  Giant scrolling text divider. The text scrolls infinitely using    */
/*  CSS animation, and its speed dynamically increases with page       */
/*  scroll velocity for a satisfying kinetic feel.                     */
/* ------------------------------------------------------------------ */

interface MarqueeTextProps {
  text: string;
  /** Base speed in seconds for one full cycle. Lower = faster. Default 30. */
  speed?: number;
  className?: string;
  direction?: "left" | "right";
  /** Character or string placed between each text repetition. */
  separator?: string;
}

export default function MarqueeText({
  text,
  speed = 30,
  className,
  direction = "left",
  separator = "✦",
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Track scroll velocity to speed up marquee when scrolling fast */
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 40,
    mass: 0.3,
  });

  /* Map velocity to a speed multiplier: resting = 1x, fast scroll = up to 5x */
  const velocityFactor = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [5, 1, 5],
  );

  /* Build the repeated text string (4 copies with separator) */
  const segment = ` ${separator} ${text}`;
  const repeated = `${text}${segment}${segment}${segment}`;

  const isRight = direction === "right";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden whitespace-nowrap py-6 select-none",
        className,
      )}
      aria-hidden="true"
    >
      <motion.div
        className="inline-flex"
        style={{
          /* Use velocity to modulate animation speed via a CSS custom property */
          // @ts-expect-error -- CSS custom property
          "--marquee-speed": velocityFactor,
        }}
      >
        {/* Two identical blocks side-by-side to create the infinite illusion */}
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className={cn(
              "inline-block font-display text-[8vw] uppercase leading-none tracking-tight md:text-[6vw]",
              "animate-marquee",
              isRight && "[animation-direction:reverse]",
              copy === 1 && "text-stroke",
            )}
            style={{
              animationDuration: `${speed}s`,
              paddingRight: "0.5em",
            }}
          >
            {repeated}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
