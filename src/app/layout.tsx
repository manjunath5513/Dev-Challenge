import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TerraRun - Claim Your Territory",
  description: "Run. Loop. Conquer. A territory capture running app where runners claim turf by running closed loops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-terra-dark text-foreground`}
      >
        <Navbar />
        <main className="pt-14 pb-16 md:pb-0 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
