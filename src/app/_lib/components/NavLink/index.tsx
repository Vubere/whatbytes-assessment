"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  title: string;
  link: string;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
}

export default function NavLink({ title, link, activeIcon, inactiveIcon }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link href={link}>
      <span className={`flex items-center gap-x-2 px-4 h-[55px] ${isActive ? "bg-blue-100 rounded-r-full" : ""}`}>
        <span className="w-[14px] h-[14px] min-h-[14px] min-w-[14px] rounded-full bg-gray-400">
          {isActive ? activeIcon : inactiveIcon}
        </span>
        <span className={`${!isActive ? "text-gray-400 hover:text-blue-200" : "text-blue-300"} text-sm`}>{title}</span>
      </span>
    </Link>
  );
}