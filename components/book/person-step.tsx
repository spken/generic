"use client"

import Image from "next/image"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { choiceCard, choiceControl } from "@/components/book/service-step"
import { shop } from "@/content/shop"
import { team, type StaffId } from "@/lib/availability"
import { DAY_LABEL, WEEKDAYS } from "@/lib/hours"
import { cn } from "@/lib/utils"

/** The person's week as in the team table: working days inked, closed days hatched. */
function DayStrip({ days }: { days: readonly string[] }) {
  return (
    <ol aria-hidden className="mt-2 grid w-fit grid-cols-7 gap-0.5">
      {WEEKDAYS.map((day) => (
        <li
          key={day}
          className={cn(
            "type-header flex size-6 items-center justify-center rounded-[2px] text-[0.625rem]",
            days.includes(day) ? "bg-ink text-paper" : shop.hours[day] ? "bg-paper-deep text-ink-meta" : "hatch text-ink-meta"
          )}
        >
          {DAY_LABEL[day].letter}
        </li>
      ))}
    </ol>
  )
}

export function PersonStep({ staff, onStaff }: { staff: StaffId | "any" | null; onStaff: (id: StaffId | "any") => void }) {
  return (
    <FieldSet>
      <FieldLegend className="sr-only">Person</FieldLegend>
      <RadioGroup value={staff ?? ""} onValueChange={(v) => onStaff(String(v))} className="gap-2.5 sm:grid-cols-2">
        <FieldLabel htmlFor="staff-any" className={`${choiceCard} sm:col-span-2`}>
          <Field orientation="horizontal" className="items-center gap-4">
            <RadioGroupItem value="any" id="staff-any" className={choiceControl} />
            <FieldContent className="gap-1">
              <FieldTitle className="text-[1.1875rem] font-semibold text-ink">First available</FieldTitle>
              <FieldDescription className="text-[0.9375rem] text-ink-soft">
                The most times to choose from. Everyone in the book works to the same standard.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>

        {team.map((member) => (
          <FieldLabel key={member.id} htmlFor={`staff-${member.id}`} className={choiceCard}>
            <Field orientation="horizontal" className="items-start gap-4">
              <RadioGroupItem value={member.id} id={`staff-${member.id}`} className={`${choiceControl} mt-0.5`} />
              <FieldContent className="gap-1">
                <FieldTitle className="text-[1.125rem] font-semibold text-ink">
                  {member.name}
                  <span className="type-header text-[0.6875rem] text-ink-soft">{member.role}</span>
                </FieldTitle>
                <FieldDescription className="text-[0.9375rem] leading-snug text-ink-soft">{member.focus}</FieldDescription>
                <p className="sr-only">Works {member.days.map((d) => DAY_LABEL[d].long).join(", ")}.</p>
                <DayStrip days={member.days} />
              </FieldContent>
              <span className="relative size-16 shrink-0 overflow-hidden rounded-[3px] bg-paper-deep">
                {member.photo ? (
                  <Image src={member.photo} alt="" fill sizes="64px" className="object-cover object-top" />
                ) : (
                  <span aria-hidden className="type-ledger flex size-full items-center justify-center text-[1.75rem] text-ink">
                    {member.name.charAt(0)}
                  </span>
                )}
              </span>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
