import type { Supplement } from "@/lib/types";

export interface SupplierLink {
  naam: string;
  url: string;
}

// Zoekterm voor webshops: Engelse naam (internationaal) of de Nederlandse naam.
function term(s: Supplement): string {
  return encodeURIComponent(s.naamEn ?? s.naam);
}

/** Directe Amazon.es-zoeklink voor dit supplement. */
export function amazonEsUrl(s: Supplement): string {
  return `https://www.amazon.es/s?k=${term(s)}`;
}

/**
 * Drie leveranciers per supplement als werkende zoeklinks.
 * (Zoeklinks i.p.v. vaste productpagina's, zodat ze altijd kloppen en up-to-date zijn.)
 */
export function suppliers(s: Supplement): SupplierLink[] {
  const t = term(s);
  return [
    { naam: "Amazon.es", url: `https://www.amazon.es/s?k=${t}` },
    { naam: "iHerb", url: `https://es.iherb.com/search?kw=${t}` },
    { naam: "Vitakruid", url: `https://www.vitakruid.nl/zoeken?q=${t}` },
  ];
}
