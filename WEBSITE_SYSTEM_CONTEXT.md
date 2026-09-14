# WEBSITE_SYSTEM_CONTEXT.md

Source of truth for the reusable CA website system. Read this before
building a new design, onboarding a prospect, or changing architecture.

## 1. Project purpose

One codebase produces many personalized CA preview websites for outbound
outreach. Each prospect gets a complete, sendable preview configured from
data — not rebuilt by hand. The website itself does most of the selling:
a prospect should think "this looks more professional than my current
website" without needing an explanation.

## 2. Existing designs (references, not templates)

| Branch | Concept | Language |
|---|---|---|
| `main` | Editorial portfolio | Large serif display, mono labels, ledger texture, scroll fade-and-rise, pill CTAs |
| `alt-portfolio` | Editorial portfolio, law-firm theme | Same structural DNA as `main` (copy/photo hero, centered containers, pill CTAs, staggered reveals) |
| `design-2` | **Quiet luxury ("Atelier")** | Modern grotesk type, layered asymmetric composition, contour-line signature, burgundy accent, varied shape language |

`main` and `alt-portfolio` are **structurally one design direction** with two
themes — not two independent templates. `design-2` is the genuinely
different second template. Grayscale test: with color removed, layout,
typography, and composition must still read as three different designers.

## 3. Design 2 concept

Premium modern professional: confident, elegant, human, expensive — never
flashy. A layered single-page narrative answering who Jane is, why she is
trusted, what she does, why she differs, her proof, relevance, process,
and contact. The page itself is the canvas: whitespace, dividers, image
composition, and alignment carry information instead of boxes.

Section order: hero (layered asymmetric) → trust (statement strip) →
expertise (interactive index) → why (stone wash, personal) → estimator
(regime calculator) → approach (4 steps) → experience (dark chapter) →
industries (open groups) → testimonials (rotating quotes) → faq
(accordion plus process) → contact (dark finale) → colophon footer.

## 4. Design philosophy

- One memorable element per viewport; everything around it stays quiet.
- Copy is design content: plain sentences, sentence case, one CTA label
  ("Start a conversation") used everywhere for contact intent.
- Fictional placeholder content (`Jane Doe`) ships in the repo. Never
  commit a real person's identity, photo, or phone number as template data.
- Skills used: `design-dna` (pattern avoidance), `frontend-design`
  (direction and restraint), `design-taste-frontend` (anti-slop dials:
  variance 6, motion 3, density 3), `accessibility` and `seo` (audits).

## 5. Typography system

- Display: Outfit (600/700, tight tracking). Body: Inter. No serif, no
  mono anywhere. Emphasis uses the same family's weight, never a mixed face.
- Compact hierarchy through scale, weight, spacing, and alignment — not
  enormous headings. Hero ≤68px and max two lines; subtext ≤20 words.
- Kickers are sentence case with a burgundy tick, max 3 per page. No
  tracked-out uppercase eyebrow above every heading. No middot-joined meta
  strings. No em-dashes.

## 6. Layout system

- 1200px canvas, left-aligned asymmetric grids. Sections are compositions,
  not containers: hairline dividers, open groupings, layered overlaps
  (floating credential note, oversized backdrop word, sticky process card).
- Rhythm: ivory → stone wash → ivory → dark chapter → ivory → stone →
  ivory → dark finale. One theme family, deliberate chapters, never random
  alternation.
- Each section uses a different layout family; no zigzag repetition, no
  card grids, no bento filler.
- Mobile is designed per section: single column, arch portrait first,
  sticky elements unstick, targets ≥44px, no horizontal overflow.

## 7. Color system

- Ivory `#FAF6EF`, canvas `#FFFDF8`, stone `#EFE8D8`, charcoal `#22272E`,
  ink-night `#20201E`. One locked burgundy accent `#713F46` (deep `#572F35`), soft taupe `#B9B0A3` support, warm white `#FCFAF7` surfaces.
- Accent lock: the same burgundy on every CTA, tick, index, and hover state.
  No purple/blue SaaS tones, no neon, no gradients-as-decoration.

## 8. Shape language (locked rule)

- Pills for buttons and chips, 14px comfort radius for form fields, arch
  crop for the hero portrait, circular icon buttons, sharp everywhere else.
- Cards exist only with a reason (floating credential, process panel,
  contact form). Borders are hairlines; shadows only under floating layers.

## 9. Motion and interaction language

- Text never animates in: headings and body render instantly with the
  layout. No rise-from-bottom, no fades on copy. Ever.
- Signature entrances are image-only: the hero portrait opens via
  clip-path, fired once by IntersectionObserver.
- Lenis smooth scroll (disabled under `prefers-reduced-motion`, with
  native anchor fallback). Film grain overlay, burgundy hero glow, contour-line atmosphere (hero, dark chapters, edges).
- Count-up tabular numerals on trust and proof figures; tweened readout
  numerals in the estimator.
- Magnetic pull on primary CTAs (fine pointers only). Auto-rotating
  testimonial stage with progress dots (pauses on hover/focus, static
  under reduced motion). Active-section highlight in desktop nav.
- Hover micro-interactions: underline growth, arrow slide, title shift,
  circular CTA fill. Sticky header gains blur and hairline on scroll.
- One orchestrated moment per viewport, never animation on everything.
  `prefers-reduced-motion` renders everything instantly. No opacity
  fade-and-rise as a pattern.

