import { shop } from "@/content/shop"

const pad = (n: number) => String(n).padStart(2, "0")

/** "2026-10-02" + 630 minutes -> "20261002T103000" (local to the shop's time zone). */
function localStamp(iso: string, minutes: number) {
  return `${iso.replaceAll("-", "")}T${pad(Math.floor(minutes / 60))}${pad(minutes % 60)}00`
}

function escape(text: string) {
  return text.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n")
}

/** A one-event calendar file for the booked appointment. */
export function appointmentIcs({
  uid,
  iso,
  start,
  duration,
  title,
  description,
}: {
  uid: string
  iso: string
  start: number
  duration: number
  title: string
  description: string
}) {
  const now = new Date()
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`
  const location = `${shop.contact.street}, ${shop.contact.postcode} ${shop.contact.city}`
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${escape(shop.name)}//Booking//EN`,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${shop.timeZone}:${localStamp(iso, start)}`,
    `DTEND;TZID=${shop.timeZone}:${localStamp(iso, start + duration)}`,
    `SUMMARY:${escape(title)}`,
    `LOCATION:${escape(location)}`,
    `DESCRIPTION:${escape(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}
