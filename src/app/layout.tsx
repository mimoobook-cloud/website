import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mimoobook | O presente perfeito para quem você ama",
  description:
    "Scrapbooks artesanais e personalizados feitos à mão. Transforme suas fotos em memórias eternas. Presente perfeito para namorados, família e amigos.",
  keywords: [
    "scrapbook",
    "presente personalizado",
    "scrapbook artesanal",
    "presente namorado",
    "presente namorada",
    "álbum de fotos",
    "mimoobook",
  ],
  openGraph: {
    title: "Mimoobook | O presente perfeito para quem você ama",
    description:
      "Scrapbooks artesanais feitos à mão com amor. Transforme momentos em memórias eternas.",
    url: "https://mimoobook.com.br",
    siteName: "Mimoobook",
    locale: "pt_BR",
    type: "website",
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
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
