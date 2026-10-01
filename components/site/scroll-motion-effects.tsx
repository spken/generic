"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// The page's own ink curve (--ease-ink) as a GSAP ease.
const INK = "expo.out"

/** Inset that keeps the studio print inside the page column: max(gutter, centring margin + gutter). */
function columnInset() {
  const vw = document.documentElement.clientWidth
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const gutter = Math.min(Math.max(rem, vw * 0.04), 3 * rem)
  return Math.max(gutter, (vw - 90 * rem) / 2 + gutter)
}

/**
 * Every scroll gesture on the page, in one place. Grammar: ink is laid down,
 * prints are slid onto the page. All markup is in its final state until this
 * runs; with reduced motion it never runs.
 */
export default function ScrollMotionEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Studio plate: the print is pressed flat to the page edges, the photo drifting inside it.
      const plate = document.querySelector<HTMLElement>('[data-motion="plate"]')
      if (plate) {
        gsap.fromTo(
          plate,
          { clipPath: () => `inset(0px ${columnInset()}px 0px ${columnInset()}px round 4px)` },
          {
            clipPath: "inset(0px 0px 0px 0px round 0px)",
            ease: "none",
            scrollTrigger: { trigger: plate, start: "top bottom", end: "top 30%", scrub: 0.6, invalidateOnRefresh: true },
          }
        )
        const img = plate.querySelector('[data-motion="plate-img"]')
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -5, scale: 1.12 },
            {
              yPercent: 5,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom top", scrub: true },
            }
          )
        }
      }

      // Services: each duration is inked in, one fifteen-minute square at a time.
      gsap.utils.toArray<HTMLElement>('[data-motion="cells"]').forEach((group) => {
        const cells = group.querySelectorAll('[data-motion="cell"]')
        if (!cells.length) return
        gsap.from(cells, {
          scaleX: 0,
          duration: 0.5,
          ease: INK,
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 90%", once: true },
        })
      })

      // Team: portraits develop from graphite into colour as they reach the middle of the screen.
      gsap.utils.toArray<HTMLElement>('[data-motion="portrait"]').forEach((portrait) => {
        gsap.fromTo(
          portrait,
          { filter: "grayscale(1) contrast(1.08)" },
          {
            filter: "grayscale(0.15) contrast(1)",
            ease: "none",
            scrollTrigger: { trigger: portrait, start: "top 85%", end: "center 55%", scrub: 0.6 },
          }
        )
      })

      // Gallery: prints slide up from under the page edge; prints entering together arrive a beat apart.
      const prints = gsap.utils.toArray<HTMLElement>('[data-motion="print"]')
      gsap.set(prints, { clipPath: "inset(30% 0% 0% 0%)" })
      gsap.set('[data-motion="print-img"]', { scale: 1.12 })
      ScrollTrigger.batch(prints, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: INK, stagger: 0.12 })
          gsap.to(
            batch.map((el) => el.querySelector('[data-motion="print-img"]')),
            { scale: 1, duration: 1.4, ease: INK, stagger: 0.12 }
          )
        },
      })

      // Visit: the appointment card is handed across the counter.
      const card = document.querySelector('[data-motion="card"]')
      if (card) {
        gsap.fromTo(
          card,
          { xPercent: 6, yPercent: 14, rotate: -7 },
          {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "top 45%", scrub: 0.6 },
          }
        )
      }
    })

    return () => mm.revert()
  })

  return null
}
