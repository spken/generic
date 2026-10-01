import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { bookingHref } from "@/components/site/book-link"
import { SectionHead } from "@/components/site/section-head"
import { shop, type Service } from "@/content/shop"

const CELL = 15
const maxCells = Math.max(...shop.services.map((s) => Math.ceil(s.duration / CELL)))

const money = new Intl.NumberFormat(shop.locale, {
  style: "currency",
  currency: shop.currency,
  maximumFractionDigits: 0,
})

function formatPrice(service: Service) {
  if (service.price === 0) return "Free"
  return `${service.from ? "from " : ""}${money.format(service.price)}`
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

const groups = Array.from(
  shop.services.reduce((map, s) => {
    const list = map.get(s.category) ?? []
    list.push(s)
    map.set(s.category, list)
    return map
  }, new Map<string, Service[]>())
)

/** Duration drawn as 15-minute cells of the appointment book. */
function DurationCells({ minutes }: { minutes: number }) {
  const filled = Math.ceil(minutes / CELL)
  return (
    <span aria-hidden data-motion="cells" className="flex gap-[3px]">
      {Array.from({ length: maxCells }, (_, i) => (
        <span key={i} className="relative h-3.5 w-3 overflow-hidden rounded-[1.5px] bg-paper-deep sm:w-3.5">
          {i < filled ? (
            <span
              data-motion="cell"
              className="absolute inset-0 origin-left bg-stamp transition-colors duration-300 group-hover/row:bg-stamp-deep"
            />
          ) : null}
        </span>
      ))}
    </span>
  )
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-[90rem] px-(--gutter) py-20 lg:py-32"
    >
      <SectionHead id="services" title="Services">
        Every price is the price you pay. Each square is fifteen minutes in the chair, so you can see
        exactly how long you&rsquo;re booking.
      </SectionHead>

      <div className="mt-14 space-y-14 lg:mt-20">
        {groups.map(([category, services]) => (
          <div key={category}>
            <h3 className="type-header flex items-center justify-between border-b border-rule-strong pb-3 text-[0.8125rem] text-ink">
              <span>{category}</span>
              <span className="text-ink-meta">
                {services.length} {services.length === 1 ? "service" : "services"}
              </span>
            </h3>
            <ul>
              {services.map((service) => (
                <li key={service.id} className="border-b border-rule last:border-b-0">
                  <Link
                    href={bookingHref({ service: service.id })}
                    className="group/row -mx-3 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 rounded-[3px] px-3 py-5 transition-colors duration-300 hover:bg-stamp-wash focus-visible:bg-stamp-wash md:grid-cols-[minmax(0,1fr)_auto_7rem_2.75rem] md:py-6"
                  >
                    <span className="min-w-0">
                      <span className="block text-[1.25rem] leading-tight font-semibold tracking-[-0.01em] text-ink sm:text-[1.375rem]">
                        {service.name}
                      </span>
                      <span className="mt-1.5 block max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                        {service.description}
                      </span>
                    </span>

                    <span className="col-span-2 row-start-2 flex items-center gap-3 md:col-span-1 md:row-start-auto md:justify-end">
                      <DurationCells minutes={service.duration} />
                      <span className="type-figure min-w-[5.5rem] text-[0.875rem] whitespace-nowrap text-ink-soft">
                        {formatDuration(service.duration)}
                      </span>
                    </span>

                    <span className="type-figure col-start-2 row-start-1 text-right text-[1.25rem] font-semibold text-ink md:col-start-auto md:row-start-auto">
                      {formatPrice(service)}
                    </span>

                    <span className="hidden size-11 items-center justify-center justify-self-end rounded-[3px] border border-rule-strong text-ink transition-[background-color,border-color,color] duration-300 group-hover/row:border-stamp group-hover/row:bg-stamp group-hover/row:text-stamp-ink md:flex">
                      <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
                    </span>
                    <span className="sr-only">Book {service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
