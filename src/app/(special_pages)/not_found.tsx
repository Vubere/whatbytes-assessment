import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/app/_lib/routes";


export const metadata: Metadata = {
  title: "404 | WhatBytes",
  description: "This page do not exist on WhatBytes"
}

export default function NotFound() {

  return (
    <>
      <h2>This Page do not exist on WhatByte!</h2>
      <Link href={ROUTES.skill_test}>Go back</Link>
    </>
  )
}