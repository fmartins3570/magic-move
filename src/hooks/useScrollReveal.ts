import { useEffect, useState } from "react";

/**
 * Returns `true` once the page has been scrolled past `threshold` pixels.
 * Uses a passive scroll listener for optimal performance.
 */
export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > threshold : false,
  );

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > threshold);
    }

    // Check immediately in case the page loaded already scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
