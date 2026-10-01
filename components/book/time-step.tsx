"use client"

import { FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { shop } from "@/content/shop"
import { daySlots, formatDay, team, type ShopDay, type StaffId } from "@/lib/availability"
import { formatTime } from "@/lib/hours"
import { cn } from "@/lib/utils"

const PERIODS = [
  { label: "Morning", until: 12 * 60 },
  { label: "Afternoon", until: 17 * 60 },
  { label: "Evening", until: 24 * 60 },
]

/** Under this many free times, a day is marked as filling up. */
const FEW = 4

const chip =
  "relative cursor-pointer justify-center gap-0 rounded-[3px] border border-rule-strong bg-paper text-ink transition-colors duration-200 hover:border-ink/60 has-data-checked:border-stamp has-data-checked:bg-stamp has-data-checked:text-stamp-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-stamp has-data-disabled:cursor-not-allowed has-data-disabled:border-rule has-data-disabled:text-ink-meta has-data-disabled:hover:border-rule"

function weekdayShort(day: ShopDay) {
  return new Intl.DateTimeFormat(shop.locale, { timeZone: "UTC", weekday: "short" }).format(day.date)
}

export function TimeStep({
  days,
  duration,
  staff,
  nowMinutes,
  dayIso,
  time,
  onDay,
  onTime,
}: {
  days: ShopDay[]
  duration: number
  staff: StaffId | "any"
  nowMinutes: number | null
  dayIso: string | null
  time: number | null
  onDay: (iso: string) => void
  onTime: (minutes: number) => void
}) {
  const perDay = days.map((day) => ({ day, slots: daySlots(day, duration, staff, nowMinutes) }))
  const activeIso = dayIso ?? perDay.find((d) => d.slots.length)?.day.iso ?? null
  const active = perDay.find((d) => d.day.iso === activeIso) ?? null
  const person = staff === "any" ? null : team.find((m) => m.id === staff)

  if (!days.length) {
    return <p className="text-ink-soft">Opening the book…</p>
  }

  return (
    <div className="space-y-12">
      <FieldSet className="min-w-0">
        <FieldLegend className="type-header mb-3 text-ink data-[variant=legend]:text-[0.8125rem]">Day</FieldLegend>
        <RadioGroup
          value={activeIso ?? ""}
          onValueChange={(v) => onDay(String(v))}
          className="-mx-(--gutter) flex snap-x gap-1.5 overflow-x-auto px-(--gutter) pt-1 pb-3 [scrollbar-width:thin] lg:mx-0 lg:px-0"
        >
          {perDay.map(({ day, slots }) => {
            const closed = !shop.hours[day.weekday]
            const unavailable = slots.length === 0
            const few = !unavailable && slots.length < FEW
            const status = closed ? "Closed" : unavailable ? "Full" : few ? `${slots.length} left` : `${slots.length} free`
            return (
              <FieldLabel
                key={day.iso}
                htmlFor={`day-${day.iso}`}
                className={cn(
                  chip,
                  "w-[4.5rem] shrink-0 snap-start flex-col items-center gap-1 rounded-[4px] px-1 py-3 text-center",
                  unavailable && "hatch"
                )}
              >
                <RadioGroupItem value={day.iso} id={`day-${day.iso}`} disabled={unavailable} className="sr-only absolute!" />
                <span className="type-header text-[0.6875rem]">{day.offset === 0 ? "Today" : weekdayShort(day)}</span>
                <span className="text-[1.375rem] leading-none font-semibold tabular-nums">{day.date.getUTCDate()}</span>
                <span className="mt-1 flex items-center gap-1 text-[0.6875rem]">
                  {few ? <span aria-hidden className="size-1.5 rounded-full bg-current" /> : null}
                  {status}
                </span>
                <span className="sr-only">{formatDay(day)}</span>
              </FieldLabel>
            )
          })}
        </RadioGroup>
      </FieldSet>

      {active ? (
        <FieldSet>
          <FieldLegend className="mb-1 text-[1.125rem] font-semibold text-ink">
            {formatDay(active.day)}
            {person ? <span className="font-normal text-ink-soft"> with {person.name.split(" ")[0]}</span> : null}
          </FieldLegend>
          <p className="text-[0.9375rem] text-ink-soft">Times that fit your full {duration}-minute appointment.</p>
          {active.slots.length ? (
            <RadioGroup
              value={time === null || dayIso !== active.day.iso ? "" : String(time)}
              onValueChange={(v) => {
                if (dayIso !== active.day.iso) onDay(active.day.iso)
                onTime(Number(v))
              }}
              className="mt-3 gap-7"
            >
              {PERIODS.map((period, i) => {
                const from = i === 0 ? 0 : PERIODS[i - 1].until
                const inPeriod = active.slots.filter((s) => s.minutes >= from && s.minutes < period.until)
                if (!inPeriod.length) return null
                return (
                  <div key={period.label}>
                    <p className="type-header mb-3 border-b border-rule pb-2 text-[0.6875rem] text-ink-soft">{period.label}</p>
                    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 xl:grid-cols-6">
                      {inPeriod.map((slot) => (
                        <FieldLabel
                          key={slot.minutes}
                          htmlFor={`time-${slot.minutes}`}
                          className={cn(chip, "h-11 w-full items-center text-[1rem] font-semibold tracking-[-0.01em]")}
                        >
                          <RadioGroupItem value={String(slot.minutes)} id={`time-${slot.minutes}`} className="sr-only absolute!" />
                          <span className="tabular-nums">{formatTime(slot.minutes)}</span>
                        </FieldLabel>
                      ))}
                    </div>
                  </div>
                )
              })}
            </RadioGroup>
          ) : (
            <p className="hatch mt-4 rounded-[4px] border border-rule-strong p-5 text-ink-soft">
              The book is full on this day. Try another day, or choose &ldquo;First available&rdquo; for more times.
            </p>
          )}
        </FieldSet>
      ) : (
        <p className="hatch rounded-[4px] border border-rule-strong p-5 text-ink-soft">
          Nothing free in the next three weeks for this combination. Try &ldquo;First available&rdquo;, or call us on{" "}
          <a className="type-figure underline" href={`tel:${shop.contact.phone.replace(/\s/g, "")}`}>
            {shop.contact.phone}
          </a>
          .
        </p>
      )}
    </div>
  )
}
