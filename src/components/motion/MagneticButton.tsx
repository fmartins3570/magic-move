import { useRef, useCallback, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Magnetic Button                                                    */
/*                                                                     */
/*  Wraps any element and makes it magnetically attracted toward the   */
/*  cursor when hovered. The element smoothly springs back to its      */
/*  resting position on mouse leave.                                   */
/* ------------------------------------------------------------------ */

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0-1). Default 0.3. */
  strength?: number;
  /** Padding around the element (in px) where the effect is active. Default 100. */
  radius?: number;
}

const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  radius: _radius = 100,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      x.set(distX * strength);
      y.set(distY * strength);
    },
    [strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
