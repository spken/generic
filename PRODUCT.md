# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + Tailwind CSS + shadcn/ui, components added via `npx shadcn@latest add <component>`. Confirmed by the user.

## Users

Clients of a local, appointment-based personal-care business (barber shop, nail salon, and similar studios). They arrive from a map listing, social profile, or word of mouth, usually on a phone, wanting to know what the shop offers, what it costs, who does the work, where it is, and how to book.

The page is re-skinned and re-filled per shop, so the second audience is whoever configures it for a new business.

## Product Purpose

A reusable, brand-agnostic landing page template for appointment-based personal-care businesses. Every instance funnels to one action: **book an appointment** (a link out to, or embed of, the shop's booking system). Success is a client who, within seconds, trusts the shop's craft and taps Book.

## Positioning

Deliberately generic: it must fit a barber shop and a nail salon equally well without edits to structure, only to content and theme tokens. No trade-specific imagery, vocabulary, or ornament baked into the layout.

## Capabilities and Constraints

- Primary action: Book an appointment (external booking URL, configurable).
- Content per shop: name, services with durations and prices, team members, gallery of work, opening hours, address, contact.
- All shop content lives in one config/content file; brand color and type are token-driven.
- Placeholder content must stay category-neutral (no scissors, nail polish, razors, etc. in layout chrome).
- Undecided: specific booking provider integration, CMS, multi-language.

## Evidence on Hand

None. No real shop, photos, reviews, prices, or team exist yet. All demonstration content is placeholder and must be labeled or obviously replaceable; do not invent real review counts, awards, or press.

## Product Principles

1. One action: every section ends one tap away from booking.
2. Neutral by construction: structure and chrome never assume a trade; content and tokens carry identity.
3. Phone first: the typical visitor is on a phone between other things.
4. Craft signals trust: the page's own finish stands in for the shop's standard of work.
5. Easy to re-skin: a new shop is a content file and a token change, not a redesign.
