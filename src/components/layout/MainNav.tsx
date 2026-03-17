"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // shadcn utility if present, else I'll check

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
          className={`text-sm font-medium transition-colors hover:text-blue-600 ${
            pathname?.startsWith(link.href) ? "text-blue-600" : "text-slate-600"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}