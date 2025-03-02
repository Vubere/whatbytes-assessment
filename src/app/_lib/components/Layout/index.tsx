"use client";

import { ROUTES } from "@/app/_lib/routes";
import NavLink from "@/app/_lib/components/NavLink";
import React, { useEffect, useRef } from "react";
import useWindowSize from "@/app/_lib/hooks/use-window-size";

export default function AppLayout({ children }: { readonly children: React.ReactNode }) {
  const [show, setShow] = React.useState(true);
  const { width } = useWindowSize();
  const sideNavRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setShow(width >= 768);
  }, [width]);

  useEffect(() => {
    if (width < 768 && show) {
      if (sideNavRef?.current?.classList?.contains("hidden")) {
        sideNavRef.current?.classList?.remove("hidden");
      }
      const handleClick = (e: any) => {
        const hamburger = hamburgerRef.current;
        const sideNav = sideNavRef.current;
        const target = e.target;
        const isClickInside = sideNav?.contains?.(target) || hamburger?.contains?.(target);

        if (!isClickInside) {
          setShow(false);
        }
      }
      if (show) {
        document.addEventListener("click", handleClick);
        return () => {
          document.removeEventListener("click", handleClick);
        }
      }
    }
  }, [show, width])


  return (
    <>
      <header className="sticky top-0 z-[100] flex items-center md:justify-between h-[64px] p-2 px-4 md:p-4 md:px-6 border-b border-gray-200 bg-white">

        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <div className="icon h-[20px] min-h-[20px] sm:h-[24px] sm:min-h-[24px] flex gap-[1px] [&>div]:w-[6px] [&>div]:min-w-[6px] [&>div]:sm:w-[10px] sm:min-w-[10px] !max-h-[100%] relative">
            <div className="left"></div>
            <div className="right"></div>
            <div className="left"></div>
          </div>
          <h1 className="font-bold text-xl sm:text-2xl tracking-tight leading-[110%]">
            WhatBytes
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-x-1 border border-gray-200  rounded-[8px] p-1 ml-auto">
          <div className="profile w-[24px] h-[24px] min-h-[24px] min-w-[24px] rounded-full bg-gray-400"></div>
          <p className="text-xs">Rahil Siddique</p>
        </div>
        <button className="w-[30px] h-full min-h-full flex flex-col gap-2 items-center justify-center md:hidden ml-auto cursor-pointer" onClick={() => setShow(!show)} aria-roledescription="toggle menu" ref={hamburgerRef}>
          <span className="block h-[3px] bg-black min-w-full"></span>
          <span className="block h-[3px] bg-black min-w-full"></span>
        </button>

      </header>
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] h-[calc(100vh-64px)] overflow-hidden">
        {show && <aside className="fixed shadow-2xl md:shadow-none left-0 top-0 min-h-[100vh] md:min-h-[calc(100vh-64px)] hidden md:block md:static border-r border-gray-200 bg-white w-[240px] z-[99] pt-[65px] md:pt-0" ref={sideNavRef}>
          <nav>
            <ul className="w-full pr-2 pt-[30px]">
              {NavLinks.map((link) => (
                <li key={link.title} className="block w-full h-[55px] min-h-[55px]">
                  <NavLink
                    title={link.title}
                    link={link.link}
                    icon={link.icon}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </aside>}

        <main className="h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-y-auto w-full p-0 m-0">
          {children}
        </main>
      </div>
    </>
  )
}
const NavLinks = [
  {
    title: "Dashboard",
    link: ROUTES.home,
    icon: <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="20" >
      <path d="M0 0 C1.65 0 3.3 0 5 0 C6 1 6 1 6.09765625 4.81640625 C6.09098089 6.39846682 6.07901875 7.98051159 6.0625 9.5625 C6.05798828 10.36880859 6.05347656 11.17511719 6.04882812 12.00585938 C6.03700518 14.00393756 6.01906914 16.00197783 6 18 C4.02 18 2.04 18 0 18 C0 12.06 0 6.12 0 0 Z " fill="currentColor" transform="translate(12,5)" />
      <path d="M0 0 C0.99 0 1.98 0 3 0 C3 5.94 3 11.88 3 18 C10.59 18 18.18 18 26 18 C26 18.66 26 19.32 26 20 C17.42 20 8.84 20 0 20 C0 13.4 0 6.8 0 0 Z " fill="currentColor" transform="translate(1,7)" />
      <path d="M0 0 C1.65 0 3.3 0 5 0 C6 1 6 1 6.09765625 4.37890625 C6.09098369 5.77347077 6.07902532 7.16801743 6.0625 8.5625 C6.05798828 9.27341797 6.05347656 9.98433594 6.04882812 10.71679688 C6.03700864 12.47790013 6.01907263 14.23896036 6 16 C4.02 16 2.04 16 0 16 C0 10.72 0 5.44 0 0 Z " fill="currentColor" transform="translate(19,7)" />
      <path d="M0 0 C1.65 0 3.3 0 5 0 C6 1 6 1 6.09765625 3.50390625 C6.08605469 4.51324219 6.07445312 5.52257812 6.0625 6.5625 C6.05347656 7.57441406 6.04445313 8.58632813 6.03515625 9.62890625 C6.02355469 10.41136719 6.01195312 11.19382812 6 12 C4.02 12 2.04 12 0 12 C0 8.04 0 4.08 0 0 Z " fill="currentColor" transform="translate(5,11)" />
    </svg>
  },
  {
    title: "Skill Test",
    link: ROUTES.skill_test,
    icon: <svg width="18" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="30" r="25" fill="white" stroke="currentColor" strokeWidth="4" />
      <polygon points="40,55 60,55 60,85 50,75 40,85" fill="currentColor" />
      <circle cx="50" cy="30" r="12" fill="currentColor" stroke="currentColor" strokeWidth="2" />
    </svg>


  },
  {
    title: "Internship",
    link: ROUTES.internship,
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24"><path d="M 6 3 L 6 29 L 26 29 L 26 9.59375 L 25.71875 9.28125 L 19.71875 3.28125 L 19.40625 3 Z M 8 5 L 18 5 L 18 11 L 24 11 L 24 27 L 8 27 Z M 20 6.4375 L 22.5625 9 L 20 9 Z M 11 13 L 11 15 L 21 15 L 21 13 Z M 11 17 L 11 19 L 21 19 L 21 17 Z M 11 21 L 11 23 L 21 23 L 21 21 Z" fill="currentColor" /></svg>
  },
]

