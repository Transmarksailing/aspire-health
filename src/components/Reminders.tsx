"use client";

import { useEffect, useRef, useState } from "react";

// Instellingen voor de gezondheidsmeldingen. Worden lokaal (localStorage) bewaard.
interface ReminderSettings {
  bewegenAan: boolean;
  bewegenInterval: number; // minuten
  hydratieAan: boolean;
  hydratieInterval: number; // minuten
  werkStart: string; // "HH:MM"
  werkEind: string; // "HH:MM"
  werkdagenOnly: boolean; // ma t/m vr
}

const DEFAULTS: ReminderSettings = {
  bewegenAan: true,
  bewegenInterval: 20,
  hydratieAan: true,
  hydratieInterval: 60,
  werkStart: "09:00",
  werkEind: "18:00",
  werkdagenOnly: true,
};

const STORAGE_KEY = "aspire-reminders";

function load(): ReminderSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function minutesOfDay(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function binnenWerkuren(s: ReminderSettings, now: Date): boolean {
  const dag = now.getDay(); // 0 = zondag, 6 = zaterdag
  if (s.werkdagenOnly && (dag === 0 || dag === 6)) return false;
  const nu = now.getHours() * 60 + now.getMinutes();
  return nu >= minutesOfDay(s.werkStart) && nu < minutesOfDay(s.werkEind);
}

function notify(titel: string, body: string) {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  try {
    new Notification(titel, { body, tag: titel });
  } catch {
    /* sommige browsers vereisen de service worker; stil falen is ok */
  }
}

export default function Reminders() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULTS);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const lastBeweeg = useRef<number>(0);
  const lastHydratie = useRef<number>(0);

  useEffect(() => {
    setSettings(load());
    if (typeof Notification !== "undefined") setPermission(Notification.permission);
  }, []);

  // Bewaar instellingen bij elke wijziging.
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings]);

  // Eén tick per minuut: controleer of er een melding gestuurd moet worden.
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      if (!binnenWerkuren(settings, now)) return;
      const t = now.getTime();
      if (settings.bewegenAan && t - lastBeweeg.current >= settings.bewegenInterval * 60_000) {
        lastBeweeg.current = t;
        notify("Even bewegen 🚶", "Sta op, strek je benen en beweeg een minuutje.");
      }
      if (settings.hydratieAan && t - lastHydratie.current >= settings.hydratieInterval * 60_000) {
        lastHydratie.current = t;
        notify("Tijd om te drinken 💧", "Neem een glas water.");
      }
    };
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [settings]);

  async function enableNotifications() {
    if (typeof Notification === "undefined") return;
    const p = await Notification.requestPermission();
    setPermission(p);
  }

  function set<K extends keyof ReminderSettings>(key: K, value: ReminderSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Meldingen instellen"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-night text-sand shadow-lg hover:bg-night-soft"
      >
        🔔
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-40 w-80 rounded-xl border border-border bg-card p-4 shadow-xl">
          <h2 className="mb-2 text-base font-semibold">Gezondheidsmeldingen</h2>

          {permission !== "granted" && (
            <div className="mb-3 rounded-lg bg-sand p-2 text-xs">
              <p className="mb-2">Meldingen staan nog uit in je browser.</p>
              <button
                onClick={enableNotifications}
                className="rounded-md bg-primary px-3 py-1.5 font-medium text-white hover:bg-primary-hover"
              >
                Meldingen aanzetten
              </button>
            </div>
          )}

          <label className="flex items-center justify-between py-1.5 text-sm">
            <span>🚶 Beweeg-melding</span>
            <input
              type="checkbox"
              checked={settings.bewegenAan}
              onChange={(e) => set("bewegenAan", e.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between py-1 text-sm text-muted">
            <span>elke</span>
            <span>
              <input
                type="number"
                min={5}
                max={180}
                value={settings.bewegenInterval}
                onChange={(e) => set("bewegenInterval", Number(e.target.value))}
                className="w-16 rounded border border-border px-2 py-1 text-right"
              />{" "}
              min
            </span>
          </label>

          <label className="flex items-center justify-between py-1.5 text-sm">
            <span>💧 Hydratie-melding</span>
            <input
              type="checkbox"
              checked={settings.hydratieAan}
              onChange={(e) => set("hydratieAan", e.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between py-1 text-sm text-muted">
            <span>elke</span>
            <span>
              <input
                type="number"
                min={15}
                max={240}
                value={settings.hydratieInterval}
                onChange={(e) => set("hydratieInterval", Number(e.target.value))}
                className="w-16 rounded border border-border px-2 py-1 text-right"
              />{" "}
              min
            </span>
          </label>

          <div className="my-2 border-t border-border pt-2 text-sm font-medium">Werkuren</div>
          <div className="flex items-center justify-between py-1 text-sm">
            <span className="text-muted">Van — tot</span>
            <span className="flex gap-1">
              <input
                type="time"
                value={settings.werkStart}
                onChange={(e) => set("werkStart", e.target.value)}
                className="rounded border border-border px-1 py-1"
              />
              <input
                type="time"
                value={settings.werkEind}
                onChange={(e) => set("werkEind", e.target.value)}
                className="rounded border border-border px-1 py-1"
              />
            </span>
          </div>
          <label className="flex items-center justify-between py-1 text-sm">
            <span className="text-muted">Alleen ma–vr</span>
            <input
              type="checkbox"
              checked={settings.werkdagenOnly}
              onChange={(e) => set("werkdagenOnly", e.target.checked)}
            />
          </label>

          <button
            onClick={() => notify("Testmelding ✅", "Zo zien je meldingen eruit.")}
            className="mt-3 w-full rounded-md border border-border py-1.5 text-sm hover:bg-sand"
          >
            Stuur testmelding
          </button>
          <p className="mt-2 text-[11px] text-muted">
            Meldingen werken het betrouwbaarst met de app open of geïnstalleerd. Op iPhone
            alleen bij een geïnstalleerde app.
          </p>
        </div>
      )}
    </>
  );
}
