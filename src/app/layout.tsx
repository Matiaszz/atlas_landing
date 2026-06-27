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
  title: "Atlas | Engenharia de Software sob Demanda (Web, Mobile, Desktop)",
  description: "Desenvolvemos aplicações web, mobile e desktop customizadas com foco em alta performance, código limpo e conversão. Fale com um especialista e faça seu briefing.",
  icons: {
    icon: "/logo_atlas.svg",
    shortcut: "/logo_atlas.svg",
    apple: "/logo_atlas.svg",
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
