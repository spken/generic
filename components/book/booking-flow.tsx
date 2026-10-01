"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { shop } from "@/content/shop"
import { useShopNow } from "@/components/site/use-shop-now"
import { daySlots, formatDay, shopDays, team, type StaffId } from "@/lib/availability"
import { money } from "@/lib/format"
import { formatTime, toMinutes } from "@/lib/hours"
import { cn } from "@/lib/utils"
import { BookingSummary, type Selection } from "@/components/book/booking-summary"
import { Confirmation } from "@/components/book/confirmation"
import { DetailsStep, emptyDetails, validateDetails, type Details } from "@/components/book/details-step"
import { PersonStep } from "@/components/book/person-step"
import { ServiceStep } from "@/components/book/service-step"
import { TimeStep } from "@/components/book/time-step"

const STEPS = [
  { id: "service", label: "Service" },
  { id: "person", label: "Person" },
  { id: "time", label: "Date and time" },
  { id: "details", label: "Your details" },
] as const

type StepId = (typeof STEPS)[number]["id"]

const baseServices = shop.services.filter((s) => !s.addOn)
const addOnServices = shop.services.filter((s) => s.addOn)
const staffIds = new Set(team.map((m) => m.id))

export type Booking = Selection & { details: Details; reference: string }

function initialFromParams(params: URLSearchParams) {
  const service = baseServices.find((s) => s.id === params.get("service"))?.id ?? null
  const addOn = addOnServices.find((s) => s.id === params.get("service"))?.id
  const staffParam = params.get("staff")
  const staff: StaffId | null = staffParam && staffIds.has(staffParam) ? staffParam : null
  const date = params.get("date")
  const time = params.get("time")
  const wanted =
    date && time && /^\d{4}-\d{2}-\d{2}$/.test(date) && /^\d{2}:\d{2}$/.test(time)
      ? { iso: date, minutes: toMinutes(time) }
      : null
  return { service, addOns: addOn ? [addOn] : [], staff, wanted }
}

