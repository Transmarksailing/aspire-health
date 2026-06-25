import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import PWARegister from "@/components/PWARegister";
import Reminders from "@/components/Reminders";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Aspire Wealth — Supplementen & Gezond Leven",
  description:
    "Overzicht van supplementen met inname-timing, overlap-check, prijzen en tips voor gezond leven.",
  manifest: `${basePath}/manifest.json`,
  icons: { icon: `${basePath}/icon.svg` },
};

export const viewport: Viewport = {
  themeColor: "#2C2F34",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <Nav />
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-8 text-xs text-muted">
          <p className="border-t border-border pt-4">
            ⚕️ Aspire Wealth is een informatie- en overzichtsapp, <strong>geen medisch advies</strong>.
            Raadpleeg bij klachten, ziekte of medicijngebruik altijd een arts.
          </p>
        </footer>
        <PWARegister />
        <Reminders />
      </body>
    </html>
  );
}