## 10. Scroll philosophy

- No scroll hijacking, no pinning, no marquees, no parallax. The scroll
  experience is editorial calm: content arrives composed, motion answers
  position rather than performing.
- `scroll-craft` was evaluated and deliberately not applied: restraint
  sells this audience better than choreography.

## 10b. Texture system

- Design 2 uses the wireframe ledger grid referred from `main`: a fine
  34px ink grid at ~5% opacity, edge-masked so it reads as atmosphere
  rather than wallpaper, with a pale variant for the dark chapters.
- Applied selectively via the `.wireframe-texture` utility (hero,
  experience, contact). Pure `::before` background treatment — it cannot
  disturb layout.

## 11. Component system

`src/components/design2/`: SiteHeader, Hero, Trust, Expertise, WhyJane,
Estimator, Approach, Experience, Industries, Testimonials, FaqProcess,
ContactCta, SiteFooter, Icon (single-stroke family: check, arrow, calc,
shield, phone, mail, pin, quote, spark, clock, doc). All take typed props from `src/lib/design2/types.ts` and render
`website.json` data. Shared primitives live in `src/styles/global.css`
(`.kicker`, `.sec-title`, `.lede`, `.btn`, `.text-link`, `.mask`,
`.clip-reveal`, `.acc-*`, `.field`, `ContourField`.

## 12. Client configuration

```text
clients/
└── <client-id>/
    ├── record.json
    ├── website.json
    ├── assets/
    ├── custom/
    └── versions/{v1,v2,…}/
```

`src/pages/index.astro` imports one client's `website.json` and renders its
`sections` array through a switch registry — reorder/hide sections by
editing config. Publish-ready images live in
`public/clients/<client-id>/` and are referenced by URL string so configs
stay portable.

## 13. `record.json` vs `website.json`

- `record.json` = CRM history: clientId, category, location, source,
  outreachStatus, selectedDesign, followUps, notes. Answers **WHAT
  happened** with this prospect.
- `website.json` = the site itself: design, templateVersion, theme,
  business, sections, content, assets. Answers **HOW their preview looked**.
- A version snapshot (`versions/vN/` with both files) must reproduce the
  exact sent preview months later. Snapshot before every outreach.

## 14. Section configuration

`sections` entries map 1:1 to registry cases in `index.astro`. Unknown ids
render `null` (safe). Drop `testimonials` for clients with no quotes,
`faq` process included. Components must handle empty arrays gracefully —
never present placeholder text as verified fact.

## 15. Custom components

Common 80–90% is JSON-driven. True one-offs go in
`clients/<id>/custom/` and are imported explicitly in `index.astro` —
never widen the shared schema for one prospect. An `.example` stub ships
per client folder.

## 16. Versioning

Git branches = design-system history (`main`, `alt-portfolio`, `design-2`,
`feature/*`, `design-3`). Client preview history = `versions/`.
**Never create a branch per prospect.**

## 17. How to add a new client

1. Copy `clients/jane-doe/` → `clients/<new-id>/` (incl. `versions/v1/`).
2. Fill `record.json` + `website.json`; add files to `assets/`, publish
   images to `public/clients/<new-id>/`, update asset paths.
3. Point `index.astro` at the new config, run the build, review.
4. Snapshot the sent preview into `versions/vN/` and update `record.json`.

## 18. How to create another design

New branch (`design-3`), concept first (typography, layout, motion,
components, IA — in that order), new `src/components/design3/` + types +
`website.json` `design` value. Shared: `clients/` shape, registry pattern,
versioning rules. Never restyle `design-2` components in place to fake a
new template.

## 19. Git conventions

- `main`, `alt-portfolio`: do not modify except shared infrastructure.
- Design work happens on `design-N` / `feature/*` branches.
- No `check` script in this repo; verify with `npm run build` and
  `npx astro check`.

## 20. Important decisions

- Placeholder identity (`Jane Doe`, clearly-marked fictional figures,
  labeled placeholder testimonials) is the committed default.
- Global-first: the template ships as a London boutique (`GBP`,
  `en-GB`) but the schema carries `title`, `designation`, `location`,
  and `currency` so the same design becomes e.g. John Carter, CPA, New
  York, USD. The estimator reads `currency`, `locale`, `allowance`, and
  progressive `bands` from config — no hardcoded tax system.
- The contact form degrades to `mailto:` — no backend, no storage, no API.
- Fonts load from Google Fonts with system fallbacks; portrait ships as a
  local SVG placeholder (TODO slots marked for real photography).
- One CTA label per intent: every contact action reads
  "Start a conversation".

## 21. Things future developers must NOT do

- Do not reintroduce generic fade-and-rise scroll reveals, serif or mono
  type, middot-joined meta strings, per-section uppercase eyebrows, or
  card grids here.
- Do not invent clients, awards, statistics, or testimonials for real
  prospects. Structure empty states; fill only with verified facts.
- Design for an international audience by default. No country-specific
  currencies, regulators, tax codes, addresses, or visual conventions in
  the template unless a real client supplies them. The Jane Doe
  placeholder is a London boutique practice with clearly fictional data.
- Do not hardcode prospect-specific copy inside `design2/` components.
- Do not build a CMS, auth, database, or API layer. Stay lightweight.
- Do not create per-client branches. Use `versions/`.
- Do not add purple/blue SaaS accents, neon, glassmorphism, or marquee
  loops. The accent lock and restraint are the identity.
