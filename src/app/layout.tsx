import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthContextProvider } from "./contexts/auth_context";
import Navbar from "./ui/navbar/navbar";
import { StrictMode } from "react";
import { cookies } from "next/headers";
// const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  title: "Kummefryser",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = cookies().get("user_id")?.value;
  return (
    <StrictMode>
      <html lang="en" className="no-scrollbar">
        <body className={`{inter.className}`}>
          <AuthContextProvider>
            <Navbar user={user}></Navbar>
            {children}
          </AuthContextProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </StrictMode>
  );
}
