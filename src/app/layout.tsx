import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
const abeezee = ABeeZee({ subsets: ["latin"], weight: ["400"] });
export const metadata: Metadata = {
  title: "Kummefryser",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <html lang="en" className="no-scrollbar">
        <body className={`${abeezee.className} antialiased`}>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </StrictMode>
  );
}
