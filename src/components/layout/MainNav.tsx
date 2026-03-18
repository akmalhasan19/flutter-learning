"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/learn",
      label: "Belajar",
    },
  ];

  return (
    <nav className="flex items-center gap-4 lg:gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-colors hover:text-white ${
            pathname?.startsWith(link.href) ? "text-[#05b7d6]" : "text-slate-400"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}