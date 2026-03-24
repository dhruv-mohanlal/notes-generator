# notes-generator

## Overview
A Post-It style knowledge base web app. Users create notes containing multiple content types — text, links, images, TODOs, reminders, map locations — organized in tabs within each note. Notes live on a free-form draggable canvas with color customization and clustering. Notes can be shared via public links or collaborative access, and exported with all content expanded on a single page.

Auth is deferred — the architecture accommodates it but it is not implemented yet.

## Tech Stack
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Database:** MongoDB + Mongoose (separate collections per content type, linked by noteId)
- **Styling:** Tailwind CSS
- **Drag & Drop:** `@dnd-kit/core` (free-form 2D positioning)
- **Rich Text:** `@tiptap/react` + `@tiptap/starter-kit` (JSON serialization to MongoDB)
- **Data Fetching:** `swr`
- **Canvas Gestures:** `@use-gesture/react` (pan/zoom)
- **Export:** `react-to-print`
- **Share Tokens:** `nanoid`
- **Maps:** `react-leaflet`
- **Link Previews:** `open-graph-scraper` (server-side)

## Data Model (MongoDB)

Parent collection with child collections linked by `noteId`:

| Collection | Key Fields |
|---|---|
| `notes` | title, color, position, dimensions, clusterId, ownerId, collaborators, shareToken, isPublic, tabOrder |
| `textContents` | noteId, body (Tiptap JSON) |
| `linkContents` | noteId, url, title, description, favicon |
| `imageContents` | noteId, url, altText, caption |
| `todoContents` | noteId, items[{ text, completed, order }] |
| `mapContents` | noteId, label, lat, lng, address |
| `reminderContents` | noteId, message, remindAt, isCompleted |

All child collections indexed on `{ noteId: 1, createdAt: -1 }`.

Adding a new content type = new collection + Mongoose model + API route + tab component. The `tabOrder` array on each note controls which tabs appear.

## Project Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Landing / redirect to dashboard
│   ├── dashboard/page.tsx        # Main canvas view
│   ├── note/[id]/page.tsx        # Full note detail/edit with tabs
│   ├── share/[token]/page.tsx    # Public read-only view
│   ├── export/[id]/page.tsx      # All tabs expanded for print
│   └── api/
│       ├── notes/                # CRUD + nested content routes
│       └── share/[token]/        # Public share endpoint
├── components/
│   ├── canvas/                   # Canvas, NoteCard, NoteCluster, CanvasControls
│   ├── note/                     # NoteDetail, TabBar, tabs/*
│   ├── export/                   # ExportView
│   ├── share/                    # SharedNoteView
│   └── ui/                       # Shared primitives (Button, Modal, Tabs)
├── lib/
│   ├── db/connection.ts          # Mongoose connection singleton
│   ├── db/models/                # One model per collection
│   ├── api/client.ts             # Fetch wrappers for client-side
│   ├── hooks/                    # useNotes, useCanvas, useNoteContent
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # colors, clustering, export helpers
└── styles/globals.css
```

## API Routes

| Method | Path | Description |
|---|---|---|
| GET/POST | `/api/notes` | List and create notes |
| GET/PATCH/DELETE | `/api/notes/[id]` | Single note CRUD |
| PATCH | `/api/notes/[id]/position` | Lightweight position update (debounced during drag) |
| POST/DELETE | `/api/notes/[id]/share` | Generate/revoke share token |
| GET/POST/PATCH/DELETE | `/api/notes/[id]/{text,links,images,todos,maps,reminders}` | Content CRUD per type |
| GET | `/api/notes/[id]/export` | Aggregated note data for export |
| GET | `/api/share/[token]` | Public note data (no auth) |

## Implementation Phases

### Phase 1 — Foundation
Next.js + Tailwind + MongoDB setup, Note and TextContent models, basic CRUD API routes, dashboard with static note cards, note detail page with text tab (Tiptap).

### Phase 2 — Canvas
`@dnd-kit` free-form dragging, pan/zoom with `@use-gesture/react`, position persistence (debounced), color picker, basic proximity clustering.

### Phase 3 — Content Types
Remaining models + API routes + tab components (links, images, todos, maps, reminders), dynamic TabBar driven by `tabOrder`.

### Phase 4 — Sharing & Export
Share token generation, public share page, export page with all content expanded, print-optimized CSS with `react-to-print`.

### Phase 5 — Polish
Loading states, error boundaries, optimistic updates, cascade deletes, image upload (Cloudinary/S3), responsive design, keyboard shortcuts.

### Phase 6 — Auth & Collaboration (future)
Auth integration, real ownerId, collaboration invites, permission checks, optional real-time collab.

## Key Decisions
- **Separate collections** over embedded docs — extensibility, per-type querying, independent growth
- **@dnd-kit** over react-beautiful-dnd — supports 2D free-form positioning, not just list reordering
- **Tiptap** over Slate/Draft.js — cleaner API, JSON serialization, active ecosystem
- **SWR** over React Query — simpler API, sufficient for this scope
- **Dedicated position endpoint** — avoids heavy payloads during drag operations
- **Canvas → Detail navigation** — clicking a note card opens `/note/[id]` for full editing, keeping the canvas cards compact
