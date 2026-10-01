import type { DayHours, Weekday } from "@/content/shop"

export const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]


export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

/** Earliest opening and latest closing across the week, rounded to whole hours. */
export function weekSpan(hours: Record<Weekday, DayHours>) {
  let start = Infinity
  let end = -Infinity
  for (const day of WEEKDAYS) {
    const h = hours[day]
    if (!h) continue
    start = Math.min(start, toMinutes(h.open))
    end = Math.max(end, toMinutes(h.close))
  }
  return { start: Math.floor(start / 60) * 60, end: Math.ceil(end / 60) * 60 }
}

/** Current weekday and minute-of-day in the shop's own time zone. */
export function shopNow(timeZone: string, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  const weekday = get("weekday").toLowerCase().slice(0, 3) as Weekday
  return { weekday, minutes: Number(get("hour")) * 60 + Number(get("minute")) }
}

export type OpenState =
  | { open: true; closesAt: number }
  | { open: false; nextDay: Weekday; opensAt: number; isToday: boolean; isTomorrow: boolean }

export function openState(
  hours: Record<Weekday, DayHours>,
  now: { weekday: Weekday; minutes: number }
): OpenState | null {
  const today = hours[now.weekday]
  if (today && now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close)) {
    return { open: true, closesAt: toMinutes(today.close) }
  }
  const startIndex = WEEKDAYS.indexOf(now.weekday)
  for (let offset = 0; offset < 8; offset++) {
    const day = WEEKDAYS[(startIndex + offset) % 7]
    const h = hours[day]
    if (!h) continue
    if (offset === 0 && now.minutes >= toMinutes(h.open)) continue
    return {
      open: false,
      nextDay: day,
      opensAt: toMinutes(h.open),
      isToday: offset === 0,
      isTomorrow: offset === 1,
    }
  }
  return null
}

export const DAY_LABEL: Record<Weekday, { short: string; long: string; letter: string }> = {
  mon: { short: "Mon", long: "Monday", letter: "M" },
  tue: { short: "Tue", long: "Tuesday", letter: "T" },
  wed: { short: "Wed", long: "Wednesday", letter: "W" },
  thu: { short: "Thu", long: "Thursday", letter: "T" },
  fri: { short: "Fri", long: "Friday", letter: "F" },
  sat: { short: "Sat", long: "Saturday", letter: "S" },
  sun: { short: "Sun", long: "Sunday", letter: "S" },
}

