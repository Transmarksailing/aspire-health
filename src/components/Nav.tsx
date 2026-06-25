"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Supplementen" },
  { href: "/aandoeningen", label: "Aandoeningen" },
  { href: "/advies", label: "Advies" },
  { href: "/schema", label: "Mijn schema" },
  { href: "/prijzen", label: "Prijzen" },
];

function isActief(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  return (
    <header className="bg-night text-sand">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5"
        >
          <svg viewBox="0 0 512 512" className="h-8 w-8 shrink-0" aria-hidden="true">
            <polygon points="256,112 256,330 130,330" fill="#9AA0A8" />
            <polygon points="256,112 382,330 256,330" fill="#C5CAD1" />
            <polygon points="256,112 256,330 214,330" fill="#CE2A2B" />
            <polygon points="256,112 298,330 256,330" fill="#E0473F" />
            <g opacity="0.18">
              <polygon points="256,348 130,348 256,470" fill="#9AA0A8" />
              <polygon points="256,348 382,348 256,470" fill="#C5CAD1" />
            </g>
          </svg>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-semibold italic tracking-wide">Aspire</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-sand/70">Wealth</span>
          </span>
        </Link>

        {/* Desktop-menu */}
        <nav className="hidden gap-1 text-sm sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-1.5 ${
                isActief(pathname, l.href) ? "bg-night-soft font-medium" : "hover:bg-night-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger (alleen mobiel) */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-night-soft sm:hidden"
        >
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobiel uitklapmenu */}
      {open && (
        <nav className="border-t border-night-soft px-4 pb-3 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm ${
                isActief(pathname, l.href) ? "bg-night-soft font-medium" : "hover:bg-night-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
