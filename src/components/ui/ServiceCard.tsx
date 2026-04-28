import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import {
  Clapperboard,
  Box,
  Sparkles,
  Camera,
  Wand2,
  PersonStanding,
  Brush,
  Zap,
  Hand,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: string;
  titleKey: string;
  descKey: string;
  index: number;
}

const iconMap: Record<string, LucideIcon> = {
  clapperboard: Clapperboard,
  box: Box,
  Box: Box,
  sparkles: Sparkles,
  Sparkles: Sparkles,
  camera: Camera,
  wand: Wand2,
  person: PersonStanding,
  Brush: Brush,
  Zap: Zap,
  Hand: Hand,
  User: User,
};

export default function ServiceCard({
  icon,
  titleKey,
  descKey,
  index,
}: ServiceCardProps) {
  const { t } = useTranslation();
  const IconComponent = iconMap[icon] ?? Sparkles;

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl border border-border bg-surface-raised p-6 md:p-8",
        "transition-all duration-300",
        "hover:border-l-primary hover:border-l-2 hover:shadow-lg hover:shadow-primary/5",
        "hover:-translate-y-1",
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
        <IconComponent className="h-6 w-6" />
      </div>

      <h3 className="mb-2 font-display text-xl text-heading">
        {t(titleKey)}
      </h3>

      <p className="text-sm leading-relaxed text-text-muted">
        {t(descKey)}
      </p>
    </motion.div>
  );
}
