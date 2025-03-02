"use client";

import { ROUTES } from "@/app/_lib/routes";
import NavLink from "@/app/_lib/components/NavLink";
import React, { useEffect, useRef } from "react";
import useWindowSize from "../hooks/use-window-size";


export default function AppLayout({ children }: { readonly children: React.ReactNode }) {
  const [show, setShow] = React.useState(false);
  const { width } = useWindowSize();
  const sideNavRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setShow(width >= 768);
  }, [width]);
  useEffect(() => {
    if (width < 768 && show) {
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
        {show && <aside className="fixed shadow-2xl md:shadow-none left-0 top-0 min-h-[100vh] md:min-h-[calc(100vh-64px)] md:static border-r border-gray-200 bg-white w-[240px] z-[99] pt-[65px] md:pt-0" ref={sideNavRef}>
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