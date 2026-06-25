"use client";

import { useState } from "react";
import { getAdvice } from "@/lib/advice";
import { getSupplement } from "@/lib/data/supplements";
import { conditions } from "@/lib/data/conditions";
import SupplementSchedule from "@/components/SupplementSchedule";
import type { ScheduleEntry } from "@/components/SupplementSchedule";
import type { Gender } from "@/lib/types";

export default function AdviesPage() {
  const [leeftijd, setLeeftijd] = useState("");
  const [geslacht, setGeslacht] = useState<Gender | "">("");
  const [klachten, setKlachten] = useState<string[]>([]);
  const [entries, setEntries] = useState<ScheduleEntry[] | null>(null);

  function toggleKlacht(id: string) {
    setKlachten((k) => (k.includes(id) ? k.filter((x) => x !== id) : [...k, id]));
  }

  function bereken(e: React.FormEvent) {
    e.preventDefault();
    const age = Number(leeftijd);
    if (!age || !geslacht) return;

    // Verzamel per supplement de reden(en): algemeen advies + gekozen klachten.
    const redenen = new Map<string, Set<string>>();
    const add = (id: string, reden: string) => {
      if (!redenen.has(id)) redenen.set(id, new Set());
      redenen.get(id)!.add(reden);
    };

    for (const a of getAdvice(age, geslacht)) add(a.supplementId, "Algemeen (leeftijd/geslacht)");
    for (const cid of klachten) {
      const c = conditions.find((x) => x.id === cid);
      if (!c) continue;
      for (const sid of c.supplementIds) add(sid, `Bij ${c.naam.toLowerCase()}`);
    }

    const res: ScheduleEntry[] = [];
    for (const [id, redenSet] of redenen) {
      const s = getSupplement(id);
      if (s) res.push({ supplement: s, reden: [...redenSet].join(" · ") });
    }
    setEntries(res);
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Advies op maat</h1>
      <p className="mb-4 text-sm text-muted">
        Vul je leeftijd en geslacht in en vink eventueel je klachten aan. Je krijgt een
        algemeen supplementenadvies, verdeeld over de dag (ochtend / middag / avond).
      </p>

      <form onSubmit={bereken} className="mb-6">
        <div className="mb-4 flex flex-wrap items-end gap-3">
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
        </div>

        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-medium">
            Klachten <span className="text-muted">(optioneel, meerdere mogelijk)</span>
          </legend>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {conditions.map((c) => (
              <label
                key={c.id}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm ${
                  klachten.includes(c.id)
                    ? "border-primary bg-primary-light/30"
                    : "border-border bg-card hover:bg-sand"
                }`}
              >
                <input
                  type="checkbox"
                  checked={klachten.includes(c.id)}
                  onChange={() => toggleKlacht(c.id)}
                  className="shrink-0"
                />
                <span>{c.naam}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 font-medium text-white hover:bg-primary-hover"
        >
          Geef advies
        </button>
      </form>

      {entries && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            Jouw advies ({entries.length} supplementen)
          </h2>
          {entries.length > 0 ? (
            <SupplementSchedule entries={entries} />
          ) : (
            <p className="text-muted">Geen specifiek advies — vul je gegevens in.</p>
          )}
          <p className="mt-4 text-xs text-muted">
            ⚕️ Algemeen en informatief, geen medisch advies. Houdt geen rekening met je
            persoonlijke situatie, medicijnen of (ernstige) aandoeningen. Overleg bij twijfel
            met je arts.
          </p>
        </div>
      )}
    </div>
  );
}
