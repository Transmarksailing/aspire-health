"use client";

import { useState } from "react";
import { getAdvice } from "@/lib/advice";
import { getSupplement } from "@/lib/data/supplements";
import SupplementSchedule from "@/components/SupplementSchedule";
import type { ScheduleEntry } from "@/components/SupplementSchedule";
import type { Gender } from "@/lib/types";

export default function AdviesPage() {
  const [leeftijd, setLeeftijd] = useState("");
  const [geslacht, setGeslacht] = useState<Gender | "">("");
  const [entries, setEntries] = useState<ScheduleEntry[] | null>(null);

  function bereken(e: React.FormEvent) {
    e.preventDefault();
    const age = Number(leeftijd);
    if (!age || !geslacht) return;
    const res: ScheduleEntry[] = [];
    for (const a of getAdvice(age, geslacht)) {
      const s = getSupplement(a.supplementId);
      if (s) res.push({ supplement: s, reden: a.reden });
    }
    setEntries(res);
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Advies op maat</h1>
      <p className="mb-4 text-sm text-muted">
        Vul je leeftijd en geslacht in voor een algemeen supplementenadvies, verdeeld over
        de dag (ochtend / middag / avond).
      </p>

      <form onSubmit={bereken} className="mb-6 flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="mb-1 block text-muted">Leeftijd</span>
          <input
            type="number"
            min={1}
            max={120}
            value={leeftijd}
            onChange={(e) => setLeeftijd(e.target.value)}
            required
            className="w-24 rounded-lg border border-border bg-card px-3 py-2 outline-none focus:border-primary"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted">Geslacht</span>
          <select
            value={geslacht}
            onChange={(e) => setGeslacht(e.target.value as Gender)}
            required
            className="rounded-lg border border-border bg-card px-3 py-2 outline-none focus:border-primary"
          >
            <option value="">Kies…</option>
            <option value="vrouw">Vrouw</option>
            <option value="man">Man</option>
          </select>
        </label>
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 font-medium text-white hover:bg-primary-hover"
        >
          Geef advies
        </button>
      </form>

      {entries && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Jouw advies ({entries.length} supplementen)</h2>
          {entries.length > 0 ? (
            <SupplementSchedule entries={entries} />
          ) : (
            <p className="text-muted">Geen specifiek advies — vul je gegevens in.</p>
          )}
          <p className="mt-4 text-xs text-muted">
            ⚕️ Algemeen en informatief, geen medisch advies. Houdt geen rekening met je
            persoonlijke situatie, medicijnen of aandoeningen. Overleg bij twijfel met je arts.
          </p>
        </div>
      )}
    </div>
  );
}
