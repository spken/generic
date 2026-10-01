---
name: The Appointment Book
description: A brand-agnostic landing template for appointment-based personal-care shops, drawn as this week's page of the shop's appointment book.
colors:
  stamp: "#2f4775"
  stamp-ink: "#ffffff"
  stamp-deep: "#213458"
  stamp-wash: "#dde2ea"
  paper: "#f3f5f7"
  paper-deep: "#e6e9ee"
  ink: "#15171a"
  ink-soft: "#454a52"
  ink-meta: "#62686f"
  rule: "#e1e6ec"
  rule-strong: "#c9d2dc"
  hatch: "#d3d8de"
typography:
  display:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 9vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  lede:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  item:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 78"
  figure:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "-0.02em"
    fontFeature: "'tnum', 'lnum'"
rounded:
  cell: "1.5px"
  control: "3px"
  card: "4px"
  tab: "5px"
  stamp-mark: "6px"
spacing:
  line: "2rem"
  gutter: "clamp(1rem, 4vw, 3rem)"
  row: "1.25rem"
  block: "3.5rem"
  section: "5rem"
  section-lg: "8rem"
  page-max: "90rem"
components:
  button-stamp:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.stamp-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-stamp-hover:
    backgroundColor: "{colors.stamp-deep}"
    textColor: "{colors.stamp-ink}"
  button-stamp-lg:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.stamp-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 36px"
    height: "64px"
  button-ledger:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "44px"
  button-ledger-hover:
    backgroundColor: "{colors.stamp-wash}"
    textColor: "{colors.stamp-deep}"
  index-tab:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.tab}"
    padding: "0 16px"
    height: "40px"
  index-tab-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  service-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "20px 12px"
  service-row-hover:
    backgroundColor: "{colors.stamp-wash}"
  appointment-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px"
    width: "30rem"
---

# Design System: The Appointment Book

## Overview

**Creative North Star: "The Appointment Book"**

Every surface is a page of the shop's own appointment book: cool white ledger stock, graphite ink, pale blue ruling, and one rubber-stamp ink that belongs to the shop. Headings read like printed ledger headers, times and prices are set in tabular mono as if entered in the book, sections are reached through a plain, legible text nav, closed time is hatched in graphite, and the one action is a stamp you press. Nothing is decorative that a real ledger would not carry.

The system is a template, not a brand. Its identity lives in the materials (paper, ink, ruling, stamp), never in trade imagery, so any appointment-based personal-care shop can wear it. A new shop changes words, numbers and exactly two colour inputs in `content/shop.ts` (`theme.stamp`, `theme.stampInk`); every other stamp shade is derived from them.

Density is that of a working document kept tidy: few, light rules, tight label type, generous display type, flat paper. Motion is ink being laid down, never floating: rules draw themselves in as they scroll into view, the OPEN / CLOSED stamp presses onto the week, the Book button compresses and twists slightly under the thumb, and the "now" line on the week grid moves in real time. Scroll motion is scrubbed by position (CSS `animation-timeline: view()`), never timed: the studio print is pressed flat to the page edges, duration cells ink in square by square, portraits develop from graphite into colour, gallery prints slide up from under the page edge, and the appointment card is handed across the counter. Each section has its own gesture; no two share one.

**Key Characteristics:**
- Cool white ledger paper with pale blue ruling on a shared 2rem line.
- One saturated colour: the shop's stamp ink, carried by a single token.
- Inter Tight for headings and the lede, sentence case; Archivo for body and uppercase labels; mono only for figures.
- Near-square corners, few and light rules, flat pages; the one lifted object is the appointment card.
- Hatched graphite marks closed or unavailable time.
- Motion grammar: ink draws, stamps press.

## Colors

A graphite-on-cool-paper ledger with a single stamp ink; everything except the stamp is near-neutral with a faint blue-grey cast.

