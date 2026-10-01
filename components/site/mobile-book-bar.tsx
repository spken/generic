"use client"

import { useEffect, useState } from "react"
import { BookLink } from "@/components/site/book-link"
import { OpenStatus } from "@/components/site/open-status"
import { cn } from "@/lib/utils"

/** Phone-only booking bar: appears once the hero's own Book button has scrolled away. */
export function MobileBookBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("week")
    const visit = document.getElementById("visit")
    if (!hero) return
    let heroOut = false
    let visitIn = false
    const update = () => setVisible(heroOut && !visitIn)
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroOut = !entry.isIntersecting
        if (entry.target === visit) visitIn = entry.isIntersecting
      }
      update()
    })
    observer.observe(hero)
    if (visit) observer.observe(visit)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-rule-strong bg-paper/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-(--ease-ink) sm:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      inert={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <OpenStatus className="min-w-0 text-[0.8125rem] leading-tight text-ink [&>span:last-child]:line-clamp-2" />
        <BookLink className="shrink-0">Book</BookLink>
      </div>
    </div>
  )
}
