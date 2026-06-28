import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Atlas | Softwares Sob Demanda",
  description:
    "Transforme sua ideia em um site, landing page ou sistema feito sob medida. Soluções modernas para atrair clientes, automatizar processos e impulsionar seu negócio.",

  icons: {
    icon: "/atlas-sbg.svg",
    shortcut: "/atlas-sbg.svg",
    apple: "/atlas-sbg.svg",
  },

  openGraph: {
    title: "Atlas | Softwares Sob Demanda",
    description:
      "Transforme sua ideia em um site, landing page ou sistema feito sob medida.",
    url: "https://atlasns.vercel.app/", // seu domínio
    siteName: "Atlas",
    images: [
      {
        url: "/atlas-sbg.svg",
        width: 1200,
        height: 630,
        alt: "Atlas",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Atlas | Softwares Sob Demanda",
    description:
      "Transforme sua ideia em um site, landing page ou sistema feito sob medida.",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
