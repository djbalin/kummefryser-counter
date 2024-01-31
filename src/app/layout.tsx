import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthContextProvider } from "./contexts/auth_context";
import { Analytics } from "@vercel/analytics/react";
import Header from "./ui/navbar/header";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Kummefryser",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = cookies().get("user_id")?.value;
  return (
    <StrictMode>
      <html lang="en" className="no-scrollbar">
        <body className={`${inter.className} antialiased`}>
          <AuthContextProvider>
            {/* <Navbar user={user}></Navbar> */}
            {/* <Suspense fallback={<p>LOADING</p>}> */}
            {/* <Navbar></Navbar> */}
            <Header></Header>
            {/* </Suspense> */}
            {children}
          </AuthContextProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </StrictMode>
  );
}
