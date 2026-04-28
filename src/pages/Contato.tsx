import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL, COMPANY_EMAIL } from "@/lib/constants";
import FadeIn from "@/components/motion/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import {
  Send,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Form state type                                                    */
/* ------------------------------------------------------------------ */

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  servico: string;
  orcamento: string;
  mensagem: string;
  prazo: string;
}

const initialForm: FormData = {
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  servico: "",
  orcamento: "",
  mensagem: "",
  prazo: "",
};

const serviceOptions = [
  "Animacao 2D",
  "Animacao 3D",
  "Motion Graphics",
  "Stop Motion",
  "VFX",
  "Animacao de Personagens",
  "Outro",
];

const budgetOptions = [
  "Ate R$10.000",
  "R$10.000 - R$50.000",
  "R$50.000 - R$100.000",
  "R$100.000+",
  "A definir",
];

/* ------------------------------------------------------------------ */
/*  Shared input styles                                                */
/* ------------------------------------------------------------------ */

const inputClasses =
  "w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-text placeholder:text-text-muted/50 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Contato() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `${t("contact.title")} | Magic Move Animation Brasil`;
  }, [t]);

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app this would POST to an API
  };

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-base pt-32 pb-20">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionTitle
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />
          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">
              Conte-nos sobre o seu projeto. Responderemos em ate 24 horas com uma proposta personalizada.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Two-column Layout ── */}
      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* ── Left: Budget Form ── */}
            <FadeIn direction="left" className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-base p-6 md:p-10">
                <h3 className="mb-8 font-display text-2xl text-heading md:text-3xl">
                  {t("contact.form.name") ? "Solicite um Orcamento" : "Solicite um Orcamento"}
                </h3>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center py-16 text-center"
                    >
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                        <CheckCircle className="h-10 w-10 text-emerald-500" />
                      </div>
                      <h4 className="mb-2 font-display text-2xl text-heading">
                        Mensagem enviada com sucesso!
                      </h4>
                      <p className="mb-6 max-w-sm text-text-muted">
                        Recebemos sua mensagem e retornaremos em breve. Obrigado pelo interesse!
                      </p>
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          setForm(initialForm);
                        }}
                        variant="secondary"
                      >
                        Enviar outra mensagem
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Row: Nome + Email */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text">
                            {t("contact.form.name")} *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.nome}
                            onChange={update("nome")}
                            placeholder="Seu nome completo"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text">
                            {t("contact.form.email")} *
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={update("email")}
                            placeholder="seu@email.com"
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Row: Telefone + Empresa */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text">
                            {t("contact.form.phone")}
                          </label>
                          <input
                            type="tel"
                            value={form.telefone}
                            onChange={update("telefone")}
                            placeholder="(11) 99999-9999"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text">
                            {t("contact.form.company")}
                          </label>
                          <input
                            type="text"
                            value={form.empresa}
                            onChange={update("empresa")}
                            placeholder="Nome da empresa"
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Row: Servico + Orcamento */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text">
                            {t("contact.form.service")}
                          </label>
                          <select
                            value={form.servico}
                            onChange={update("servico")}
                            className={cn(inputClasses, "appearance-none")}
                          >
                            <option value="">Selecione um servico</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text">
                            {t("contact.form.budget")}
                          </label>
                          <select
                            value={form.orcamento}
                            onChange={update("orcamento")}
                            className={cn(inputClasses, "appearance-none")}
                          >
                            <option value="">Faixa de orcamento</option>
                            {budgetOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Prazo */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-text">
                          {t("contact.form.deadline")}
                        </label>
                        <input
                          type="text"
                          value={form.prazo}
                          onChange={update("prazo")}
                          placeholder="Ex: 3 meses, Q2 2026, flexivel..."
                          className={inputClasses}
                        />
                      </div>

                      {/* Mensagem */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-text">
                          {t("contact.form.message")}
                        </label>
                        <textarea
                          rows={4}
                          value={form.mensagem}
                          onChange={update("mensagem")}
                          placeholder="Descreva seu projeto, objetivos e qualquer detalhe relevante..."
                          className={cn(inputClasses, "resize-none")}
                        />
                      </div>

                      {/* Submit */}
                      <Button type="submit" className="w-full" size="lg">
                        <Send className="mr-2 h-4 w-4" />
                        {t("contact.submit")}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>

            {/* ── Right: Contact Info ── */}
            <FadeIn direction="right" delay={0.2} className="space-y-6 lg:col-span-2">
              {/* WhatsApp Card */}
              <div className="overflow-hidden rounded-xl border border-emerald-500/20 bg-surface-raised">
                <div className="h-1 bg-emerald-500" />
                <div className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                    <MessageCircle className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h4 className="mb-2 font-display text-lg text-heading">
                    Prefere falar pelo WhatsApp?
                  </h4>
                  <p className="mb-4 text-sm text-text-muted">
                    Resposta rapida e direta com nossa equipe.
                  </p>
                  <Button
                    href={WHATSAPP_URL}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="md"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t("contact.whatsapp")}
                  </Button>
                </div>
              </div>

              {/* Email Card */}
              <div className="rounded-xl border border-border bg-surface-raised p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-1 font-display text-lg text-heading">
                  E-mail
                </h4>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-sm text-primary transition-colors hover:text-primary/80"
                >
                  {COMPANY_EMAIL}
                </a>
                <p className="mt-1 text-xs text-text-muted">
                  Resposta em ate 24h
                </p>
              </div>

              {/* Phone Card */}
              <div className="rounded-xl border border-border bg-surface-raised p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-1 font-display text-lg text-heading">
                  Telefone
                </h4>
                <a
                  href="tel:+5511976669187"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  (11) 97666-9187
                </a>
              </div>

              {/* Social Links */}
              <div className="rounded-xl border border-border bg-surface-raised p-6">
                <h4 className="mb-4 font-display text-lg text-heading">
                  Redes Sociais
                </h4>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, label: "Instagram" },
                    { icon: Youtube, label: "YouTube" },
                    { icon: Facebook, label: "Facebook" },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-base text-text-muted transition-all duration-200 hover:border-primary hover:text-primary"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Operating hours */}
              <div className="rounded-xl border border-border bg-surface-raised p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-heading">
                      Horario de Atendimento
                    </h4>
                    <p className="text-sm text-text-muted">Seg-Sex 09h - 17h</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
