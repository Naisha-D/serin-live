# Serin-Live

A real-time collaborative landing page for [Serin AI](https://serin-ai.com) — where every visitor is a live participant, not just a reader.

**→ [Try it live](https://serin-collab-1vjtaehgf-davenaisha.vercel.app)**  
**→ Open two tabs. Pick different roles. Watch it come alive.**

---

## What makes this different

Most landing pages are static. This one knows you're here.

Every visitor appears as a glowing node in a live constellation — placed on the Talent or Organization side based on the role they pick on landing. Lines draw between talent and org pairs in real time. The page doesn't describe what Serin does. It *shows* it.

---

## Real-time features

**🌌 Live Constellation**  
Every visitor is a node. Talent on the left, organizations on the right. Lines connect matching pairs. The map updates live as people join and leave.

**🖱️ Shared Cursors**  
See every other user's cursor in real time, labeled with their role. Viewport-relative so they stay accurate regardless of scroll position.

**💬 Live Thought Stream**  
Type anything — it appears for every connected user instantly. Thoughts persist across refreshes via Liveblocks `LiveList`, not just broadcast and lost.

**🔓 Collective Feature Unlock**  
Feature cards start locked. Each has a hover threshold — when enough live users hover, the card unlocks for *everyone* simultaneously. A shared moment of discovery.

**⚡ Live Reactions**  
Four reactions with counts that sync across all users in real time. Select to increment, deselect to decrement — updates for everyone instantly.

**👥 Live Presence**  
See exactly how many people are on the page right now, broken down by role.

---

## Tech Stack

- **Next.js 14** — App Router
- **Liveblocks** — presence, shared storage, broadcast events
- **Framer Motion** — animations
- **TypeScript** — full type safety across all real-time state
- **Vercel** — deployment

---

## Why Liveblocks

I've used Supabase before — it was the comfortable choice. I went with Liveblocks because presence and cursor sync are first-class primitives there, not adaptations of a database change stream. The right tool for the right problem. Cleaner code, faster build, better result.

---

## A few decisions worth knowing

- **Cursors are `position: fixed`**, not absolute — because users are almost never at the same scroll position. Viewport-relative coordinates are the correct approach.
- **Role lives in `presence`**, not `storage` — presence is ephemeral and per-user by design. Storage is for shared persistent state.
- **`LiveObject` uses `.set()`**, not spread — spreading breaks Liveblocks' mutation tracking and kills real-time sync silently.
- **All hooks declared before conditional returns** — Rules of Hooks, enforced strictly throughout.

---

## Project structure

```
src/
├── app/                    # Next.js app router, layout, global styles
├── components/
│   ├── sections/           # Hero, ThoughtStream, Features, HowItWorks, Footer
│   ├── ui/                 # Navbar, RoleModal, LiveCursor, LivePresence
│   └── canvas/             # Constellation — canvas-based live node map
├── liveblocks/config.ts    # Liveblocks client + Presence, Storage, Event types
└── lib/utils.ts            # Color palette, formatting helpers
```

---

## Run locally

```bash
git clone https://github.com/Naisha-D/serin-live.git
cd serin-live
npm install
```

Create `.env.local`:
```
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_...
LIVEBLOCKS_SECRET_KEY=sk_...
```

```bash
npm run dev
```

Open two tabs at `localhost:3000` and pick different roles to test real-time sync.

---

*Built by [Naisha Dave](https://github.com/Naisha-D) for Blink Analytics*
