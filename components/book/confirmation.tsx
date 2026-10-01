"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight, CalendarPlus } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { shop } from "@/content/shop"
import { BookingSummary } from "@/components/book/booking-summary"
import type { Booking } from "@/components/book/booking-flow"
import { formatDay, team } from "@/lib/availability"
import { formatTime } from "@/lib/hours"
import { appointmentIcs } from "@/lib/ics"
import { cn } from "@/lib/utils"

const address = `${shop.contact.street}, ${shop.contact.postcode} ${shop.contact.city}`
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name}, ${address}`)}`

export function Confirmation({ booking }: { booking: Booking }) {
  const { day, time, service, duration, details, reference } = booking
  const person = team.find((m) => m.id === booking.assigned)
  const first = details.name.trim().split(/\s+/)[0]

  function downloadIcs() {
    if (!day || time === null || !service) return
    const ics = appointmentIcs({
      uid: `${reference}@${shop.shortName.toLowerCase()}`,
      iso: day.iso,
      start: time,
      duration,
      title: `${service.name} at ${shop.name}`,
      description: `Booking ${reference}${person ? ` with ${person.name}` : ""}. Change or cancel free up to 24 hours before.`,
    })
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }))
    const a = document.createElement("a")
    a.href = url
    a.download = `${shop.shortName.toLowerCase()}-${day.iso}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div
          aria-hidden
          className="type-ledger inline-block -rotate-3 rounded-[6px] border-2 border-stamp px-3 pt-2 pb-1.5 text-center text-[1.75rem] leading-none tracking-[-0.01em] text-stamp uppercase motion-safe:animate-[stamp-in_700ms_var(--ease-stamp)_both]"
        >
          <span className="block">Booked</span>
          <span className="type-header type-figure mt-1.5 block text-[0.6875rem] tracking-[0.14em]">{reference}</span>
        </div>

        <p className="type-ledger mt-10 text-[clamp(2.5rem,6vw,4.25rem)] text-ink" aria-live="polite">
          You&rsquo;re in the book, {first}.
        </p>
        <p className="mt-5 max-w-[50ch] text-[1.125rem] leading-relaxed text-ink-soft">
          {day && time !== null ? (
            <>
              See you{" "}
              <strong className="font-semibold text-ink">
                {day.offset < 2 ? formatDay(day).toLowerCase() : `on ${formatDay(day)}`}
              </strong>{" "}
              at <strong className="font-semibold text-ink tabular-nums">{formatTime(time)}</strong>
              {person ? <> with {person.name.split(" ")[0]}</> : null}. A confirmation is on its way to{" "}
              <span className="font-medium text-ink">{details.email}</span>
              {details.smsReminder ? " and we’ll text you a reminder the day before" : ""}.
            </>
          ) : null}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <button type="button" onClick={downloadIcs} className={cn(buttonVariants({ variant: "stamp", size: "stamp-lg" }))}>
            <CalendarPlus className="size-5" strokeWidth={2} aria-hidden />
            Add to calendar
          </button>
          <a href={mapsHref} target="_blank" rel="noopener" className={cn(buttonVariants({ variant: "ledger", size: "stamp" }), "h-14 sm:h-16")}>
            Directions
            <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <dl className="mt-12 grid gap-6 border-t border-rule-strong pt-8 sm:grid-cols-2">
          <div>
            <dt className="type-header text-[0.6875rem] text-ink-soft">Where</dt>
            <dd className="mt-2 text-[1.0625rem] font-semibold text-ink">
              {shop.contact.street}, {shop.contact.city}
              <span className="mt-1 block text-[0.9375rem] font-normal text-ink-soft">{shop.contact.directions}</span>
            </dd>
          </div>
          <div>
            <dt className="type-header text-[0.6875rem] text-ink-soft">Need to change it?</dt>
            <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              Use the link in your confirmation email, or call{" "}
              <a className="type-figure font-medium text-ink underline decoration-ink/30" href={`tel:${shop.contact.phone.replace(/\s/g, "")}`}>
                {shop.contact.phone}
              </a>
              . Free up to 24 hours before.
            </dd>
          </div>
        </dl>

        <Link
          href="/"
          className="type-header mt-10 inline-flex items-center gap-2 text-[0.75rem] text-ink underline decoration-ink/30 underline-offset-[0.4em] hover:text-stamp hover:decoration-stamp"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2.25} aria-hidden />
          Back to {shop.name}
        </Link>

        <p className="mt-10 max-w-[56ch] rounded-[4px] border border-dashed border-rule-strong px-4 py-3 text-[0.875rem] leading-relaxed text-ink-meta">
          Sample booking flow: no appointment was made and no message was sent. Connect the shop&rsquo;s booking
          system before launch.
        </p>
      </div>

      <aside aria-label="Booking details" className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
        <BookingSummary selection={booking} />
      </aside>
    </div>
  )
}
