# TerraRun — Run. Loop. Conquer.

A territory capture running app where every closed loop you run becomes your turf on the map. Built for the [DEV Weekend Challenge](https://dev.to/challenges/weekend-2026-02-28) (Feb 27 – Mar 2, 2026).

**Live Demo:** [terrarun-dev.vercel.app](https://terrarun-dev.vercel.app/)

**Video Demo:** [youtu.be/Cr7n3qfzARM](https://youtu.be/Cr7n3qfzARM)

---

## The Idea

Running apps like Strava and Nike Run Club are great at tracking — but once a run is done, all you have is a line on a map. TerraRun changes that. Run a closed loop, and the enclosed area fills in as your territory. Others can reclaim it by running the same loop. Every neighborhood becomes a game board.

## Features

- **Territory Capture** — Closed-loop runs become filled polygon territories on the map, matching the exact shape of your route
- **Live Run Simulation** — Animated demo run traces an irregular street-level path, captures territory on loop close
- **Share Card** — Post-capture modal with route shape graphic, stats (distance, time, pace, area), and share buttons for WhatsApp, Telegram, X
- **Interactive Map** — Full-screen Mapbox with 4 styles (Dark, Streets, Satellite, Outdoors), 3D toggle, territory click popups
- **Leaderboard** — Rankings by territory held, top-3 podium, search and filters
- **Profile** — Stats dashboard, achievement badges, activity feed
- **Sponsor Zones** — Brand zones on the map (Nike, Adidas, Gatorade, Under Armour) with unlock-by-running coupon codes

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | App Router, SSR |
| React 19 | UI |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Styling, dark theme |
| Mapbox GL JS 3 + react-map-gl 8 | Map rendering |
| Turf.js 7 | Geospatial polygon area calculation |
| Framer Motion 12 | Animations |
| Zustand 5 | State management |
| Lucide React | Icons |

## Getting Started

```bash
# Clone
git clone https://github.com/manjunath5513/Dev-Challenge.git
cd Dev-Challenge

# Install
npm install

# Add your Mapbox token
# Create .env.local with:
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                        # Pages (landing, map, leaderboard, profile, sponsors)
├── components/
│   ├── map/                    # MapView, TerritoryLayer, RunSimulation, ShareModal, SponsorZones
│   ├── landing/                # Hero, Features, HowItWorks
│   ├── layout/                 # Navbar (desktop + mobile bottom nav)
│   ├── leaderboard/            # LeaderboardTable
│   └── profile/                # ProfileStats
├── lib/                        # Mock data, territory logic, constants
├── store/                      # Zustand store
└── types/                      # TypeScript interfaces
```

## How Territory Capture Works

1. Runner completes a closed-loop route (start point = end point)
2. Route coordinates form a polygon
3. Turf.js calculates the enclosed area in km²
4. Polygon renders as a filled GeoJSON layer on the map with glow borders
5. Territory is owned until someone else runs the same loop

---

Built by [Manjunath](https://github.com/manjunath5513) for the DEV Weekend Challenge 2026.
