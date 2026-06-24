"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getByIds, buildSchedule, findOverlap, MOMENT_LABELS } from "@/lib/overlap";
import { interactionsAmong, interactionLabel } from "@/lib/data/interactions";
import { getSupplement } from "@/lib/data/supplements";
import type { Supplement } from "@/lib/types";

const KEY = "aspire-schema";

export default function SchemaPage() {
  const [selected, setSelected] = useState<Supplement[]>([]);

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");
      setSelected(getByIds(ids));
    } catch {
      setSelected([]);
    }
  }, []);

  function remove(id: string) {
    const next = selected.filter((s) => s.id !== id);
    setSelected(next);
    localStorage.setItem(KEY, JSON.stringify(next.map((s) => s.id)));
  }

  const schedule = buildSchedule(selected);
  const overlap = findOverlap(selected);
  const combis = interactionsAmong(selected.map((s) => s.id));
  const synergie = combis.filter((c) => c.type === "synergie");
  const letop = combis.filter((c) => c.type !== "synergie");
  const naam = (id: string) => getSupplement(id)?.naam ?? id;

  if (selected.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">Mijn schema</h1>
        <p className="mb-4 text-muted">
          Je hebt nog geen supplementen gekozen. Voeg ze toe vanaf een supplementpagina.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-hover"
        >
          Naar supplementen
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Mijn schema</h1>
      <p className="mb-4 text-sm text-muted">{selected.length} supplementen gekozen</p>

      {overlap.length > 0 && (
        <div className="mb-5 rounded-xl border border-warning/40 bg-warning/10 p-4">
          <h2 className="mb-1 font-semibold text-warning">⚠️ Overlap gevonden</h2>
          <p className="mb-2 text-sm">
            Deze werkzame stoffen zitten in meerdere gekozen supplementen. Let op de
            totale dosering en overleg bij twijfel met een arts.
          </p>
          <ul className="list-inside list-disc text-sm">
            {overlap.map((o) => (
              <li key={o.stof}>
                <strong>{o.stof}</strong> — in: {o.supplementen.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {synergie.length > 0 && (
        <div className="mb-4 rounded-xl border border-success/40 bg-success/10 p-4">
          <h2 className="mb-1 font-semibold text-success">🤝 Deze versterken elkaar</h2>
          <ul className="list-inside list-disc text-sm">
            {synergie.map((c) => (
              <li key={c.a + c.b}>
                <strong>{naam(c.a)} + {naam(c.b)}</strong> — {c.uitleg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {letop.length > 0 && (
        <div className="mb-5 rounded-xl border border-danger/40 bg-danger/5 p-4">
          <h2 className="mb-1 font-semibold text-danger">⚠️ Let op bij deze combinaties</h2>
          <ul className="space-y-1 text-sm">
            {letop.map((c) => {
              const meta = interactionLabel(c.type);
              return (
                <li key={c.a + c.b}>
                  {meta.emoji} <strong>{naam(c.a)} + {naam(c.b)}</strong> ({meta.label}) — {c.uitleg}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {schedule.map((groep) => (
          <div key={groep.moment} className="rounded-xl border border-border bg-card p-4">
            <h2 className="mb-2 font-semibold">{MOMENT_LABELS[groep.moment]}</h2>
            <ul className="space-y-1">
              {groep.supplementen.map((s) => (
                <li key={s.id} className="flex items-center justify-between text-sm">
                  <Link href={`/supplement/${s.id}`} className="hover:text-primary">
                    {s.naam} <span className="text-muted">· {s.doseringStandaard}</span>
                  </Link>
                  <button
                    onClick={() => remove(s.id)}
                    className="text-xs text-muted hover:text-danger"
                  >
                    verwijderen
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
