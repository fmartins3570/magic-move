import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Home = lazy(() => import("@/pages/Home"));
const Servicos = lazy(() => import("@/pages/Servicos"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Sobre = lazy(() => import("@/pages/Sobre"));
const Contato = lazy(() => import("@/pages/Contato"));
const Depoimentos = lazy(() => import("@/pages/Depoimentos"));
const Processo = lazy(() => import("@/pages/Processo"));

function LoadingFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-pulse rounded-full bg-primary" />
        <span className="font-display text-2xl tracking-wider text-heading">
          Magic Move
        </span>
        <span className="text-sm text-text-muted">Carregando...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="contato" element={<Contato />} />
          <Route path="depoimentos" element={<Depoimentos />} />
          <Route path="processo" element={<Processo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
