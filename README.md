# 🏛️ Amt Musterhausen

**Das Behörden-Planspiel** — Ein virales Instagram-Asset und Web-Tool für [amtlichgut.de](https://amtlichgut.de).

Swipe dich durch eingehende Akten. Halte alle vier Ressourcen im Gleichgewicht. Überlebe so lange wie möglich.

> **Dual-Failure:** Game Over bei 0 UND bei 100 — in einer deutschen Behörde ist „zu viel" genauso verdächtig wie „zu wenig."

---

## Schnellstart (lokal)

```bash
npm install
cp .env.example .env          # Supabase-Werte optional
npm run dev
```

→ Öffne [http://localhost:5173](http://localhost:5173)

Das Spiel läuft ohne Supabase — Leaderboard wird einfach übersprungen.

---

## Deployment auf Vercel

1. Repo mit Vercel verbinden
2. **Build Command:** `npm run build`  
   **Output Directory:** `dist`
3. Env-Variablen setzen:

| Variable | Wert |
|---|---|
| `VITE_SUPABASE_URL` | Deine Supabase-Projekt-URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anon Key (öffentlich) |

---

## Supabase Setup

### 1. Datenbank-Schema

SQL-Editor auf supabase.com → `supabase/schema.sql` einfügen → ausführen.

```sql
-- Erstellt: scores-Tabelle mit RLS (nur lesen, schreiben nur via Edge Function)
```

### 2. Edge Function deployen

```bash
npm install -g supabase
supabase login
supabase link --project-ref DEIN_PROJECT_REF
supabase functions deploy submit-score
```

Die Edge Function übernimmt:
- Plausibilitätsprüfung (min. 2 Sekunden pro Karte)
- Hard Cap bei Score ≤ 500
- Rate Limit: 10 Einträge/Stunde pro IP

### 3. Service Role Key (für Edge Function)

In Supabase: **Settings → API → service_role key**  
→ Als Secret in der Edge Function setzen:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## Spielmechanik

| Feature | Details |
|---|---|
| **Ressourcen** | Budget 💰, Zufriedenheit 😊, Personal 👥, Effizienz ⚡ — alle starten bei 50 |
| **Dual-Failure** | Game Over bei 0 **und** bei 100 |
| **Effizienz-Drift** | −1 pro Karte (konfigurierbar: `DRIFT_PER_CARD` in `game-config.ts`) |
| **Eskalation** | Alle 10 Karten steigt der Konsequenz-Multiplikator um ×0,3 |
| **Icon-Hints** | Beim Neigen: kleiner Punkt = schwacher Effekt, großer = starker — **keine Zahlen** |
| **Karten** | 60 kuratierte Karten, 3 Mini-Ketten (Klaus IT, Herr Müller, Bürgermeister) |
| **Tutorial** | Karten 1–3 sind fix (lehren die Mechanik) |

### Balancing anpassen

Alles zentral in `src/config/game-config.ts`:

```typescript
DRIFT_PER_CARD: 1,           // Effizienz sinkt pro Karte
ESCALATION_INTERVAL: 10,     // Alle N Karten eskaliert
ESCALATION_MULTIPLIER_STEP: 0.3,
WARNING_THRESHOLD_LOW: 20,   // Ab hier pulsiert die Leiste
WARNING_THRESHOLD_HIGH: 80,
```

---

## Akte des Tages

Wordle-Prinzip: Täglich dieselbe, geseedete Kartenfolge für alle Spieler.

- Seed = Datum als `YYYYMMDD`-Integer → Mulberry32 PRNG
- Kein Backend nötig — rein client-seitig
- Lokales High-Score-Tracking via `localStorage`
- Share-Card trägt automatisch den Tagnummer-Badge

---

## Share-Card

Nach jedem Game Over generiert das Spiel client-seitig ein PNG (1080×1920, Instagram-Story-Format) im amtlichen „Dienstzeugnis"-Design.

- **Teilen:** Web Share API (1 Tap → Instagram Story auf Mobile)
- **Fallback:** Download-Button
- Enthält Score, Todesursache, Perzentil, Tagnummer (bei Akte des Tages)

---

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS (Petrol `#1A3A3A`, Coral `#F26C4F`) |
| Animationen | Framer Motion |
| Sounds | Web Audio API (synthetisiert, keine Audiodateien) |
| Share-Card | Canvas API |
| Backend | Supabase (PostgreSQL + Edge Function) |
| Hosting | Vercel |
| Fonts | Bricolage Grotesque + Playfair Display (Google Fonts) |

---

## Karten kuratieren

`src/data/cards.ts` enthält 60 generierte Karten. Empfehlung: auf 45 kuratieren.

Karten löschen, anpassen oder eigene ergänzen:

```typescript
{
  id: 'b_meine_karte',
  category: 'buerger',
  title: 'Antrag auf Antragsvereinfachung',
  situation: '...',
  leftOption: {
    label: 'Ablehnen',
    effects: { budget: 0, zufriedenheit: -5, personal: 0, effizienz: 3 },
  },
  rightOption: {
    label: 'Genehmigen',
    effects: { budget: -3, zufriedenheit: 8, personal: 0, effizienz: -2 },
  },
}
```

Mini-Ketten via `unlocksCard`: Die freigeschaltete Karte wird automatisch in den nächsten 1–5 Zügen eingemischt.

---

## Roadmap

- **v1** ✅ Fundament — Swipe, Ressourcen, 60 Karten, Share-Card, Leaderboard
- **v1.5** ✅ Akte des Tages + dynamische Stadtansicht
- **v2** — Persistenter Fortschritt, Gebäude-Upgrades, saisonale Events

---

*Ein AmtlichGut. Projekt · [amtlichgut.de](https://amtlichgut.de)*
