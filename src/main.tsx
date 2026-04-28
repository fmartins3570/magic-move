import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "@/i18n";
import { CursorProvider } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/ui/SmoothScroll";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <SmoothScrollProvider>
          <CursorProvider>
            <App />
          </CursorProvider>
        </SmoothScrollProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
);