### Primary
- **Stamp Ink** (stamp): the shop's brand colour, supplied by `content/shop.ts`. Fills the Book buttons, today's column head on the week grid, the live now-line and pulse dot, filled duration cells, the OPEN stamp, text selection, caret and focus outline, and the full-bleed Visit section. The default (#2f4775) is a muted slate navy placeholder, not a brand: calm enough to fill a full-bleed section without glare. Shops should pick a similarly deep, desaturated ink rather than a bright primary.
- **Stamp Face** (stamp-ink): text and icons set on stamp fills. Supplied alongside `stamp`; must hold 4.5:1 against it.
- **Pressed Stamp** (stamp-deep): hover state for stamp fills and the stamp-coloured text on wash (today's hour figures, ledger-button hover). Derived: `color-mix(in oklab, var(--stamp), #000 24%)`; the frontmatter hex is the value for the default stamp.
- **Stamp Wash** (stamp-wash): the faint tint of today's open band on the week grid and of hovered service rows and ledger buttons. Derived: `color-mix(in oklab, var(--stamp), var(--paper) 87%)`.

### Neutral
- **Ledger Paper** (paper): the page, cards, sheet and sticky bars (translucent at 80-95% with backdrop blur).
- **Index Paper** (paper-deep): the small-print band, off-day cells, empty duration cells, portrait and gallery placeholders.
- **Graphite Ink** (ink): headings, primary text, and every structural rule (header underline, section heads, table borders, grid frame).
- **Soft Graphite** (ink-soft): body copy, descriptions, secondary labels.
- **Margin Note** (ink-meta): hour marks, counts, "Closed" and "Portrait" annotations, closed-state status dot.
- **Blue Ruling** (rule): the repeating ledger line (`.ruled`) and default borders.
- **Strong Ruling** (rule-strong): row dividers inside lists, column dividers inside grids, input borders, scrollbar thumb.
- **Graphite Hatch** (hatch): the -45deg 1px-in-7px hatching for closed or unavailable time.

### Named Rules
**The One Ink Rule.** The stamp is the only saturated colour on the page, and it enters through one token. Components reference `stamp`, `stamp-deep`, `stamp-wash` or `stamp-ink`; they never hardcode a brand hex, and they never introduce a second accent.

**The Cool Paper Rule.** Paper is cool white with a blue-grey cast. It is never cream, beige or warm off-white.

**The Hatched Time Rule.** Closed or unavailable time is drawn with graphite hatching, not greyed out with opacity. Hatching means "the book is shut here" wherever it appears: week grid, duration cells, team day strips, placeholder frames.

## Typography

**Display Font:** Inter Tight (with system-ui, sans-serif), sentence case, semibold
**Body Font:** Archivo (same family, normal width)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace), for figures only

**Character:** A calm, precise sans carries the headings: Inter Tight at semibold, sentence case, tightly tracked, so the shop name reads like a well-set brand rather than a printed ledger header. Archivo stays for body copy and for the small uppercase labels (buttons, column heads). Tabular mono is the handwriting of the book: every time, price, date and duration is entered in it.

### Hierarchy
- **Display** (Inter Tight 600, clamp(3.25rem, 9vw, 5.5rem), 1.0, -0.035em, sentence case): the shop name in the hero, the Visit heading, the footer wordmark.
- **Headline** (Inter Tight 600, clamp(2.75rem, 6vw, 4.75rem), 1.0, -0.035em, sentence case): section heads ("Services", "Who's in the book"). The small-print heading steps down to clamp(2.5rem, 4.5vw, 3.5rem).
- **Title** (Inter Tight 600, 1.375-1.75rem, 1.0, -0.035em, sentence case): "This week", team member names, Visit sub-heads, the header wordmark, the appointment card name.
- **Lede**: retired from the hero. The shop name is followed directly by the intro paragraph (1.125-1.1875rem body, ink-soft). `shop.promise` still feeds the page metadata.
- **Item** (600, 1.25-1.375rem, 1.25, -0.01em): service names, policy questions (1.125rem), the Visit address.
- **Body** (400, 1.0625rem, 1.625): intros and section notes, max 46-52ch. **Body-sm** (0.9375rem) for descriptions and team focus, max 58ch.
- **Label** (700, 0.6875-0.8125rem, width 78%, 0.06em, uppercase): buttons, weekday heads, category rules, card field labels.
- **Figure** (mono, tabular + lining numerals, -0.02em): times, prices (1.25rem semibold in the price column), durations, today's date, the open-status line.

### Named Rules
**The Two Voices Rule.** Inter Tight speaks for headings and the lede; Archivo for body and labels. Hierarchy comes from size and weight, not from uppercase, condensed widths or a third family. Do not add a serif or a script.

**The Figures-in-Mono Rule.** Any number a client reads to decide (time, price, duration, date) is set in the mono figure style. Prose never switches to mono except for these entries. Exception: the week grid's hour gutter and open/close times use Archivo tabular numerals, which read more calmly at that small size.

## Layout

A 12-column page, max 90rem, with a fluid gutter of clamp(1rem, 4vw, 3rem). Sections stack vertically at 5rem padding, 8rem from `lg`; section heads sit 3.5rem above their content (5rem at `lg`). Section heads split 7/5: headline left, a short note right-aligned at the baseline. The hero splits 7/5 with the week grid on the right; on phones every split stacks, the week grid falls below the hero copy, and a paper book bar slides up from the bottom once the hero's Book button leaves the viewport (hidden again when the Visit section is in view).

Lists are ruled rows, not cards: services, policies, hours and card fields are separated by light rules under a rule-strong list head. The team is a lightly bordered four-column table of the book (two at `sm`, one on phones). The gallery is a fixed contact-sheet rhythm on a 12-column grid with 16rem auto rows.

### Named Rules
**The One Grout Rule.** Every ruled surface shares the 2rem ledger line (`--line`). Row heights on ruled surfaces (card fields, week-grid hours) are multiples of it (1x, 1.5x, 2x), so ruling never drifts between components.

## Elevation & Depth

The book is flat. Depth comes from the paper / paper-deep tonal step and from generous space; rules are light (rule-strong for frames, rule within) and never ink-weight. Sticky chrome (header, mobile book bar) is paper at 80-95% opacity with a medium backdrop blur, separated by a rule-strong hairline, not a shadow.

### Shadow Vocabulary
- **Handed-over card** (`box-shadow: 0 2px 3px rgb(0 0 0 / 0.18), 0 28px 60px -18px rgb(0 0 0 / 0.55)`): only on the appointment card lying on the stamp-coloured Visit section, tilted -2.5deg. It is a physical object off the page, so it alone casts a shadow.
- **Now pulse** (`box-shadow` ring from 0 to 6px of stamp at 45% to 0% alpha, 2.4s): the live dot on the now-line and the open-status dot. State signal, not elevation.

### Named Rules
**The Flat Book Rule.** Pages, rows, tabs, grids and buttons never cast shadows. A shadow is reserved for an object that has left the book, and there is one.

## Shapes

Near-square. Controls, service rows and ledger buttons take a 3px corner; the appointment card 4px; the OPEN / CLOSED stamp mark 6px with a 2px border; duration cells 1.5px. Structural containers (team table, headers) are square-cornered with rule-strong borders; the week grid takes a 4px corner. The only full circles are status dots. Gallery placeholders carry print-proof registration corners (12px L-marks at 50% ink).

## Components

### Buttons
Rubber stamps: flat ink, pressed not lifted.
- **Shape:** near-square (3px).
- **Stamp (primary):** stamp fill, stamp-ink label in the label style on a flat fill (no texture), trailing up-right arrow. Standard 44px tall with 20px sides and 0.8125rem label; large 56px (64px from `sm`) with 28-36px sides. Used for every Book action (header, hero, mobile bar, sheet, appointment card).
- **Hover / Active:** fill deepens to stamp-deep over 300ms (ease-stamp); the arrow nudges up-right 2px. On press the button scales to 0.965 and rotates -0.8deg: the stamp coming down.
- **Focus:** 2px stamp outline at 3px offset (global).
- **Ledger (secondary):** transparent with an 80% ink border and ink label; hover takes the stamp border, stamp-wash fill and stamp-deep text. Per-person "Book with" buttons use the same outline but fill fully with stamp on hover.
- **Text link:** label style with a 1px ink/30 underline at 0.4em offset; hover turns text and underline stamp.

### Section Nav
- **Style:** plain text links in sentence case, 0.9375rem medium weight, ink-soft, 16px sides, filling the 64px header height, grouped left right after the wordmark (the date and Book button sit at the right edge). Legibility beats ornament here: no tabs, no uppercase label type.
- **Hover:** text darkens to ink.
- **Active:** ink text with a 2px stamp underline on the header edge that draws in from the left. Active follows the section in view.
- **Mobile:** a Menu control (ledger outline, 44px) opens a right sheet whose entries are title-style entries 64px tall, divided by light rules, with the Book stamp at the foot.

### Section Head
No rule: a headline with its short note directly beneath it (max 56ch, 1.0625-1.125rem ink-soft), set apart by section spacing alone. Every section uses this stacked order; notes never sit beside the heading. It opens every main section.

### Week Grid (signature)
A table framed in rule-strong with a 4px corner: a time gutter and seven day columns divided by light rules, each hour one ledger line tall. Open hours are plain paper bands with the opening time ("10:00") pinned to the band's top edge and the closing time to its bottom edge, in small Archivo tabular numerals (not mono), so the band reads as the span itself; outside hours and closed days are hatched (closed days carry a rotated "Closed" note). Today's column head is stamp-filled and its band is stamp-wash. A 2px stamp now-line with a pulsing dot crosses today in real time; a dashed stamp/50 line marks the same time across other open days. A tilted OPEN / CLOSED stamp mark presses onto the grid on load.

### Service Rows
Ruled rows: item-weight name with a body-sm description, duration drawn as 15-minute cells (stamp-filled, remaining cells plain paper-deep), a mono duration, a mono price, and a 44px outline arrow box. The whole row is the booking link; hover washes it stamp-wash, deepens the cells, and fills the arrow box with stamp.

### Status
An open-status line in mono with an 8px dot (stamp and pulsing when open, ink-meta when closed). The status stamp is a -3deg rotated ledger-type mark in a 2px border, flat (no grain), stamp when open and ink-soft when closed.

### Cards / Containers
- **Team columns:** square cells of a table bordered in rule-strong; name and role header row, a portrait (or ruled paper-deep monogram plate labelled "Portrait"), focus text, a seven-day strip (working days ink-filled, other open days paper-deep, closed days hatched), and a Book-with button.
- **Appointment card:** paper, 4px corners, 32px padding (24px on phones), 30rem max, tilted -2.5deg and easing to -1deg on hover over 700ms; a 3px ink rule under the name, blank ruled fields (Name, Date, Time, With) 1.5 lines tall, and a full-width large stamp button. The only shadowed element.
- **Gallery frames:** paper-deep placeholders with hatching at 60% and registration corners, captioned in a paper tab at the bottom-left with a mono index number.

### Studio Plate
A full-bleed print of the room directly below the hero (4:3 on phones, 16:9 at `sm`, min(80svh, 52rem) at `lg`). It opens clipped to the page column with 4px corners and is pressed flat to the viewport edges as it scrolls in, the photo drifting slowly inside it. A paper label (4px corners, no shadow) is pinned bottom-left: the caption in title style, address and directions under a rule-strong hairline, the Book stamp and an Open in maps link. On phones the label overlaps the print's bottom edge by 2.5rem. Omitted when `shop.studio.photo` is unset.

### Accordion (small print)
Ruled rows on the paper-deep band: item-weight questions that turn stamp on hover, answers in body at max 62ch, square corners.

## Do's and Don'ts

### Do:
- **Do** take every brand colour from `theme.stamp` and `theme.stampInk` and derive pressed and wash shades with `color-mix` in oklab.
- **Do** separate with space first and light rules second: 1px rule-strong for frames and list heads, 1px rule between rows. Ink-weight rules are not used for structure.
- **Do** keep ruled surfaces on the 2rem `--line` and size ruled rows in whole or half multiples of it.
- **Do** set times, prices, durations and dates in the mono figure style with tabular numerals.
- **Do** mark closed or unavailable time with graphite hatching.
- **Do** animate like ink: underlines draw from the left, stamps press (scale and slight rotation with ease-stamp), and every motion respects `prefers-reduced-motion`.
- **Do** ship bright, cool, unbranded sample photography from `public/sample/` (provenance in `PROVENANCE.md`), wired through `content/shop.ts`; with a photo removed, the labelled placeholder frame ("Portrait", numbered captions) returns.
- **Do** keep every scroll effect position-scrubbed, ending in the element's resting state, and inside `@supports (animation-timeline: view())` plus `prefers-reduced-motion: no-preference`.

### Don't:
- **Don't** return to the category default: a dark full-bleed interior photo, a serif shop name and a gold "Book Now".
- **Don't** use cream, beige or warm paper; the paper is cool white.
- **Don't** introduce a second saturated colour or hardcode a brand hex in a component.
- **Don't** put trade imagery (scissors, combs, polish, lashes) in chrome; the template must stay trade-neutral.
- **Don't** cast shadows from pages, rows, tabs or buttons; only the handed-over appointment card is lifted.
- **Don't** round controls beyond the near-square scale (1.5-6px); pills are reserved for status dots.
- **Don't** use floaty fades, opacity reveals or one shared rise-in on every section; scroll motion uses clip, scale, filter or rotation that names what the object is doing.
- **Don't** use dark, moody or logo-bearing stock photos; the anti-reference is the dark interior hero.
