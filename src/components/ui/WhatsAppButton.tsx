import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "@/i18n";
import type { Locale } from "@/i18n";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const messages: Record<Locale, string> = {
  "pt-BR": "Ola! Gostaria de saber mais sobre os servicos da Magic Move.",
  en: "Hello! I would like to know more about Magic Move's services.",
  es: "Hola! Me gustaria saber mas sobre los servicios de Magic Move.",
};

function getWhatsAppUrl(locale: Locale): string {
  const message = encodeURIComponent(messages[locale]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export default function WhatsAppButton() {
  const { locale } = useTranslation();

  return (
    <motion.a
      href={getWhatsAppUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
      style={{ backgroundColor: "#25D366" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-6 w-6 text-white" />

      {/* Pulse ring */}
      <span
        className="absolute inset-0 animate-ping rounded-full opacity-30"
        style={{ backgroundColor: "#25D366" }}
      />
    </motion.a>
  );
}
