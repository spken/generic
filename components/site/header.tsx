"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BookLink } from "@/components/site/book-link"
import { shop } from "@/content/shop"
import { cn } from "@/lib/utils"
import { SECTIONS } from "@/lib/sections"
import { useShopNow } from "@/components/site/use-shop-now"

function useActiveSection() {
  const [active, setActive] = useState<string>("week")
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const el of els) observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return active
}

function TodayDate() {
  const now = useShopNow()
  if (!now) return <span className="w-[5.75rem] sm:w-[7.5rem]" />
  const label = new Intl.DateTimeFormat(shop.locale, {
    timeZone: shop.timeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date())
  return (
    <time className="type-figure w-[5.75rem] text-right text-[0.75rem] whitespace-nowrap text-ink-soft sm:w-[7.5rem] sm:text-[0.8125rem]">
      {label}
    </time>
  )
}

export function Header() {
  const active = useActiveSection()

  return (
    <header className="sticky top-0 z-40 border-b border-rule-strong bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto flex h-16 max-w-[90rem] items-stretch gap-6 px-(--gutter)">
        <a
          href="#week"
          className="type-ledger flex items-center text-[1.375rem] leading-none text-ink transition-colors hover:text-stamp"
        >
          {shop.name}
        </a>

        <nav aria-label="Sections" className="ml-6 hidden flex-1 items-stretch lg:flex">
          <ul className="flex items-stretch gap-0.5">
            {SECTIONS.map((section) => {
              const isActive = active === section.id
              return (
                <li key={section.id} className="flex">
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative flex items-center px-4 text-[0.9375rem] font-medium text-ink-soft transition-colors duration-300 ease-(--ease-ink) after:absolute after:inset-x-4 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-stamp after:transition-transform after:duration-300 after:ease-(--ease-ink) hover:text-ink",
                      isActive && "text-ink after:scale-x-100"
                    )}
                  >
                    {section.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-5 lg:ml-0">
          <TodayDate />
          <BookLink className="hidden sm:inline-flex" />
          <Sheet>
            <SheetTrigger
              className="type-header inline-flex h-11 items-center gap-2 rounded-[3px] border border-ink/80 px-3.5 text-[0.75rem] text-ink transition-colors hover:bg-paper-deep lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" strokeWidth={2.25} aria-hidden />
              <span className="hidden min-[400px]:inline">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-l border-rule-strong bg-paper p-0 sm:max-w-md">
              <SheetTitle className="type-ledger border-b border-rule px-6 pt-6 pb-5 text-3xl">
                {shop.name}
              </SheetTitle>
              <nav aria-label="Sections" className="flex-1 px-6">
                <ul className="divide-y divide-rule">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <SheetClose
                        render={<a href={`#${section.id}`} />}
                        nativeButton={false}
                        className={cn(
                          "type-ledger flex h-16 items-center text-[1.75rem] text-ink transition-colors hover:text-stamp",
                          active === section.id && "text-stamp"
                        )}
                      >
                        {section.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-rule p-6">
                <BookLink size="stamp-lg" className="w-full justify-between" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
