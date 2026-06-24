import type { NextConfig } from "next";

// Aspire wordt als statische site gehost op GitHub Pages.
// In productie staat de site onder /aspire-health (projectnaam = repo-naam);
// lokaal (dev) draait alles op de root.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/aspire-health" : "";

const nextConfig: NextConfig = {
  output: "export", // genereert statische bestanden in /out
  basePath,
  images: {
    unoptimized: true, // nodig bij static export
  },
  // Maak het basePath beschikbaar in de browser (voor manifest + service worker).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
