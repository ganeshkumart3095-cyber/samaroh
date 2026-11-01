import type { Metadata, Viewport } from "next";
import {
  Baloo_2,
  Baloo_Tammudu_2,
  Baloo_Thambi_2,
  Hind,
  Hind_Guntur,
  Hind_Madurai,
} from "next/font/google";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { Footer } from "@/ui/shell/Footer";
import { Header } from "@/ui/shell/Header";
import { SkipLink } from "@/ui/shell/SkipLink";
import { SITE_URL } from "@/ui/site";
import "./globals.css";

// One type family across scripts, all from Indian foundries: Baloo (Ek Type) for display in Latin
// and Devanagari, its Thambi (Tamil) and Tammudu (Telugu) siblings; Hind (ITF) and its Madurai and
// Guntur siblings for reading. Self-hosted at build time; unicode ranges load each script on demand.
const display = Baloo_2({
  subsets: ["latin", "devanagari"],
  weight: ["500", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});
const displayTa = Baloo_Thambi_2({
  subsets: ["tamil"],
  weight: ["500", "700"],
  variable: "--font-baloo-ta",
  display: "swap",
  preload: false,
});
const displayTe = Baloo_Tammudu_2({
  subsets: ["telugu"],
  weight: ["500", "700"],
  variable: "--font-baloo-te",
  display: "swap",
  preload: false,
});
const body = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-hind",
  display: "swap",
});
const bodyTa = Hind_Madurai({
  subsets: ["tamil"],
  weight: ["400", "600"],
  variable: "--font-hind-ta",
  display: "swap",
  preload: false,
});
const bodyTe = Hind_Guntur({
  subsets: ["telugu"],
  weight: ["400", "600"],
  variable: "--font-hind-te",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Samaroh · Intelligent Indian Celebration & Event Architecture",
    template: "%s · Samaroh",
  },
  description:
    "Samaroh (समारोह) — An intelligent AI planner for Indian weddings, birthdays, community events, and festivals: exact rupee budgets, multi-day timelines, vendor checklists, and culturally grounded ideas.",
  applicationName: "Samaroh",
  openGraph: {
    title: "Samaroh · Intelligent Indian Celebration & Event Architecture",
    description:
      "Budgets, timelines, vendors and ideas for every function of your celebration.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#060919",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const fontVars = [display, displayTa, displayTe, body, bodyTa, bodyTe]
  .map((f) => f.variable)
  .join(" ");

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Reading request headers renders every page per request, so each gets its own CSP nonce.
  await headers();
  return (
    <html lang="en" className={fontVars}>
      <body>
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
