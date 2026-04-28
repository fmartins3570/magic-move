import { useEffect } from "react";
import { useTranslation } from "@/i18n";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren from "@/components/motion/StaggerChildren";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Quote, Star, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Testimonial data                                                   */
/* ------------------------------------------------------------------ */

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "A Magic Move superou todas as expectativas do nosso projeto. A qualidade da animacao e a atencao aos detalhes foram impressionantes. Cada frame demonstra o compromisso da equipe com a excelencia.",
    author: "Carlos Eduardo",
    role: "CEO",
    company: "TechVision",
    stars: 5,
  },
  {
    id: 2,
    quote:
      "Profissionalismo e criatividade incomparaveis. A equipe entendeu perfeitamente a nossa visao e transformou em algo ainda melhor do que haviamos imaginado. O processo foi transparente do inicio ao fim.",
    author: "Mariana Silva",
    role: "Produtora Executiva",
    company: "",
    stars: 5,
  },
  {
    id: 3,
    quote:
      "O resultado final ficou alem do que imaginavamos. A Magic Move trouxe uma perspectiva criativa que elevou toda a campanha. Os numeros de engajamento superaram todas as metas estabelecidas.",
    author: "Roberto Almeida",
    role: "Diretor de Marketing",
    company: "",
    stars: 5,
  },
  {
    id: 4,
    quote:
      "Equipe talentosa e comprometida com prazos e qualidade. A comunicacao durante todo o processo foi impecavel. Ja estamos planejando nosso proximo projeto juntos.",
    author: "Fernanda Costa",
    role: "Diretora Criativa",
    company: "",
    stars: 5,
  },
  {
    id: 5,
    quote:
      "Parceria que transformou nosso projeto em algo extraordinario. A Magic Move nao apenas executou — eles elevaram o conceito original a um patamar que nao sabiamos ser possivel com nosso orcamento.",
    author: "Andre Santos",
    role: "Fundador",
    company: "StartUp XYZ",
    stars: 5,
  },
  {
    id: 6,
    quote:
      "Qualidade cinematografica impressionante. O nivel de producao entregue pela Magic Move compete com estudios internacionais. Um verdadeiro orgulho para a animacao brasileira.",
    author: "Patricia Lima",
    role: "VP de Conteudo",
    company: "",
    stars: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Depoimentos() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("testimonials.title")} | Magic Move Animation Brasil`;
  }, [t]);

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
            title={t("testimonials.title")}
            subtitle={t("testimonials.subtitle")}
          />
          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">
              A opiniao de quem viveu a experiencia Magic Move. Cada depoimento reflete a dedicacao que colocamos em cada projeto.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials Grid ── */}
      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerChildren
            staggerDelay={0.12}
            className="grid gap-6 md:grid-cols-2"
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface-raised p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary opacity-[0.08]" />

                {/* Quote text */}
                <p className="relative mb-6 text-lg leading-relaxed text-text">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="font-display text-lg text-heading">
                    {item.author}
                  </p>
                  <p className="text-sm text-text-muted">
                    {item.role}
                    {item.company && `, ${item.company}`}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-base py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="mb-4 font-display text-3xl text-heading md:text-4xl">
              Quer fazer parte da nossa historia?
            </h2>
            <p className="mb-8 text-lg text-text-muted">
              Junte-se a dezenas de clientes satisfeitos e transforme seu proximo projeto em uma experiencia visual inesquecivel.
            </p>
            <Button href="/contato" variant="secondary" size="lg">
              {t("contact.title")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
