// Haalt de Apify-dataset op en bouwt src/lib/data/fotos.ts:
// per supplement max 3 productfoto's (Amazon.es) + product-URL + merk.
import { writeFileSync, readFileSync } from "node:fs";

const DATASET_IDS = ["hygFxHgBoK6DIaTHO", "gWx9IkGJ1H6ILEqnA"];

// Token: eerst env, anders intern uit de project-config .mcp.json halen
// (alleen voor deze API-call, wordt nooit geprint of geëxporteerd).
function readToken() {
  if (process.env.APIFY_TOKEN) return process.env.APIFY_TOKEN;
  if (process.env.APIFY_API_TOKEN) return process.env.APIFY_API_TOKEN;
  try {
    const cfg = readFileSync("/Users/claudeagent/transm-contact/.mcp.json", "utf8");
    const m = cfg.match(/apify_api_[A-Za-z0-9]+/);
    if (m) return m[0];
  } catch {}
  return "";
}
const token = readToken();

// id -> zoekterm (zelfde als gen-apify-input.mjs), om input-URL terug te koppelen.
const terms = {
  "vitamine-d3": "vitamina D3 2000", "vitamine-k2": "vitamina K2 MK7",
  "omega-3": "omega 3 aceite de pescado", magnesium: "magnesio suplemento",
  knoflook: "ajo capsulas garlic", meidoorn: "espino blanco hawthorn",
  nattokinase: "nattokinase nattokinasa", curcumine: "curcuma curcumina",
  "ginkgo-biloba": "ginkgo biloba", ashwagandha: "ashwagandha KSM-66",
  q10: "coenzima Q10 ubiquinol", mariadistel: "cardo mariano", zink: "zinc suplemento",
  shilajit: "shilajit", cbd: "aceite CBD", "vitamine-c": "vitamina C 1000",
  "vitamine-b12": "vitamina B12 metilcobalamina", ijzer: "hierro suplemento iron",
  calcium: "calcio suplemento", probiotica: "probioticos", psyllium: "psyllium plantago",
  "glucosamine-chondroitine": "glucosamina condroitina", "saw-palmetto": "saw palmetto sabal",
  cranberry: "arandano rojo cranberry", "black-cohosh": "cimicifuga black cohosh",
  melatonine: "melatonina", valeriaan: "valeriana", "l-tryptofaan": "l-triptofano",
  "lions-mane": "melena de leon lions mane", reishi: "reishi ganoderma",
  "groene-thee": "te verde extracto green tea", collageen: "colageno hidrolizado",
  foliumzuur: "acido folico", selenium: "selenio selenium", luteine: "luteina zeaxantina",
  rhodiola: "rhodiola rosea", chroom: "cromo picolinato",
};
const urlToId = {};
for (const [id, term] of Object.entries(terms)) {
  urlToId[`https://www.amazon.es/s?k=${encodeURIComponent(term)}`] = id;
}

// Robuuste terugkoppeling van een input-URL naar een supplement-id
// (vangt ook de aparte run voor de 4 ontbrekende termen op).
function resolveId(input) {
  if (urlToId[input]) return urlToId[input];
  const s = decodeURIComponent(input || "").toLowerCase();
  if (s.includes("shilajit")) return "shilajit";
  if (s.includes("calcio")) return "calcium";
  if (s.includes("sabal") || s.includes("saw palmetto")) return "saw-palmetto";
  if (s.includes("te verde") || s.includes("green tea")) return "groene-thee";
  return null;
}

// Zet een Amazon-thumbnail-URL om naar een grotere variant (zelfde afbeelding-id).
function bigImage(url) {
  if (!url) return url;
  return url.replace(/\._[^/]*_\.jpg$/i, "._AC_SL1000_.jpg");
}

async function getItems() {
  if (!token) return JSON.parse(readFileSync("/tmp/dataset.json", "utf8"));
  const all = [];
  for (const ds of DATASET_IDS) {
    const u = `https://api.apify.com/v2/datasets/${ds}/items?clean=true&format=json&limit=1000&fields=input,brand,url,thumbnailImage,highResolutionImages`;
    const res = await fetch(u, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Apify API ${res.status} voor ${ds}`);
    all.push(...(await res.json()));
  }
  return all;
}

const items = await getItems();
const byId = {};
for (const it of items) {
  const id = resolveId(it.input);
  if (!id) continue;
  if (!byId[id]) byId[id] = { images: [], amazonUrl: null, brand: null };
  const entry = byId[id];
  // verzamel afbeeldingen (eerst hoge resolutie, anders thumbnail vergroot)
  const imgs = (it.highResolutionImages && it.highResolutionImages.length)
    ? it.highResolutionImages
    : (it.thumbnailImage ? [bigImage(it.thumbnailImage)] : []);
  for (const img of imgs) {
    if (entry.images.length < 3 && !entry.images.includes(img)) entry.images.push(img);
  }
  if (!entry.amazonUrl && it.url) entry.amazonUrl = it.url;
  if (!entry.brand && it.brand) entry.brand = it.brand;
}

const header = `// AUTOMATISCH GEGENEREERD via scripts/build-fotos.mjs (Apify -> Amazon.es).
// Per supplement: tot 3 productfoto's, de Amazon.es-productlink en het merk.
import type { Supplement } from "@/lib/types";

export interface SupplementFotos {
  images: string[];
  amazonUrl?: string;
  brand?: string;
}

export const fotos: Record<string, SupplementFotos> = ${JSON.stringify(byId, null, 2)};

export function getFotos(id: string): SupplementFotos | undefined {
  return fotos[id];
}

// Amazon.es-link: echte productlink indien beschikbaar, anders een zoeklink.
export function amazonLink(s: Supplement): string {
  const f = fotos[s.id];
  if (f?.amazonUrl) return f.amazonUrl;
  return \`https://www.amazon.es/s?k=\${encodeURIComponent(s.naamEn ?? s.naam)}\`;
}
`;

writeFileSync("src/lib/data/fotos.ts", header);
const counts = Object.entries(byId).map(([id, v]) => `${id}:${v.images.length}`);
console.log(`Supplementen met foto's: ${Object.keys(byId).length}/37`);
console.log(counts.join("  "));
