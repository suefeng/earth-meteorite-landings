import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "ol/ol.css";
import { TITLE, LINKS } from "@/infrastructure/consts";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: TITLE,
  description:
    "This comprehensive data set from The Meteoritical Society contains information on all of the known meteorite landings from NASA's Open Data Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-[rgb(--background-rgb)]-100 top-0 z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-2 md:px-4 max-w-7xl mx-auto">
            <h1 className="text-3xl mb-2 md:mb-0">{TITLE}</h1>
            <Nav links={LINKS} />
          </div>
        </header>
        <main className="min-h-screen py-4 px-2 md:px-4 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
