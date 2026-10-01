"use client"

import { shop } from "@/content/shop"
import { DAY_LABEL, WEEKDAYS, formatTime, toMinutes, weekSpan } from "@/lib/hours"
import { cn } from "@/lib/utils"
import { useShopNow } from "@/components/site/use-shop-now"

const span = weekSpan(shop.hours)
const total = span.end - span.start
const hourMarks = Array.from({ length: total / 60 + 1 }, (_, i) => span.start + i * 60)

const pct = (minutes: number) => `${((minutes - span.start) / total) * 100}%`

const summary = WEEKDAYS.map((day) => {
  const h = shop.hours[day]
  return `${DAY_LABEL[day].long}: ${h ? `${h.open} to ${h.close}` : "closed"}`
}).join("; ")

export function WeekGrid() {
  const now = useShopNow()
  const nowInSpan = now && now.minutes >= span.start && now.minutes <= span.end

  return (
    <figure className="relative">
      <div
        role="img"
        aria-label={`Opening hours this week. ${summary}.`}
        className="grid grid-cols-[2.75rem_repeat(7,minmax(0,1fr))] overflow-hidden rounded-[4px] border border-rule-strong bg-paper sm:grid-cols-[3.5rem_repeat(7,minmax(0,1fr))]"
      >
        {/* Column heads */}
        <div className="border-r border-b border-rule" />
        {WEEKDAYS.map((day) => {
          const isToday = now?.weekday === day
          return (
            <div
              key={day}
              className={cn(
                "type-header flex h-12 flex-col items-center justify-center border-b border-rule text-[0.6875rem] transition-colors duration-500 not-last:border-r not-last:border-r-rule sm:text-[0.75rem]",
                isToday ? "bg-stamp text-stamp-ink" : "text-ink"
              )}
            >
              <span className="sm:hidden">{DAY_LABEL[day].letter}</span>
              <span className="hidden sm:inline">{DAY_LABEL[day].short}</span>
              {isToday ? (
                <span className="mt-0.5 text-[0.5625rem] tracking-[0.12em] opacity-85">Today</span>
              ) : null}
            </div>
          )
        })}

        {/* Time gutter */}
        <div className="relative border-r border-rule" style={{ height: `calc(var(--line) * ${total / 60})` }}>
          {hourMarks.slice(0, -1).map((m) => (
            <span
              key={m}
              className="absolute right-1.5 translate-y-1 text-[0.625rem] leading-none tabular-nums text-ink-meta sm:right-2 sm:text-[0.6875rem]"
              style={{ top: pct(m) }}
            >
              {formatTime(m)}
            </span>
          ))}
        </div>

        {/* Day columns */}
        {WEEKDAYS.map((day) => {
          const h = shop.hours[day]
          const isToday = now?.weekday === day
          return (
            <div key={day} className="hatch relative not-last:border-r not-last:border-r-rule">
              {h ? (
                <div
                  className={cn(
                    "absolute inset-x-0 flex flex-col items-center justify-between py-1 transition-colors duration-500",
                    isToday
                      ? "bg-stamp-wash"
                      : "bg-paper"
                  )}
                  style={{
                    top: pct(toMinutes(h.open)),
                    bottom: `calc(100% - ${pct(toMinutes(h.close))})`,
                  }}
                >
                  {/* Opening time at the top edge of the open band, closing time at the bottom edge */}
                  {[h.open, h.close].map((t) => (
                    <span
                      key={t}
                      className={cn(
                        "text-[0.625rem] leading-none font-medium tabular-nums tracking-[-0.01em] sm:text-[0.75rem]",
                        isToday ? "text-stamp-deep" : "text-ink-soft"
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="type-header absolute inset-x-0 top-1/2 -translate-y-1/2 -rotate-90 text-center text-[0.625rem] text-ink-meta">
                  Closed
                </span>
              )}

              {isToday && nowInSpan ? (
                <div
                  className="pointer-events-none absolute inset-x-0 z-10 h-0.5 -translate-y-1/2 bg-stamp transition-[top] duration-1000 ease-(--ease-ink)"
                  style={{ top: pct(now.minutes) }}
                >
                  <span className="absolute -left-1 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-stamp motion-safe:animate-[now-pulse_2.4s_ease-out_infinite]" />
                </div>
              ) : nowInSpan ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 z-10 border-t border-dashed border-stamp/50"
                  style={{ top: pct(now.minutes) }}
                />
              ) : null}
            </div>
          )
        })}
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[0.8125rem] text-ink-soft">
        <span>Opening hours, {shop.contact.city} time</span>
        <span className="type-figure min-h-[1lh] text-ink" suppressHydrationWarning>
          {now ? `Now ${formatTime(now.minutes)}` : ""}
        </span>
      </figcaption>
    </figure>
  )
}
