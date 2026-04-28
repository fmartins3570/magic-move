import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: ReactNode;
  bgImage?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
}

export default function ParallaxSection({
  children,
  bgImage,
  speed = 0.3,
  className,
  overlay = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <section ref={ref} className={cn("relative overflow-hidden", className)}>
      {bgImage && (
        <motion.div
          className="absolute inset-0 -top-[20%] -bottom-[20%] z-0"
          style={{
            y,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {overlay && (
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-base/80 via-base/60 to-base/80" />
      )}

      <div className="relative z-[2]">{children}</div>
    </section>
  );
}
