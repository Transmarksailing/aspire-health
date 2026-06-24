"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { supplements } from "@/lib/data/supplements";
import type { SupplementCategory } from "@/lib/types";

const CATEGORIES: { value: SupplementCategory | "alle"; label: string }[] = [
  { value: "alle", label: "Alle" },
  { value: "vitamine", label: "Vitamines" },
  { value: "mineraal", label: "Mineralen" },
  { value: "kruid", label: "Kruiden" },
  { value: "vetzuur", label: "Vetzuren" },
  { value: "enzym", label: "Enzymen" },
  { value: "aminozuur", label: "Aminozuren" },
  { value: "paddenstoel", label: "Paddenstoelen" },
  { value: "overig", label: "Overig" },
];

export default function Home() {
  const [zoek, setZoek] = useState("");
  const [cat, setCat] = useState<SupplementCategory | "alle">("alle");

  const resultaten = useMemo(() => {
    const q = zoek.trim().toLowerCase();
    return supplements
      .filter((s) => (cat === "alle" ? true : s.categorie === cat))
      .filter((s) => {
        if (!q) return true;
        return (
          s.naam.toLowerCase().includes(q) ||
          (s.naamEn ?? "").toLowerCase().includes(q) ||
          s.geschiktVoor.some((g) => g.toLowerCase().includes(q)) ||
          s.werkzameStoffen.some((w) => w.toLowerCase().includes(q))
        );
      });
  }, [zoek, cat]);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Supplementen</h1>
      <p className="mb-4 text-sm text-muted">
        Zoek op naam, werkzame stof of waar het bij helpt. Tik op een supplement voor details.
      </p>

      <input
        type="search"
        placeholder="Zoek… (bv. bloeddruk, magnesium, slaap)"
        value={zoek}
        onChange={(e) => setZoek(e.target.value)}
        className="mb-3 w-full rounded-lg border border-border bg-card px-4 py-2.5 outline-none focus:border-primary"
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCat(c.value)}
            className={`rounded-full px-3 py-1 text-sm ${
              cat === c.value
                ? "bg-primary text-white"
                : "bg-sand text-foreground hover:bg-sand-dark"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="mb-3 text-xs text-muted">{resultaten.length} supplementen</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {resultaten.map((s) => (
          <Link
            key={s.id}
            href={`/supplement/${s.id}`}
            className="block rounded-xl border border-border bg-card p-4 transition hover:border-primary hover:shadow-sm"
          >
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <h2 className="font-semibold">{s.naam}</h2>
              <span className="shrink-0 rounded-full bg-sand px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted">
                {s.categorie}
              </span>
            </div>
            <p className="mb-2 line-clamp-2 text-sm text-muted">{s.beschrijving}</p>
            <div className="flex flex-wrap gap-1">
              {s.geschiktVoor.slice(0, 3).map((g) => (
                <span key={g} className="rounded bg-primary-light/40 px-2 py-0.5 text-[11px]">
                  {g}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {resultaten.length === 0 && (
        <p className="mt-8 text-center text-muted">Geen supplementen gevonden.</p>
      )}
    </div>
  );
}
