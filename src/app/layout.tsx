import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ROUTES } from "@/app/_lib/routes";
import Link from "next/link";
import NavLink from "@/app/_lib/components/NavLink";

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
        className={`${geistSans.variable} ${geistMono.variable} `}
      >
        <header className="sticky top-0 z-50 flex items-center justify-between h-[64px] p-4 md:px-6 border-b border-gray-200">
          <div className="flex items-center gap-x-2">
            <div className="icon h-[24px] min-h-[24px] flex gap-[1px]" role="icon">
              <div className="left"></div>
              <div className="right"></div>
              <div className="left"></div>
            </div>
            <h1 className="font-bold text-2xl tracking-tight leading-[110%]">
              WhatBytes
            </h1>
          </div>
          <div className="flex items-center gap-x-1 border border-gray-200  rounded-[8px] p-1">
            <div className="profile w-[24px] h-[24px] min-h-[24px] min-w-[24px] rounded-full bg-gray-400"></div>
            <p className="text-xs">Rahil Siddique</p>
          </div>
        </header>
        <div className="grid grid-cols-[240px_1fr] h-[calc(100vh-64px)] overflow-hidden">
          <aside className="border-r border-gray-200">
            <nav>
              <ul className="w-full pr-2 pt-[30px]">
                {NavLinks.map((link) => (
                  <li key={link.title} className="block w-full h-[55px] min-h-[55px]">
                    <NavLink
                      title={link.title}
                      link={link.link}
                      activeIcon={link.icon}
                      inactiveIcon={link.icon}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-y-auto w-full p-0 m-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}


const NavLinks = [
  {
    title: "Dashboard",
    link: ROUTES.home,
    icon: <>&nbsp;</>
  },
  {
    title: "Skill Test",
    link: ROUTES.skill_test,
    icon: <>&nbsp;</>
  },
  {
    title: "Internship",
    link: ROUTES.internship,
    icon: <>&nbsp;</>
  },
]