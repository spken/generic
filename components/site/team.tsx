import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { bookingHref } from "@/components/site/book-link"
import { SectionHead } from "@/components/site/section-head"
import { shop } from "@/content/shop"
import { DAY_LABEL, WEEKDAYS } from "@/lib/hours"
import { cn } from "@/lib/utils"

function initial(name: string) {
  return name.trim().charAt(0)
}

function Portrait({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <div data-motion="portrait" className="absolute inset-0 grayscale-[15%]">
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-top transition-transform duration-[1.2s] ease-(--ease-ink) group-hover/member:scale-[1.03]"
        />
      </div>
    )
  }
  return (
    <div aria-hidden className="absolute inset-0 flex items-end justify-start bg-paper-deep p-4">
      <span className="type-ledger text-[clamp(6rem,11vw,9rem)] text-ink transition-colors duration-500 group-hover/member:text-stamp">
        {initial(name)}
      </span>
      <span className="type-header absolute top-3 right-3 text-[0.625rem] text-ink-meta">Portrait</span>
    </div>
  )
}

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="mx-auto max-w-[90rem] px-(--gutter) py-20 lg:py-32">
      <SectionHead id="team" title="Who&rsquo;s in the book">
        Book the first free slot, or book with someone you already trust. Everyone&rsquo;s days are
        marked below.
      </SectionHead>

      <ul className="mt-14 grid border-t border-l border-rule-strong sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {shop.team.map((member) => {
          const first = member.name.split(" ")[0]
          return (
            <li key={member.name} className="group/member flex flex-col border-r border-b border-rule-strong">
              <div className="flex items-baseline justify-between gap-3 px-4 pt-4 pb-3">
                <h3 className="type-ledger text-[1.5rem] text-ink">{member.name}</h3>
                <span className="type-header shrink-0 text-[0.6875rem] text-ink-soft">{member.role}</span>
              </div>

              <div className="relative aspect-[3/2] overflow-hidden sm:aspect-[4/5]">
                <Portrait name={member.name} photo={"photo" in member ? (member.photo as string) : undefined} />
              </div>

              <div className="flex flex-1 flex-col gap-5 p-4">
                <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{member.focus}</p>

                <div>
                  <p className="sr-only">
                    Works {member.days.map((d) => DAY_LABEL[d].long).join(", ")}.
                  </p>
                  <ol aria-hidden className="grid grid-cols-7 gap-0.5">
                    {WEEKDAYS.map((day) => {
                      const on = (member.days as readonly string[]).includes(day)
                      return (
                        <li
                          key={day}
                          className={cn(
                            "type-header flex h-8 items-center justify-center rounded-[2px] text-[0.6875rem]",
                            on ? "bg-ink text-paper" : shop.hours[day] ? "bg-paper-deep text-ink-meta" : "hatch text-ink-meta"
                          )}
                        >
                          {DAY_LABEL[day].letter}
                        </li>
                      )
                    })}
                  </ol>
                </div>

                <a
                  href={bookingHref({ staff: first.toLowerCase() })}
                  target="_blank"
                  rel="noopener"
                  className="type-header mt-auto inline-flex h-11 items-center justify-between rounded-[3px] border border-ink/40 px-4 text-[0.75rem] text-ink transition-colors duration-300 hover:border-stamp hover:bg-stamp hover:text-stamp-ink"
                >
                  Book with {first}
                  <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
