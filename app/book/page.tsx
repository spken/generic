import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Phone } from "lucide-react"
import { BookingFlow } from "@/components/book/booking-flow"
import { shop } from "@/content/shop"

export const metadata: Metadata = {
  title: `${shop.booking.label} | ${shop.name}`,
  description: `Choose a service, a person and a time at ${shop.name}. Takes under a minute.`,
}

export default function BookPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-rule-strong bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80">
        <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-(--gutter)">
          <Link href="/" className="group inline-flex items-center gap-2.5 text-ink transition-colors hover:text-stamp">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.25} aria-hidden />
            <span className="type-ledger text-[1.375rem] leading-none">{shop.name}</span>
          </Link>
          <a
            href={`tel:${shop.contact.phone.replace(/\s/g, "")}`}
            className="type-header inline-flex h-11 items-center gap-2 rounded-[3px] border border-ink/80 px-3.5 text-[0.75rem] text-ink transition-colors hover:bg-paper-deep"
          >
            <Phone className="size-4" strokeWidth={2.25} aria-hidden />
            <span className="max-sm:sr-only">Prefer to call?</span>
            <span className="type-figure normal-case max-md:hidden">{shop.contact.phone}</span>
          </a>
        </div>
      </header>
      <main>
        <Suspense fallback={<div className="min-h-[60svh]" />}>
          <BookingFlow />
        </Suspense>
      </main>
    </>
  )
}
