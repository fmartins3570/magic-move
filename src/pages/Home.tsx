import { useEffect } from "react";
import HeroShowreel from "@/sections/HeroShowreel";
import MarqueeDivider from "@/sections/MarqueeDivider";
import ServicesOverview from "@/sections/ServicesOverview";
import ShowreelReveal from "@/sections/ShowreelReveal";
import FeaturedProjects from "@/sections/FeaturedProjects";
import AboutTeaser from "@/sections/AboutTeaser";
import TestimonialsPreview from "@/sections/TestimonialsPreview";
import CallToAction from "@/sections/CallToAction";
import { COMPANY_NAME } from "@/lib/constants";

export default function Home() {
  useEffect(() => {
    document.title = `${COMPANY_NAME} | Estudio de Cinema e Animacao`;
  }, []);

  return (
    <>
      <HeroShowreel />
      <MarqueeDivider text="CINEMA • ANIMACAO • CRIATIVIDADE • INOVACAO" />
      <ServicesOverview />
      <ShowreelReveal />
      <MarqueeDivider text="NOSSOS PROJETOS" direction="right" />
      <FeaturedProjects />
      <AboutTeaser />
      <TestimonialsPreview />
      <CallToAction />
    </>
  );
}
