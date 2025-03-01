import type { Metadata } from "next";
import SkillTestClient from ".";


export const metadata: Metadata = {
  title: "Skill Test | WhatBytes",
  description: "Skill Test page done with Next.js, TailwindCSS and Chartjs as an assessment test for frontend web development internship at WhatBytes.",
}

export default function SkillTest() {
  return (
    <SkillTestClient />
  );
}