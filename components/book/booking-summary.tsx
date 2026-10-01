import type { ReactNode } from "react"
import Image from "next/image"
import { shop, type Service } from "@/content/shop"
import { formatDay, team, type ShopDay, type StaffId } from "@/lib/availability"
import { formatDuration, money } from "@/lib/format"
import { formatTime } from "@/lib/hours"
import { cn } from "@/lib/utils"

export type Selection = {
  service: Service | null
  extras: Service[]
  duration: number
  staff: StaffId | "any" | null
  /** The person who will actually take the appointment. */
  assigned: StaffId | null
  day: ShopDay | null
  time: number | null
}

type EditTarget = "service" | "person" | "time"

function Row({
  label,
  children,
  onEdit,
}: {
  label: string
  children?: ReactNode
  onEdit?: () => void
}) {
  return (
    <div className="flex min-h-[calc(var(--line)*2)] items-start gap-4 border-b border-rule-strong py-3">
      <dt className="type-header w-14 shrink-0 pt-1 text-[0.6875rem] text-ink-soft">{label}</dt>
      <dd className="min-w-0 flex-1 text-[1rem] leading-snug">
        {children ? <span className="block font-semibold text-ink">{children}</span> : <span aria-hidden className="block h-6" />}
        {children ? null : <span className="sr-only">Not chosen yet</span>}
      </dd>
      {onEdit && children ? (
        <button
          type="button"
          onClick={onEdit}
          className="type-header shrink-0 pt-1 text-[0.6875rem] text-ink underline decoration-ink/30 underline-offset-[0.4em] hover:text-stamp hover:decoration-stamp"
        >
          Change<span className="sr-only"> {label.toLowerCase()}</span>
        </button>
      ) : null}
    </div>
  )
}

/** The appointment card, filled in line by line as each choice is made. */
export function BookingSummary({
  selection,
  onEdit,
  canEdit,
  className,
}: {
  selection: Selection
  onEdit?: (step: EditTarget) => void
  canEdit?: (step: EditTarget) => boolean
  className?: string
}) {
  const { service, extras, duration, staff, assigned, day, time } = selection
  const person = team.find((m) => m.id === assigned)
  const total = service ? service.price + extras.reduce((s, e) => s + e.price, 0) : null
  const edit = (step: EditTarget) => (onEdit && (!canEdit || canEdit(step)) ? () => onEdit(step) : undefined)

  return (
    <div className={cn("rounded-[4px] border border-rule-strong bg-paper p-6 text-ink sm:p-8", className)}>
      <div className="flex items-start justify-between gap-4 border-b-[3px] border-ink pb-3">
        <p className="type-ledger text-[1.75rem]">{shop.name}</p>
        <p className="type-header pt-1 text-right text-[0.625rem] leading-snug text-ink-soft">
          Appointment
          <br />
          card
        </p>
      </div>

      <dl className="mt-1">
        <Row label="What" onEdit={edit("service")}>
          {service ? (
            <>
              {service.name}
              {extras.length ? <span className="font-normal text-ink-soft"> + {extras.map((e) => e.name).join(", ")}</span> : null}
              <span className="mt-0.5 block text-[0.9375rem] font-normal text-ink-soft tabular-nums">{formatDuration(duration)}</span>
            </>
          ) : null}
        </Row>

        <Row label="With" onEdit={edit("person")}>
          {staff ? (
            <span className="flex items-center gap-2.5">
              {person?.photo ? (
                <Image src={person.photo} alt="" width={28} height={28} className="size-7 rounded-[3px] object-cover object-top" />
              ) : null}
              <span>
                {person ? person.name : "First available"}
                {staff === "any" && person ? <span className="font-normal text-ink-soft"> (first free)</span> : null}
              </span>
            </span>
          ) : null}
        </Row>

        <Row label="When" onEdit={edit("time")}>
          {day && time !== null ? (
            <>
              {formatDay(day)}
              <span className="mt-0.5 block text-[0.9375rem] font-normal text-ink-soft tabular-nums">
                {formatTime(time)}–{formatTime(time + duration)}
              </span>
            </>
          ) : null}
        </Row>
      </dl>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="type-header text-[0.6875rem] text-ink-soft">Pay at the studio</span>
        <span className="type-figure text-[1.375rem] font-semibold text-ink">
          {total === null ? "–" : total === 0 ? "Free" : `${service?.from ? "from " : ""}${money.format(total)}`}
        </span>
      </div>
      <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-soft">
        Nothing is charged now. Free to change or cancel up to 24 hours before.
      </p>
    </div>
  )
}
