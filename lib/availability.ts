import { shop, type Weekday } from "@/content/shop"
import { WEEKDAYS, toMinutes } from "@/lib/hours"

/**
 * Sample availability for the built-in booking flow.
 *
 * There is no backend: which times are taken is derived from a stable hash of
 * the date, person and time, so the same day always shows the same gaps.
 * Replace `isBusy` with a call to the shop's real calendar when one exists.
 */

/** Appointments start on this grid, in minutes. */
export const SLOT_STEP = 30
/** How far ahead the flow lets you book, in days. */
export const BOOKING_WINDOW = 21
/** Earliest bookable start, in minutes from now, for same-day appointments. */
const SAME_DAY_LEAD = 60
/** Share of half-hour blocks already booked in the sample data. */
const BUSY_SHARE = 0.42

export type StaffId = string
export type ShopDay = { iso: string; weekday: Weekday; date: Date; offset: number }
export type Slot = { minutes: number; staff: StaffId[] }

export const staffId = (name: string): StaffId => name.split(" ")[0].toLowerCase()

export const team = shop.team.map((m) => ({ ...m, id: staffId(m.name) }))

function hash(input: string) {
  // FNV-1a, folded to [0, 1)
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0) / 4294967296
}

function isBusy(iso: string, staff: StaffId, minutes: number) {
  return hash(`${iso}|${staff}|${minutes}`) < BUSY_SHARE
}

/** Today's date in the shop's own time zone, then the next `count` days. */
export function shopDays(count = BOOKING_WINDOW, from = new Date()): ShopDay[] {
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone: shop.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(from)
  const [y, m, d] = ymd.split("-").map(Number)
  return Array.from({ length: count }, (_, offset) => {
    const date = new Date(Date.UTC(y, m - 1, d + offset, 12))
    const weekday = WEEKDAYS[(date.getUTCDay() + 6) % 7]
    return { iso: date.toISOString().slice(0, 10), weekday, date, offset }
  })
}

export function worksOn(staff: StaffId, weekday: Weekday) {
  const member = team.find((m) => m.id === staff)
  return Boolean(member && (member.days as readonly Weekday[]).includes(weekday) && shop.hours[weekday])
}

/**
 * Bookable start times on one day for a service of `duration` minutes.
 * `staff` narrows to one person; "any" returns everyone free at each time.
 */
export function daySlots(day: ShopDay, duration: number, staff: StaffId | "any", nowMinutes: number | null): Slot[] {
  const hours = shop.hours[day.weekday]
  if (!hours) return []
  const open = toMinutes(hours.open)
  const close = toMinutes(hours.close)
  const earliest = day.offset === 0 && nowMinutes !== null ? nowMinutes + SAME_DAY_LEAD : open
  const people = (staff === "any" ? team.map((m) => m.id) : [staff]).filter((id) => worksOn(id, day.weekday))

  const slots: Slot[] = []
  for (let start = open; start + duration <= close; start += SLOT_STEP) {
    if (start < earliest) continue
    const free = people.filter((id) => {
      for (let t = start - (start % SLOT_STEP); t < start + duration; t += SLOT_STEP) {
        if (isBusy(day.iso, id, t)) return false
      }
      return true
    })
    if (free.length) slots.push({ minutes: start, staff: free })
  }
  return slots
}

export function formatDay(day: ShopDay, style: "short" | "long" = "long") {
  if (day.offset === 0) return "Today"
  if (day.offset === 1) return "Tomorrow"
  return new Intl.DateTimeFormat(shop.locale, {
    timeZone: "UTC",
    weekday: style === "long" ? "long" : "short",
    day: "numeric",
    month: style === "long" ? "long" : "short",
  }).format(day.date)
}
