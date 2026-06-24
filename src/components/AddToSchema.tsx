"use client";

import { useEffect, useState } from "react";

const KEY = "aspire-schema";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

// Knop om een supplement aan/uit je persoonlijke schema te zetten (lokaal bewaard).
export default function AddToSchema({ id }: { id: string }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => setIds(read()), []);

  const actief = ids.includes(id);

  function toggle() {
    const next = actief ? ids.filter((x) => x !== id) : [...ids, id];
    setIds(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <button
      onClick={toggle}
      className={`rounded-lg px-4 py-2 text-sm font-medium ${
        actief
          ? "border border-primary bg-primary-light/40 text-foreground"
          : "bg-primary text-white hover:bg-primary-hover"
      }`}
    >
      {actief ? "✓ In jouw schema" : "+ Aan mijn schema toevoegen"}
    </button>
  );
}
