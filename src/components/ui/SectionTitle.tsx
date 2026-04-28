import { cn } from "@/lib/utils";
import FadeIn from "@/components/motion/FadeIn";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <FadeIn>
      <div className={cn("mb-12 md:mb-16", isCenter && "text-center")}>
        {subtitle && (
          <span className="mb-3 block font-body text-sm font-medium uppercase tracking-widest text-primary">
            {subtitle}
          </span>
        )}

        <h2
          className={cn(
            "font-display text-4xl leading-tight md:text-5xl",
            light ? "text-base" : "text-heading",
          )}
        >
          {title}
        </h2>

        <div
          className={cn(
            "mt-4 h-1 w-16 rounded-full bg-primary",
            isCenter && "mx-auto",
          )}
        />
      </div>
    </FadeIn>
  );
}
