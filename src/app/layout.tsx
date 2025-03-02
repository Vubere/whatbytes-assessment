import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ROUTES } from "@/app/_lib/routes";
import NavLink from "@/app/_lib/components/NavLink";
import AppLayout from "./_lib/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhatBytes",
  description: "Done with Next.js, TailwindCSS and Chartjs as an assessment test for frontend web development internship position at WhatBytes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-hidden`}
      >
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}