export function BookingFlow() {
  const params = useSearchParams()
  const [initial] = useState(() => initialFromParams(params))
  const now = useShopNow()

  const [step, setStep] = useState<StepId>(initial.service ? (initial.staff ? "time" : "person") : "service")
  const [serviceId, setServiceId] = useState<string | null>(initial.service)
  const [addOns, setAddOns] = useState<string[]>(initial.addOns)
  const [staff, setStaff] = useState<StaffId | "any" | null>(initial.staff ?? (initial.wanted ? "any" : null))
  const [dayIso, setDayIso] = useState<string | null>(initial.wanted?.iso ?? null)
  const [time, setTime] = useState<number | null>(initial.wanted?.minutes ?? null)
  const [details, setDetails] = useState<Details>(emptyDetails)
  const [showErrors, setShowErrors] = useState(false)
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isPending, startTransition] = useTransition()

  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }, [step, booking])

  const service = baseServices.find((s) => s.id === serviceId) ?? null
  const extras = addOnServices.filter((s) => addOns.includes(s.id))
  const duration = (service?.duration ?? 0) + extras.reduce((sum, s) => sum + s.duration, 0)

  // The chosen time only counts while it is still free for this service and person.
  const days = now ? shopDays() : []
  const day = days.find((d) => d.iso === dayIso) ?? null
  const slots = day && service && staff ? daySlots(day, duration, staff, now?.minutes ?? null) : []
  const slot = time === null ? null : (slots.find((s) => s.minutes === time) ?? null)
  const assigned = slot ? (staff === "any" ? slot.staff[0] : staff) : staff !== "any" ? staff : null

  const selection: Selection = {
    service,
    extras,
    duration,
    staff,
    assigned,
    day: slot ? day : null,
    time: slot ? slot.minutes : null,
  }

  const errors = validateDetails(details)
  const canContinue: Record<StepId, boolean> = {
    service: Boolean(service),
    person: Boolean(staff),
    time: Boolean(slot),
    details: Object.keys(errors).length === 0,
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step)
  const reached = (id: StepId) => STEPS.findIndex((s) => s.id === id) <= stepIndex

  function goNext() {
    if (step === "details") {
      if (!canContinue.details) {
        setShowErrors(true)
        document.querySelector<HTMLElement>("[aria-invalid=true]")?.focus()
        return
      }
      startTransition(async () => {
        // Sample flow: stands in for the request to the shop's booking system.
        await new Promise((resolve) => setTimeout(resolve, 900))
        const reference = `${shop.shortName.slice(0, 2).toUpperCase()}-${Date.now().toString(36).slice(-5).toUpperCase()}`
        setBooking({ ...selection, details, reference })
      })
      return
    }
    if (canContinue[step]) setStep(STEPS[stepIndex + 1].id)
  }

  function goBack() {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1].id)
  }

  if (booking) {
    return (
      <div className="mx-auto max-w-[90rem] px-(--gutter) py-10 sm:py-16">
        <h1 ref={headingRef} tabIndex={-1} className="sr-only">
          Booking confirmed
        </h1>
        <Confirmation booking={booking} />
      </div>
    )
  }

  const stepTitle: Record<StepId, string> = {
    service: "What would you like to book?",
    person: "Who would you like to see?",
    time: "When suits you?",
    details: "Last step: your details",
  }

  const total = service ? service.price + extras.reduce((s, e) => s + e.price, 0) : 0

  return (
    <div className="mx-auto grid max-w-[90rem] gap-x-16 gap-y-10 px-(--gutter) pt-8 pb-40 sm:pt-12 lg:grid-cols-12 lg:pb-24">
      <div className="min-w-0 lg:col-span-7">
        <nav aria-label="Booking steps">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {STEPS.map((s, i) => {
              const done = i < stepIndex
              const current = s.id === step
              return (
                <li key={s.id} className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={!reached(s.id) || current}
                    onClick={() => setStep(s.id)}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "type-header inline-flex h-9 items-center gap-2 rounded-[3px] pr-3 pl-1.5 text-[0.75rem] transition-colors",
                      current && "bg-ink text-paper",
                      done && "text-ink hover:bg-paper-deep",
                      !current && !done && "text-ink-meta"
                    )}
                  >
                    <span
                      className={cn(
                        "type-figure flex size-6 items-center justify-center rounded-[2px] text-[0.75rem] font-semibold",
                        current && "bg-paper text-ink",
                        done && "bg-stamp text-stamp-ink",
                        !current && !done && "border border-rule-strong"
                      )}
                    >
                      {done ? <Check className="size-3.5" strokeWidth={2.75} aria-hidden /> : i + 1}
                    </span>
                    <span className={cn(!current && "max-sm:sr-only")}>{s.label}</span>
                    {done ? <span className="sr-only">(done, select to change)</span> : null}
                  </button>
                  {i < STEPS.length - 1 ? <span aria-hidden className="h-px w-3 bg-rule-strong sm:w-5" /> : null}
                </li>
              )
            })}
          </ol>
        </nav>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="type-ledger mt-8 text-[clamp(2.25rem,5vw,3.5rem)] text-ink outline-none sm:mt-10"
        >
          {stepTitle[step]}
        </h1>

        <div className="mt-8 sm:mt-10">
          {step === "service" ? (
            <ServiceStep
              services={baseServices}
              addOns={addOnServices}
              serviceId={serviceId}
              selectedAddOns={addOns}
              onService={setServiceId}
              onAddOns={setAddOns}
            />
          ) : null}
          {step === "person" ? <PersonStep staff={staff} onStaff={setStaff} /> : null}
          {step === "time" ? (
            <TimeStep
              days={days}
              duration={duration}
              staff={staff ?? "any"}
              nowMinutes={now?.minutes ?? null}
              dayIso={day ? dayIso : null}
              time={slot ? time : null}
              onDay={(iso) => {
                setDayIso(iso)
                setTime(null)
              }}
              onTime={setTime}
            />
          ) : null}
          {step === "details" ? (
            <DetailsStep details={details} onChange={setDetails} errors={showErrors ? errors : {}} />
          ) : null}
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule-strong bg-paper/95 px-(--gutter) pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:static lg:mt-12 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <p aria-hidden className="mb-2.5 flex min-h-5 items-center gap-1.5 truncate text-[0.875rem] text-ink-soft lg:hidden">
            {service ? (
              <>
                <span className="truncate font-semibold text-ink">{service.name}</span>
                {selection.day && selection.time !== null ? (
                  <span className="shrink-0 tabular-nums">
                    · {formatDay(selection.day, "short")}, {formatTime(selection.time)}
                  </span>
                ) : null}
                <span className="type-figure ml-auto shrink-0 font-semibold text-ink">
                  {total === 0 ? "Free" : `${service.from ? "from " : ""}${money.format(total)}`}
                </span>
              </>
            ) : (
              "Choose a service to start"
            )}
          </p>
          <div className="flex items-center justify-between gap-3">
            {stepIndex > 0 ? (
              <Button type="button" variant="ledger" size="stamp" onClick={goBack} disabled={isPending} className="px-4">
                <ArrowLeft className="size-4" strokeWidth={2.25} aria-hidden />
                Back
              </Button>
            ) : (
              <span />
            )}
            <Button
              type="button"
              variant="stamp"
              size="stamp-lg"
              onClick={goNext}
              disabled={(step !== "details" && !canContinue[step]) || isPending}
              className="min-w-0 max-sm:h-12 max-sm:px-6"
            >
              {step === "details" ? (isPending ? "Booking your time…" : "Confirm booking") : "Continue"}
              {isPending ? (
                <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-stamp-ink/40 border-t-stamp-ink" />
              ) : (
                <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden />
              )}
            </Button>
          </div>
        </div>
      </div>

      <aside aria-label="Your booking so far" className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
        <div className="lg:sticky lg:top-24">
          <BookingSummary selection={selection} onEdit={(id) => setStep(id)} canEdit={reached} />
        </div>
      </aside>
    </div>
  )
}
