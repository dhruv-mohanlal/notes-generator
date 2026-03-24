# Notes Generator

A Post-It style knowledge base web app. Create notes with multiple content types — text, links, images, TODOs, reminders, map locations — organized in tabs. Notes live on a free-form draggable canvas with color customization and clustering. Share via public links or export with all content expanded.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Database:** MongoDB + Mongoose
- **Styling:** Tailwind CSS
- **Rich Text:** Tiptap
- **Data Fetching:** SWR
- **Testing:** Jest + ts-jest

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or remote)

### Setup

```bash
# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local

# Start the dev server
npm run dev
```

The app runs at `http://localhost:3000`.

### Environment Variables

| Variable      | Description               |
| ------------- | ------------------------- |
| `MONGODB_URI` | MongoDB connection string |

See `.env.example` for defaults.

## Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start development server  |
| `npm run build`        | Production build          |
| `npm run start`        | Start production server   |
| `npm run lint`         | Run ESLint                |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check formatting          |
| `npm test`             | Run tests with coverage   |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx          # Redirects to /dashboard
│   └── dashboard/
├── lib/
│   ├── db/
│   │   ├── connection.ts # Mongoose connection singleton
│   │   └── models/       # Mongoose models (Note, TextContent, ...)
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Helpers (colors, etc.)
```

## Data Model

Notes are the parent collection. Each content type (text, links, images, todos, maps, reminders) lives in its own collection, linked by `noteId`. Adding a new content type means adding a new collection, model, API route, and tab component.

## License

Private
