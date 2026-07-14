# Portfolio Page — Project Breakdown

What the `/portfolio` slide deck (`src/pages/portfolio.astro`) tells about each project. Source data lives in `src/content/projects/*.mdx`.

Order shown on page: **Chroma Krash → HAGE Games → D*mn That's My Kard → Click And Shield → Samsul Recycle**.

Each project gets up to 3 slides:
- **Intro** — hero image, type/year/engine/duration, title, role, dek, tags, links (play/itch/source/case study).
- **STAR** — 4 cells (Situation, Task, Action, Result) + up to 3 result metrics.
- **Gallery** — only if `screenshots` exist (none of the 5 currently have them, so gallery slides do not render). Press shown here when present.

Deck also has a **Cover** (name + year), an **About** slide (portrait, summary, stack, socials, highlights), and a **Closing** slide.

---

## 01 · Chroma Krash
- **Type/Year/Engine/Duration:** jam · 2026 · Unity · 1 week
- **Role:** Gameplay & Systems Programmer
- **Dek:** Fast-paced 2D pixel arcade game built in one week for Gimjam ITB. Eat space objects matching your colour before chaos catches up.
- **Tags:** unity, arcade, jam, architecture
- **Links:** source (GitHub ColorOrCrash), itch

**STAR**
- **Situation:** One-week ITB jam, 2D limited-space theme. Main risk = code stability, not design. Needed architecture letting systems collaborate without knowing each other.
- **Task:** Set modular foundation, build core gameplay systems, keep codebase clean so team plugs in mechanics without breakage.
- **Action:** Service Locator + Event Bus for decoupled comms. State Pattern for game flow (prep/play/game-over). Dedicated tutorial state machine advancing only on completed actions. Responsive 2D player controller.
- **Result:** Shipped complete game, clean architecture under pressure. State-driven tutorial guided players without disrupting main loop.
- **Metrics:** Build time = 1 week · Role = Gameplay + Systems · Patterns = Service Locator · Event Bus · State

---

## 02 · HAGE Games
- **Type/Year/Duration:** web · 2025 · ongoing (no engine)
- **Role:** Full-Stack Developer
- **Dek:** Full-stack platform for hosting/uploading games. .NET back end, React front end, deployed on Docker + AWS S3 + CloudFront.
- **Tags:** react, dotnet, aws, docker, devops, fullstack
- **Links:** source (GitHub havengrind/frontend), play (hagegames.com)

**STAR**
- **Situation:** Full vertical — public catalogue, developer dashboard (uploads + stats), back-end plumbing. Hosting real builds = serious storage + delivery. First time owning back end + deploy together.
- **Task:** Own React front end, .NET back end, deploy story. Production site devs actually upload to, not a demo.
- **Action:** React + TypeScript + Tailwind front end. .NET back end (auth, uploads, metadata APIs). Docker container on VPS. AWS S3 + CloudFront for build artefacts. Google Ads on catalogue. Pulled into back-end + DevOps seriously.
- **Result:** Live at hagegames.com. Strengthened back-end + DevOps most. End-to-end ownership across front/back/infra.
- **Metrics:** Role = Full-Stack · Stack = React · .NET · Docker · AWS · Status = Live, ongoing

---

## 03 · D*mn, That's My Kard
- **Type/Year/Engine/Duration:** game · 2025 · Unity · 3 months
- **Role:** Programmer
- **Dek:** Classic-style tactical card game where Blackjack rules decide attack order, not damage size. Climb the tower one hand at a time.
- **Tags:** unity, cards, splines, state-pattern
- **Links:** source (GitHub F1kkk/DungeonJack), itch

**STAR**
- **Situation:** Tactical card game, Blackjack twist, no gambling. Player = Jack climbing a tower via 1v1 duels. Number total decides attack order, not damage → focus on risk-taking over stats.
- **Task:** Implement Blackjack system as foundation, build 3D card movement, integrate round results into player/enemy health.
- **Action:** Designed full Blackjack flow first (draw, hit/stand, total, bust, winner). Studied + used Unity Splines for curved card motion. Split into card, combat, animation, state modules. State pattern coordinates turns/attacks/health.
- **Result:** Smooth final loop, consistent with design. Blackjack drives the whole battle flow. Splines improved card positions; card-combat integration makes decisions feel impactful.
- **Metrics:** Role = Programmer · Tech = Unity Splines · State Pattern · Engine = Unity

---

## 04 · Click And Shield  ⭐ 1st Place
- **Type/Year/Engine/Duration:** game · 2024 · Unity Engine · 2 weeks
- **Role:** Team Lead & Lead Programmer
- **Dek:** Cybersecurity mini-game compilation, built in two weeks for a national competition. Took 1st place at Universitas Brawijaya.
- **Tags:** unity, state-pattern, mini-games, competition
- **Links:** source (GitHub Click-And-Shield), itch
- **Press:** 1st Place — 4C National Competition 2024 (Brawijaya)

**STAR**
- **Situation:** 4C National Competition, 14-day deadline. Cybersecurity theme inspired by Dumb Ways to Die, mini-game compilation with cutscenes. Risk = many mini-game logics coexisting cleanly in one runtime.
- **Task:** Team Lead + Lead Programmer. Architecture for fast mini-game integration, smooth level/cutscene transitions, coordinate team to hit 14 days.
- **Action:** State Pattern backbone — each mini-game/cutscene an independent module. Auto transition system with validated state hand-off. FSM contract per mini-game for parallel work. Daily coordination.
- **Result:** 1st place, Game Development category. Stable build under tight schedule. Judges praised educational quality + fun factor.
- **Metrics:** Award = 1st Place · Event = 4C National 2024 · Duration = 2 weeks

---

## 05 · Samsul Recycle  🥉 2nd Runner-Up
- **Type/Year/Engine/Duration:** jam · 2024 · Unity · 48 hours
- **Role:** Programmer
- **Dek:** 48-hour jam project about an intern collecting + recycling waste. First jam placed in, the one that made gamedev serious.
- **Tags:** unity, jam, scriptable-objects, scene-management
- **Links:** source (GitHub Samsul-Recycle), itch
- **Press:** 2nd Runner-Up — COMPFEST 16 IGI Game Jam

**STAR**
- **Situation:** 48-hour COMPFEST 16 IGI Jam at UI. 2-person team. First serious jam — real pressure to ship something stable + interesting.
- **Task:** Own main game logic — level flow + simple crafting system driving recycling theme.
- **Action:** Crafting built on ScriptableObjects → item/recipe data as assets, not hard-coded. New content = editor task, not code. Scene-management layer kept levels + crafting decoupled. Time-boxed scope every few hours.
- **Result:** 2nd Runner-Up at COMPFEST 16. First gamedev award; turned hobby into serious career direction. Taught value of data-driven content pipelines under time pressure.
- **Metrics:** Award = 2nd Runner-Up · Event = COMPFEST 16 IGI Jam · Duration = 48 hours

---

## About slide (shared)
- **Title:** Game Developer & Software Engineer
- **Summary:** Final-year Game Technology student. Ships games + the systems that ship them — Unity, .NET, React, Astro. Awards across national jams; production work at HAGE Games.
- **Highlights:** 1st Place 4C National 2024 (Click And Shield) · 2nd Runner-Up COMPFEST 16 (Samsul Recycle) · Live product ownership (hagegames.com) · Architecture-first jams (Service Locator, Event Bus, FSM)
- **Stack:** Unity, C#, Godot, .NET, React, TypeScript, Astro, Tailwind, Docker, AWS
