import Link from "next/link";
import type { Supplement } from "@/lib/types";
import { DAGDELEN, primairDagdeel } from "@/lib/advice";
import { MOMENT_LABELS } from "@/lib/overlap";
import AddToSchema from "@/components/AddToSchema";

export interface ScheduleEntry {
  supplement: Supplement;
  reden?: string;
}

// Toont een set supplementen verdeeld over Ochtend / Middag / Avond,
// met inname-moment, optionele reden en een knop om aan je schema toe te voegen.
export default function SupplementSchedule({ entries }: { entries: ScheduleEntry[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {DAGDELEN.map((deel) => {
        const inDeel = entries.filter((e) => primairDagdeel(e.supplement.innameMomenten) === deel);
        if (inDeel.length === 0) return null;
        return (
          <div key={deel} className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-2 font-semibold">
              {deel === "Ochtend" ? "☀️ " : deel === "Middag" ? "🌤️ " : "🌙 "}
              {deel}
            </h3>
            <ul className="space-y-3">
              {inDeel.map(({ supplement: s, reden }) => (
                <li key={s.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <Link href={`/supplement/${s.id}`} className="font-medium hover:text-primary">
                    {s.naam}
                  </Link>
                  <p className="text-xs text-muted">
                    {s.doseringStandaard} · {s.innameMomenten.map((m) => MOMENT_LABELS[m]).join(", ")}
                  </p>
                  {reden && <p className="mt-1 text-xs text-foreground">{reden}</p>}
                  <div className="mt-2">
                    <AddToSchema id={s.id} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
