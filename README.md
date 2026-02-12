# Sling Money — US GTM Strategy Dashboard

Interactive interview showcase for US GTM leadership role at Sling Money.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (opens http://localhost:3000)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview
```

## Using with Claude Code

This project includes a `CLAUDE.md` file that gives Claude Code full context on the project — the design system, architecture, data sources, and strategic framing. Claude Code will automatically read it.

### Example prompts for Claude Code:

```
# Add new content
"Add a Risk & Mitigation section that covers regulatory risk, competitive response, and execution risk"

# Improve visuals
"Make the City Playbooks section show a map visualization of the 5 target cities"

# Add interactivity
"Add an interactive budget slider that lets me adjust the $350K total and see how it redistributes across channels"

# Refine data
"Update the remittance data to include 2025 Q1-Q2 decline trends and add a note about the new 1% remittance tax"

# Prepare for interview
"Add a Q&A section with likely interview questions and suggested talking points"
```

### Key files:

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project context for Claude Code (auto-read) |
| `STRATEGY.md` | Full research data — all verified numbers, sources, quotes |
| `src/App.jsx` | The entire dashboard (single-file app) |
| `src/main.jsx` | React entry point |

## Project Structure

```
sling-gtm-dashboard/
├── CLAUDE.md           ← Claude Code context file
├── STRATEGY.md         ← Full research & data reference
├── README.md           ← This file
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── App.jsx         ← All dashboard components + data
    └── main.jsx        ← React entry point
```

## Presenting in Interview

**Option A: Dev server** — run `npm run dev` and screenshare localhost:3000

**Option B: Static build** — run `npm run build`, then open `dist/index.html` in browser (no server needed)

**Option C: Deploy** — push the `dist/` folder to Vercel, Netlify, or GitHub Pages for a shareable URL

## Tech Stack

- React 18
- Vite 5
- Recharts (data viz)
- Inline CSS (no Tailwind/CSS modules)
- Google Fonts: DM Sans
