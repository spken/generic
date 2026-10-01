import Image from "next/image"
import { BookLink } from "@/components/site/book-link"
import { OpenStatus, StatusStamp } from "@/components/site/open-status"
import { WeekGrid } from "@/components/site/week-grid"
import { shop, type Service } from "@/content/shop"
import { WEEKDAYS } from "@/lib/hours"

const cheapest = Math.min(
  ...shop.services.filter((s: Service) => s.price > 0 && !s.addOn).map((s) => s.price)
)
const faces = shop.team.flatMap((m) => ("photo" in m && m.photo ? [{ name: m.name, photo: m.photo as string }] : []))
const daysOpen = WEEKDAYS.filter((d) => shop.hours[d]).length

const money = new Intl.NumberFormat(shop.locale, {
  style: "currency",
  currency: shop.currency,
  maximumFractionDigits: 0,
})

export function Hero() {
  return (
    <section
      id="week"
      aria-labelledby="week-title"
      className="relative flex flex-col lg:min-h-[calc(100svh-4rem)]"
    >
      <div className="mx-auto grid w-full max-w-[90rem] gap-x-16 gap-y-12 px-(--gutter) pt-10 pb-20 sm:pt-14 lg:my-auto lg:grid-cols-12 lg:py-12">
        <div className="flex flex-col lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-rule pb-3 text-[0.875rem] text-ink-soft">
            <OpenStatus className="text-ink" />
            <span>
              {shop.contact.street}, {shop.contact.city}
            </span>
          </div>

          <h1 id="week-title" className="type-ledger mt-8 text-[clamp(3.25rem,9vw,5.5rem)] text-ink sm:mt-12">
            {shop.name}
          </h1>

          <p className="mt-6 max-w-[52ch] text-[1.125rem] leading-relaxed text-ink-soft sm:text-[1.1875rem]">{shop.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <BookLink size="stamp-lg" />
            <a
              href="#services"
              className="type-header inline-flex h-14 items-center text-[0.8125rem] sm:px-3 text-ink underline decoration-ink/30 decoration-1 underline-offset-[0.4em] transition-colors hover:text-stamp hover:decoration-stamp sm:h-16"
            >
              Services and prices
            </a>
          </div>

          <dl className="mt-auto grid grid-cols-3 border-t border-rule-strong pt-0 text-[0.875rem] max-lg:mt-12 lg:mt-16">
            <div className="flex h-[calc(var(--line)*2)] flex-col justify-center border-r border-rule pr-3">
              <dt className="text-ink-soft">Services from</dt>
              <dd className="type-figure font-semibold text-ink">{money.format(cheapest)}</dd>
            </div>
            <div className="flex h-[calc(var(--line)*2)] flex-col justify-center border-r border-rule px-3">
              <dt className="text-ink-soft">In the book</dt>
              <dd className="flex items-center gap-2 font-semibold text-ink">
                {faces.length ? (
                  <span aria-hidden className="hidden -space-x-1.5 sm:flex">
                    {faces.map((f) => (
                      <span key={f.name} className="relative size-6 overflow-hidden rounded-[3px] ring-2 ring-paper">
                        <Image src={f.photo} alt="" fill sizes="24px" className="object-cover object-top" />
                      </span>
                    ))}
                  </span>
                ) : null}
                {shop.team.length} people
              </dd>
            </div>
            <div className="flex h-[calc(var(--line)*2)] flex-col justify-center pl-3">
              <dt className="text-ink-soft">Open</dt>
              <dd className="font-semibold text-ink">{daysOpen} days a week</dd>
            </div>
          </dl>
        </div>

        <div className="relative lg:col-span-5 lg:pt-2">
          <div className="mb-4 flex min-h-[4.25rem] items-end justify-between gap-4">
            <p className="type-ledger text-[1.75rem] text-ink">This week</p>
            <StatusStamp className="origin-bottom-right" />
          </div>
          <WeekGrid />
        </div>
      </div>

      <a
        href="#services"
        className="group mx-auto hidden flex-col items-center gap-2.5 pb-6 text-ink transition-colors hover:text-stamp lg:flex"
      >
        <span className="type-header text-[0.75rem]">Scroll to services</span>
        <span aria-hidden className="relative h-12 w-px overflow-hidden bg-rule-strong">
          <span className="scroll-cue absolute inset-x-0 top-0 h-5 bg-ink transition-colors group-hover:bg-stamp" />
        </span>
      </a>
    </section>
  )
}
