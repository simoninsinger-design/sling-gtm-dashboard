# Sling Money — US GTM Strategy Dashboard

## What This Project Is

An interactive React dashboard built as an **interview showcase** for a **US Go-To-Market (GTM) leadership role at Sling Money**. The dashboard presents a 90-day plan called **"Operación Sling"** to dominate the US↔Mexico remittance corridor through community-led, grassroots growth — while simultaneously fixing onboarding conversion issues.

This is NOT a production app. It's a **strategic presentation tool** designed to impress in an interview with CEO Mike Hudack. It should look polished, data-rich, and signal that the candidate is an operator who builds tools rather than slide decks.

## Tech Stack

- **React 18** (Vite dev server)
- **Recharts** for data visualization (area charts, bar charts, pie charts, line charts)
- **Tailwind-free** — all styling is inline CSS via style objects
- **No external UI library** — custom components throughout
- **Google Fonts**: DM Sans (primary), JetBrains Mono (data)

## Project Structure

```
src/
  App.jsx          — The entire dashboard in one file (all components, data, routing)
  main.jsx         — React entry point
index.html         — Vite HTML entry
package.json       — Dependencies
vite.config.js     — Vite config
CLAUDE.md          — This file (project context)
STRATEGY.md        — Full strategic context and research data
```

## Design System

The dashboard uses a dark theme with orange accent:

```
Background:     #0B0F1A
Surface:        #111827
Card:           #1A2234
Border:         #2A3A52
Accent (orange): #F97316
Green:          #22C55E
Red:            #EF4444
Blue:           #3B82F6
Purple:         #A855F7
Text:           #F1F5F9
Text Secondary: #94A3B8
Text Dim:       #64748B
```

## Dashboard Sections (Navigation)

1. **Executive Summary** — Thesis, corridor TAM ($64.7B), 90-day targets
2. **Market Sizing** — Remittance growth chart, state breakdown, addressable market funnel
3. **The Problem** — Two blockers (onboarding friction + brand trust) with evidence
4. **90-Day Plan** — Three interactive phase cards with detailed playbooks
5. **Channel Strategy** — 10-channel table, budget pie chart, community-first rationale
6. **City Playbooks** — 5 cities (LA, Houston, Chicago, DFW, Phoenix) with neighborhoods, partners, events, tactics
7. **KPIs & Metrics** — Growth curves, phase targets, North Star metric
8. **Budget** — $350K line-item breakdown, hiring plan, unit economics

## Key Data Points (verified via research)

- **Corridor TAM**: $64.7B US→Mexico remittances in 2024 (BBVA Research / Banco de México)
- **Target population**: 38M+ Mexican-origin in US (Census 2024)
- **Average transaction**: $395, ~151M transactions/year (Banxico)
- **Incumbent cost**: ~3% average ($15.13 on $500 send, World Bank Q3 2024)
- **State concentration**: CA ($20.4B, 33%) + TX ($9B, 15%) = 47% of corridor
- **CA Mexican-origin**: 14.2M (33% of state pop)
- **TX Mexican-origin**: 10.8M (35% of state pop)
- **Sling pricing**: $0 fees, instant, mid-market FX rate

## About Sling Money (Company Context)

- **Founded**: 2022 by Mike Hudack (CEO) and Simon Amor
- **Background**: Both from Monzo Bank (UK neobank); Hudack previously Facebook Director of Product, Deliveroo CPTO
- **Product**: Self-custodial stablecoin wallet on Solana; P2P transfers by name; 145+ countries
- **Funding**: $20M total ($5M seed from Ribbit Capital, $15M Series A from USV)
- **Team**: ~40 people (as of late 2025)
- **Key tech partners**: Bridge (Stripe), Paxos, Circle, Plaid, Visa, Solana
- **Revenue**: Currently none — CEO admitted product is gross-margin negative as growth strategy
- **CEO's stated strategy**: "Follow WhatsApp's growth model — start where Venmo isn't (international corridors)"

### Sling's Key Vulnerabilities (from App Store/Play Store reviews)

1. **KYC onboarding friction**: Users get stuck in identity verification; some rejected with no explanation
2. **Brand trust deficit**: Unknown brand asking for SSN + selfies; multiple users call it "scam"
3. **Transfer delays**: Reports of 18-24 hour delays contradicting "instant" marketing
4. **Support capacity**: Small team strained during high volume

## Strategic Thesis

**"Operación Sling"** is a hybrid strategy:
- **Concept A**: Own the US↔Mexico corridor through community-led grassroots growth in 5 target cities
- **Concept B**: Fix the "front door" (onboarding conversion + trust) as a prerequisite to corridor growth

The 90-day plan has 3 phases:
1. **Fix the Front Door** (Weeks 1-3): Audit KYC funnel, add Spanish localization, build trust signals, improve rejection flows
2. **Seed the Corridor** (Weeks 4-8): Deploy in LA, Houston, Chicago, DFW, Phoenix — community events, street teams, micro-influencers, referral program
3. **Scale What Works** (Weeks 9-12): Analyze, double down on winning channels, prepare Series B data

**90-Day Targets**: 50K installs → 35K activated → 22.5K first MX transfers

## When Making Changes

- Keep all components in `App.jsx` — this is a single-file app by design
- Maintain the dark theme and orange accent throughout
- All data should be sourced/defensible — no made-up numbers
- The tone should be confident but not arrogant; specific but not pedantic
- New sections should follow the existing card/grid layout patterns
- Charts should use Recharts with the established color palette
- The audience is a startup CEO — keep it actionable, not academic
