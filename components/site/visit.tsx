import { ArrowUpRight } from "lucide-react"
import { BookLink } from "@/components/site/book-link"
import { OpenStatus } from "@/components/site/open-status"
import { shop } from "@/content/shop"
import { DAY_LABEL, WEEKDAYS } from "@/lib/hours"

const address = `${shop.contact.street}, ${shop.contact.postcode} ${shop.contact.city}`
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name}, ${address}`)}`

const CARD_LINES = ["Name", "Date", "Time", "With"]

/** The appointment card handed over the counter, as the page's closing action. */
function AppointmentCard() {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] rotate-[-2.5deg] transition-transform duration-700 ease-(--ease-ink) hover:rotate-[-1deg] motion-reduce:rotate-0">
      <div className="rounded-[4px] bg-paper p-6 text-ink shadow-[0_2px_3px_rgb(0_0_0/0.18),0_28px_60px_-18px_rgb(0_0_0/0.55)] sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b-[3px] border-ink pb-3">
          <p className="type-ledger text-[1.75rem]">{shop.name}</p>
          <p className="type-header pt-1 text-right text-[0.625rem] leading-snug text-ink-soft">
            Appointment
            <br />
            card
          </p>
        </div>
        <dl className="mt-2">
          {CARD_LINES.map((label) => (
            <div key={label} className="flex h-[calc(var(--line)*1.5)] items-end gap-4 border-b border-rule-strong pb-1.5">
              <dt className="type-header w-14 text-[0.6875rem] text-ink-soft">{label}</dt>
              <dd aria-hidden className="flex-1" />
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-soft">
          Fill yours in online. It takes under a minute, and you&rsquo;ll get a reminder the day before.
        </p>
        <BookLink size="stamp-lg" className="mt-6 w-full justify-between" />
      </div>
    </div>
  )
}

export function Visit() {
  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="relative overflow-hidden bg-stamp text-stamp-ink [--rule-on-stamp:color-mix(in_oklab,var(--stamp-ink),transparent_72%)]"
    >
      <div className="mx-auto grid max-w-[90rem] gap-x-16 gap-y-16 px-(--gutter) py-20 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          <h2 id="visit-title" className="type-ledger text-[clamp(3.25rem,9vw,5.5rem)]">
            Come in
          </h2>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="type-ledger text-[1.375rem]">Where</h3>
              <address className="mt-3 border-t border-(--rule-on-stamp) pt-3 text-[1.375rem] leading-snug font-semibold not-italic">
                {shop.contact.street}
                <br />
                {shop.contact.postcode} {shop.contact.city}
              </address>
              <p className="mt-3 max-w-[32ch] text-[0.9375rem] leading-relaxed opacity-85">
                {shop.contact.directions}
              </p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener"
                className="type-header mt-5 inline-flex items-center gap-1.5 text-[0.75rem] underline decoration-(--rule-on-stamp) underline-offset-[0.45em] transition-[text-decoration-color] hover:decoration-current"
              >
                Open in maps
                <ArrowUpRight className="size-3.5" strokeWidth={2.25} aria-hidden />
              </a>

              <h3 className="type-ledger mt-10 text-[1.375rem]">Contact</h3>
              <ul className="mt-3 space-y-1.5 border-t border-(--rule-on-stamp) pt-3 text-[1rem]">
                <li>
                  <a className="type-figure underline decoration-(--rule-on-stamp) hover:decoration-current" href={`tel:${shop.contact.phone.replace(/\s/g, "")}`}>
                    {shop.contact.phone}
                  </a>
                </li>
                <li>
                  <a className="underline decoration-(--rule-on-stamp) hover:decoration-current" href={`mailto:${shop.contact.email}`}>
                    {shop.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="type-ledger text-[1.375rem]">Hours</h3>
              <OpenStatus className="mt-3 border-t border-(--rule-on-stamp) pt-3 text-[0.9375rem] [&>span:first-child]:bg-stamp-ink" />
              <table className="mt-3 w-full text-[1rem]">
                <caption className="sr-only">Opening hours</caption>
                <tbody>
                  {WEEKDAYS.map((day) => {
                    const h = shop.hours[day]
                    return (
                      <tr key={day} className="border-b border-(--rule-on-stamp)">
                        <th scope="row" className="h-10 text-left font-medium">
                          {DAY_LABEL[day].long}
                        </th>
                        <td className="type-figure text-right font-semibold">
                          {h ? `${h.open} to ${h.close}` : <span className="font-normal opacity-75">Closed</span>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div data-motion="card" className="flex items-center lg:col-span-5">
          <AppointmentCard />
        </div>
      </div>
    </section>
  )
}
