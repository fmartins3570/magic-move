import MarqueeText from "@/components/motion/MarqueeText";

// ---------------------------------------------------------------------------
// MarqueeDivider — Reusable large marquee text divider between sections
// ---------------------------------------------------------------------------

interface MarqueeDividerProps {
  text?: string;
  direction?: "left" | "right";
}

export default function MarqueeDivider({
  text = "CINEMA • ANIMACAO • CRIATIVIDADE • INOVACAO",
  direction = "left",
}: MarqueeDividerProps) {
  return (
    <section className="relative bg-base py-8 md:py-12 overflow-hidden border-y border-white/[0.04]">
      <MarqueeText
        text={text}
        direction={direction}
        className="font-display text-5xl md:text-7xl lg:text-8xl text-heading/[0.06] select-none uppercase"
        speed={40}
      />
    </section>
  );
}
