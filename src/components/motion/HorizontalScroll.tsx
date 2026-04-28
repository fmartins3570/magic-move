import { useRef, Children, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Horizontal Scroll                                                  */
/*                                                                     */
/*  Converts vertical scroll into horizontal movement. The section     */
/*  becomes tall enough to accommodate all panels, and a sticky inner  */
/*  container translates its children left as the user scrolls down.   */
/* ------------------------------------------------------------------ */

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export default function HorizontalScroll({
  children,
  className,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelCount = Children.count(children);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Map vertical scroll progress (0 -> 1) to horizontal translation.
     We translate from 0% to -(panelCount - 1) * 100vw so the last
     panel is fully visible when progress reaches 1. */
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `${-(panelCount - 1) * 100}vw`],
  );

  return (
    <section
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${panelCount * 100}vh` }}
    >
      {/* Sticky inner container stays in view while the section scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x }}
        >
          {Children.map(children, (child, i) => (
            <div
              key={i}
              className="horizontal-scroll-panel flex items-center justify-center"
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
