import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MarqueeText from "@/components/motion/MarqueeText";

interface MarqueeDividerProps {
  text?: string;
  direction?: "left" | "right";
}

export default function MarqueeDivider({
  text = "CINEMA • ANIMACAO • CRIATIVIDADE • INOVACAO",
  direction = "left",
}: MarqueeDividerProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const skewY = useTransform(scrollYProgress, [0, 0.5, 1], [-1, 0, 1]);

  return (
    <motion.section
      ref={ref}
      className="relative bg-base py-8 md:py-12 overflow-hidden border-y border-white/[0.04]"
      style={{ y, skewY }}
    >
      <MarqueeText
        text={text}
        direction={direction}
        className="font-display text-5xl md:text-7xl lg:text-8xl text-heading/[0.06] select-none uppercase"
        speed={40}
      />
    </motion.section>
  );
}
