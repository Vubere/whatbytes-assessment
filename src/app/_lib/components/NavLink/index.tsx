"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  title: string;
  link: string;
  icon?: React.ReactNode;
}

export default function NavLink({ title, link, icon }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link href={link}>
      <span className={`flex items-center gap-x-2 px-4 h-[55px] [&:hover_.link-icon]:text-blue-200 [&:hover_.link-title]:text-blue-200 ${isActive ? "bg-blue-100 rounded-r-full [&_.link-icon]:text-blue-200 " : ""}`}>
        <span className={`w-[24px] h-[24px] link-icon`}>
          {icon}
        </span>
        <span className={`link-title ${!isActive ? "text-gray-400 " : "text-blue-300"} text-sm`}>{title}</span>
      </span>
    </Link>
  );
}