import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eleve Group | Análise personalizada de plano de saúde",
  description: "Solicite uma análise do seu plano de saúde com Bruna Santos, da Eleve Group.",
  other: {
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
