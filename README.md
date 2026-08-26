# Kinetic — Modern Digital Agency Website

A single-page site for a fictional brand and product studio. Bold, dark and
deliberately not corporate-safe: oversized display type, a single electric-lime
accent, and colour used sparingly enough that it lands when it appears.

> **Live demo:** _add the deployment URL here_

## Why Vue

This is the Vue project in my portfolio. The rest of the batch is React, Next
and vanilla, so this one uses **Vue 3 with the Composition API and `<script
setup>`** to show the same standard of work in a second framework — scoped
single-file components, composables for shared behaviour, and Vue's built-in
`<Transition>` rather than an animation library.

## Features

**Hero**
- Full-viewport headline at `clamp(3rem, 12vw, 9.5rem)`, revealing line by line
  on load.
- Drifting gradient bloom behind the type, animated on a 26-second loop.
- Four studio statistics on a hairline rule.

**Custom cursor**
- A follower ring easing toward the pointer at 0.18 per frame, so it lags
  slightly behind the real cursor.
- Grows and fills over anything marked `data-cursor-grow` — links, cards,
  buttons.
- Opts out entirely on coarse pointers and under `prefers-reduced-motion`,
  rather than rendering a useless element.

**Work**
- Six case studies in a staggered two-column grid, offset so it reads as a
  magazine spread rather than a table.
- Images are greyscale at rest and resolve to colour on hover while scaling.
- **Hover reveal**: a gradient panel slides up with the project's story and
  the services delivered.
- Each card carries the number the client actually cared about — `3.1×` inbound
  leads, `-62%` support tickets, `19hr` to sell out.

**Services** — four expanding rows that shift right on hover, with deliverable
chips that pick up the accent colour.

**Process** — four phases from brief to handover.

**Studio** — six team members with greyscale portraits that resolve on hover.

**Contact**
- Working form with per-field validation: name required, email pattern-checked,
  brief with a minimum length.
- Budget selection as chips rather than a dropdown.
- Submitting swaps the form for a confirmation, with a way back.

**Also** — a seamless client marquee with an edge mask, a header that goes
translucent-blurred on scroll, and a full-screen mobile menu with staggered
links.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Vue 3.5 (Composition API, `<script setup>`) |
| Build | Vite 6 |
| Language | TypeScript (strict, `vue-tsc` in the build) |
| Styling | Scoped CSS with custom-property tokens |
| Fonts | Space Grotesk (display) + Inter |

No CSS framework and no animation library. Scroll reveals come from a
`useReveal` composable wrapping `IntersectionObserver`; the cursor comes from a
`usePointer` composable easing on `requestAnimationFrame`; everything else is
CSS transitions and keyframes. The whole bundle is 92 kB (36 kB gzipped).

## Design

Near-black (`#08090a`) canvas, off-white text, and electric lime (`#d4ff3f`) as
the only accent — used for the brand dot, active states, metric badges and
nothing else. Agency sites should feel confident, so the type is oversized and
tightly tracked, rules are hairlines, and corners are near-square (4px) rather
than rounded.

## Accessibility

`prefers-reduced-motion` disables the hero drift, the marquee, the reveal
transitions and the custom cursor. The cursor is `aria-hidden` and
`pointer-events: none`. The mobile menu locks body scroll and reports its state
through `aria-expanded`. Focus is visible throughout in the accent colour.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build && npm run preview   # type-check + production build
```

## Project Structure

```
index.html
src/
  main.ts                  entry point
  App.vue                  every page section, with scoped styles
  assets/base.css          tokens, resets, shared button and eyebrow styles
  components/
    SiteHeader.vue         scroll-aware header and mobile sheet
    CursorFollower.vue     custom cursor
    RevealBlock.vue        scroll-reveal wrapper
  composables/
    useReveal.ts           useReveal + usePointer
  data/studio.ts           services, case studies, team, process, clients
```

## Content

Six case studies with named clients, sectors, services and outcome metrics; six
team members with real bios; four services with deliverables; a four-phase
process. All written for this fictional studio — no lorem ipsum.
