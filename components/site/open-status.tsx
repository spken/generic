"use client"

import { shop } from "@/content/shop"
import { DAY_LABEL, formatTime, openState } from "@/lib/hours"
import { cn } from "@/lib/utils"
import { useShopNow } from "@/components/site/use-shop-now"

function useOpenState() {
  const now = useShopNow()
  return now ? openState(shop.hours, now) : undefined
}

/** One line of status copy: "Open now, until 19:00". */
export function OpenStatus({ className }: { className?: string }) {
  const state = useOpenState()

  let label = " "
  if (state === null) label = "Hours to be announced"
  else if (state?.open) label = `Open now, until ${formatTime(state.closesAt)}`
  else if (state) {
    const when = state.isToday ? "today" : state.isTomorrow ? "tomorrow" : DAY_LABEL[state.nextDay].long
    label = `Closed now, opens ${when} at ${formatTime(state.opensAt)}`
  }

  return (
    <p className={cn("flex items-center gap-2.5", className)} aria-live="polite">
      <span
        aria-hidden
        className={cn(
          "size-2 shrink-0 rounded-full transition-colors duration-500",
          state?.open ? "bg-stamp motion-safe:animate-[now-pulse_2.4s_ease-out_infinite]" : "bg-ink-meta"
        )}
      />
      <span className="type-figure">{label}</span>
    </p>
  )
}

/** The rubber stamp pressed onto the week: OPEN or CLOSED. */
export function StatusStamp({ className }: { className?: string }) {
  const state = useOpenState()
  if (!state) return null
  const open = state.open

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none select-none motion-safe:animate-[stamp-in_700ms_var(--ease-stamp)_both] -rotate-3",
        className
      )}
    >
      <div
        className={cn(
          "type-ledger rounded-[6px] border-2 px-3 pt-2 pb-1.5 text-center text-[1.5rem] leading-none tracking-[-0.01em] uppercase sm:text-[1.75rem]",
          open ? "border-stamp text-stamp" : "border-ink-soft text-ink-soft"
        )}
      >
        <span className="block">{open ? "Open" : "Closed"}</span>
        <span className="type-header mt-1.5 block text-[0.6875rem] tracking-[0.14em]">
          {open ? `until ${formatTime(state.closesAt)}` : `${DAY_LABEL[state.nextDay].short} ${formatTime(state.opensAt)}`}
        </span>
      </div>
    </div>
  )
}
