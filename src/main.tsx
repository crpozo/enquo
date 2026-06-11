import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { CaseStudyDetailPage } from "./pages/CaseStudyDetailPage";
import { InsightsPage } from "./pages/InsightsPage";
import { WhoWeArePage } from "./pages/WhoWeArePage";
import { CareersPage } from "./pages/CareersPage";
import { DemoPage } from "./pages/DemoPage";

import "./styles/tokens.css";
import "./styles/enquo.css";
import "./styles/wow.css";
import "./styles/pages.css";
import "./styles/wireframe.css";

// `basename` makes BrowserRouter aware of the GitHub Pages sub-path.
// Vite injects BASE_URL ("/enquo/" in prod, "/" in dev) at build time.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

/* One route table, mounted twice: at "/" (designed site) and under
   "/wireframe" (same pages, design stripped by wireframe.css). Keeping a
   single source of routes guarantees both stay in sync. The wireframe is
   intentionally limited to the three pages presented to the client. */
const pageRoutes = (
  <>
    <Route index element={<HomePage />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="industries" element={<IndustriesPage />} />
    <Route path="case-studies" element={<CaseStudiesPage />} />
    <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
    <Route path="insights" element={<InsightsPage />} />
    <Route path="who-we-are" element={<WhoWeArePage />} />
    <Route path="careers" element={<CareersPage />} />
    <Route path="demo" element={<DemoPage />} />
    {/* Catch-all → home */}
    <Route path="*" element={<HomePage />} />
  </>
);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename || "/"}>
      <Routes>
        <Route path="/wireframe" element={<Layout />}>
          {pageRoutes}
        </Route>
        <Route path="/" element={<Layout />}>
          {pageRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
