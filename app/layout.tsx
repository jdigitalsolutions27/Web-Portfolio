import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FloatingDock } from "@/components/layout/floating-dock";
import { BackToTop } from "@/components/layout/back-to-top";
import { IntroLoader } from "@/components/layout/intro-loader";
import { CommandPalette } from "@/components/command/CommandPalette";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageTransition } from "@/components/layout/page-transition";
import { PROFILE, SITE_URL } from "@/lib/constants";
import { getPersonSchema, getWebsiteSchema } from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} | Full-Stack Web Developer`,
    template: `%s`,
  },
  icons: {
    icon: [{ url: "/brand/logo-mark.svg", type: "image/svg+xml" }],
    shortcut: "/brand/logo-mark.svg",
    apple: "/brand/logo-mark.svg",
  },
  description:
    "Premium portfolio of Alden Jay A. Centino - full-stack web developer focused on high-performance, user-centered digital experiences.",
  keywords: [
    "Alden Jay A. Centino",
    "Full-Stack Web Developer",
    "Next.js Portfolio",
    "Laravel Developer",
    "UI Engineer",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = getPersonSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${manrope.variable} font-body antialiased`}>
        <ThemeProvider>
          <NextTopLoader
            color="#22d3ee"
            showSpinner={false}
            height={2}
            crawlSpeed={180}
            easing="ease"
            speed={220}
          />
          <IntroLoader />
          <CursorGlow />
          <Navbar />
          <div aria-hidden className="nav-offset-spacer" />
          <PageTransition>
            <main className="min-h-screen">{children}</main>
          </PageTransition>
          <Footer />
          <FloatingDock />
          <BackToTop />
          <CommandPalette />
          <Toaster position="top-right" richColors theme="system" />
        </ThemeProvider>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </body>
    </html>
  );
}

