import Link from "next/link";
import { supplements } from "@/lib/data/supplements";

// Verzamel alle prijzen, gesorteerd per supplement.
const metPrijzen = supplements.filter((s) => s.prijzen && s.prijzen.length > 0);

export default function PrijzenPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Prijzen</h1>
      <p className="mb-5 text-sm text-muted">
        Handmatig ingevoerde voorbeeldprijzen. In een latere fase halen we deze
        automatisch bij leveranciers op.
      </p>

      <div className="space-y-5">
        {metPrijzen.map((s) => {
          const goedkoopste = Math.min(...s.prijzen!.map((p) => p.prijs));
          return (
            <div key={s.id} className="rounded-xl border border-border bg-card p-4">
              <Link
                href={`/supplement/${s.id}`}
                className="font-semibold hover:text-primary"
              >
                {s.naam}
              </Link>
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted">
                    <th className="py-1">Leverancier</th>
                    <th>Inhoud</th>
                    <th>Prijs</th>
                    <th>Per stuk</th>
                  </tr>
                </thead>
                <tbody>
                  {s
                    .prijzen!.slice()
                    .sort((a, b) => a.prijs - b.prijs)
                    .map((p, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-1">{p.leverancier}</td>
                        <td>{p.inhoud}</td>
                        <td className={p.prijs === goedkoopste ? "font-semibold text-success" : ""}>
                          €{p.prijs.toFixed(2)}
                          {p.prijs === goedkoopste && " ✓"}
                        </td>
                        <td className="text-muted">{p.eenheidsprijs ?? "—"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
