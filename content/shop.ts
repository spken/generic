/**
 * Everything a new shop changes lives in this file.
 * Structure, layout and chrome never assume a trade; swap the words,
 * the numbers and the stamp colour, and the page becomes that shop.
 */

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

/** Opening hours as 24h "HH:MM" pairs. `null` means closed that day. */
export type DayHours = { open: string; close: string } | null

export type Service = {
  id: string
  name: string
  description: string
  /** Minutes. Drawn on the page as 15-minute cells. */
  duration: number
  /** Whole currency units. `0` renders as "Free". `from: true` renders as "from". */
  price: number
  from?: boolean
  /** Only bookable alongside another service. */
  addOn?: boolean
  category: string
}

export type TeamMember = {
  name: string
  role: string
  focus: string
  /** Days this person takes appointments. */
  days: Weekday[]
  /** Optional portrait in /public. Without one, a monogram plate is drawn. */
  photo?: string
}

export type WorkItem = {
  caption: string
  /** Describes the photo for screen readers. Falls back to the caption. */
  alt?: string
  /** Optional photo in /public. Without one, a labelled placeholder frame is drawn. */
  photo?: string
}

export const shop = {
  name: "Arden Studio",
  /** Short form for tight spaces (mobile header, footer mark). */
  shortName: "Arden",
  promise: "Unhurried appointments with people who are very good at what they do.",
  intro:
    "Book a time that suits you, arrive, and hand the next hour over to us. No rush between clients, no upselling, and a price you know before you sit down.",

  booking: {
    /** The built-in booking flow. Every Book button on the page leads here. */
    url: "/book",
    label: "Book an appointment",
    shortLabel: "Book",
  },

  theme: {
    /** The stamp ink: every primary action and the one saturated colour on the page. */
    stamp: "#2f4775",
    /** Text colour set on the stamp. Keep contrast at 4.5:1 or better. */
    stampInk: "#ffffff",
  },

  locale: "en-CH",
  timeZone: "Europe/Zurich",
  currency: "CHF",

  hours: {
    mon: null,
    tue: { open: "10:00", close: "19:00" },
    wed: { open: "10:00", close: "19:00" },
    thu: { open: "10:00", close: "20:00" },
    fri: { open: "09:00", close: "20:00" },
    sat: { open: "09:00", close: "16:00" },
    sun: null,
  } satisfies Record<Weekday, DayHours>,

  services: [
    {
      id: "full",
      name: "The full appointment",
      description: "Consultation, the complete service and finishing. Our most booked hour.",
      duration: 60,
      price: 95,
      category: "Appointments",
    },
    {
      id: "quick",
      name: "The quick visit",
      description: "A focused refresh when you know exactly what you want.",
      duration: 30,
      price: 55,
      category: "Appointments",
    },
    {
      id: "extended",
      name: "Extended session",
      description: "Time for bigger changes, detailed work or a complete reset.",
      duration: 90,
      price: 140,
      from: true,
      category: "Appointments",
    },
    {
      id: "upkeep",
      name: "Upkeep",
      description: "Keeps your last appointment looking like it did on day one.",
      duration: 45,
      price: 75,
      category: "Appointments",
    },
    {
      id: "consult",
      name: "First-visit consultation",
      description: "Talk it through before you commit. No obligation to book on.",
      duration: 15,
      price: 0,
      category: "Extras",
    },
    {
      id: "finish",
      name: "Finishing add-on",
      description: "Add to any appointment for the last, careful details.",
      duration: 15,
      price: 25,
      addOn: true,
      category: "Extras",
    },
  ] satisfies Service[],

  team: [
    {
      name: "Lea Brunner",
      role: "Founder",
      focus: "Precise, classic work and first-time clients.",
      days: ["tue", "wed", "thu", "fri"],
      photo: "/sample/team-lea.jpg",
    },
    {
      name: "Luca Meier",
      role: "Senior",
      focus: "Bold changes and extended sessions.",
      days: ["wed", "thu", "fri", "sat"],
      photo: "/sample/team-luca.jpg",
    },
    {
      name: "Nina Keller",
      role: "Specialist",
      focus: "Detail work, finishing and upkeep.",
      days: ["tue", "thu", "fri", "sat"],
      photo: "/sample/team-nina.jpg",
    },
    {
      name: "Jonas Frei",
      role: "Associate",
      focus: "Quick visits and Saturday regulars.",
      days: ["tue", "wed", "sat"],
      photo: "/sample/team-jonas.jpg",
    },
  ] satisfies TeamMember[],

  work: [
    { caption: "Recent work", alt: "A client's hair being washed at a basin", photo: "/sample/work-01.jpg" },
    { caption: "Recent work", alt: "A stylist finishing a client's blow-dry by the window", photo: "/sample/work-02.jpg" },
    { caption: "Details", alt: "Close-up of a freshly finished manicure", photo: "/sample/work-03.jpg" },
    { caption: "Details", alt: "A rolled towel, a pump bottle and pink tulips on a side table", photo: "/sample/work-04.jpg" },
    { caption: "The studio", alt: "The studio floor: mirrors, chairs and a long counter", photo: "/sample/work-05.jpg" },
    { caption: "Recent work", alt: "Hair being blow-dried with a round brush", photo: "/sample/work-06.jpg" },
  ] satisfies WorkItem[],

  /** A wide, bright photo of the room, shown under the hero. Optional. */
  studio: {
    photo: "/sample/studio-wide.jpg",
    caption: "The studio on Josefstrasse",
  } as { photo?: string; caption: string },

  policies: [
    {
      q: "What if I need to cancel or move my appointment?",
      a: "Change or cancel free of charge up to 24 hours before, using the link in your confirmation. Inside 24 hours we may charge half the service price.",
    },
    {
      q: "What happens if I'm running late?",
      a: "Let us know and we'll do what we can. After 15 minutes we may need to shorten or rebook the appointment so the next client isn't kept waiting.",
    },
    {
      q: "How do I pay?",
      a: "Card, TWINT or cash at the end of your appointment. Nothing is charged when you book.",
    },
    {
      q: "Is the studio accessible?",
      a: "Step-free entrance, an accessible restroom, and chairs that adjust. Tell us what you need when booking and we'll have it ready.",
    },
    {
      q: "Do you take walk-ins?",
      a: "When the book has a gap, yes. Booking ahead is the only way to guarantee a time.",
    },
  ],

  contact: {
    street: "Josefstrasse 14",
    city: "Zürich",
    postcode: "8005",
    phone: "+41 44 000 00 00",
    email: "hello@example.com",
    instagram: "https://instagram.com/",
    directions: "Two minutes from the Limmatplatz tram stop. Look for the blue door.",
  },
} as const

export type Shop = typeof shop
