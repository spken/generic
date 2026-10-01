"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Service } from "@/content/shop"
import { formatDuration, formatPrice } from "@/lib/format"

/** Shared look for every choice row in the flow: a ruled card that takes the stamp when chosen. */
export const choiceCard =
  "rounded-[4px] transition-colors duration-200 has-[>[data-slot=field]]:rounded-[4px] has-[>[data-slot=field]]:border-rule-strong has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:border-ink/60 has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-transparent has-[>[data-slot=field]]:has-data-checked:border-stamp has-[>[data-slot=field]]:has-data-checked:bg-stamp-wash *:data-[slot=field]:p-4 sm:*:data-[slot=field]:p-5"

/** Radio and checkbox controls in the stamp ink, sized for thumbs. */
export const choiceControl = "size-5 border-rule-strong bg-paper data-checked:border-stamp data-checked:bg-stamp"

export function ServiceStep({
  services,
  addOns,
  serviceId,
  selectedAddOns,
  onService,
  onAddOns,
}: {
  services: Service[]
  addOns: Service[]
  serviceId: string | null
  selectedAddOns: string[]
  onService: (id: string) => void
  onAddOns: (ids: string[]) => void
}) {
  return (
    <div className="space-y-12">
      <FieldSet>
        <FieldLegend className="sr-only">Service</FieldLegend>
        <RadioGroup value={serviceId ?? ""} onValueChange={(v) => onService(String(v))} className="gap-2.5">
          {services.map((service) => (
            <FieldLabel key={service.id} htmlFor={`service-${service.id}`} className={choiceCard}>
              <Field orientation="horizontal" className="items-start gap-4">
                <RadioGroupItem value={service.id} id={`service-${service.id}`} className={`${choiceControl} mt-0.5`} />
                <FieldContent className="gap-1.5">
                  <FieldTitle className="w-full justify-between gap-4 text-[1.1875rem] leading-tight font-semibold tracking-[-0.01em] text-ink">
                    <span>{service.name}</span>
                    <span className="type-figure shrink-0 text-[1.0625rem]">{formatPrice(service)}</span>
                  </FieldTitle>
                  <FieldDescription className="text-[0.9375rem] leading-relaxed text-ink-soft">
                    {service.description}
                  </FieldDescription>
                  <span className="text-[0.875rem] text-ink-meta tabular-nums">{formatDuration(service.duration)}</span>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </FieldSet>

      {addOns.length ? (
        <FieldSet>
          <FieldLegend className="type-header mb-0 w-full border-b border-rule-strong pb-3 text-ink data-[variant=legend]:text-[0.8125rem]">
            Anything to add?
          </FieldLegend>
          <FieldDescription className="text-[0.9375rem] text-ink-soft [[data-variant=legend]+&]:mt-1">
            Optional extras, added to the end of your appointment.
          </FieldDescription>
          <div className="grid gap-2.5">
            {addOns.map((addOn) => {
              const checked = selectedAddOns.includes(addOn.id)
              return (
                <FieldLabel key={addOn.id} htmlFor={`addon-${addOn.id}`} className={choiceCard}>
                  <Field orientation="horizontal" className="items-start gap-4">
                    <Checkbox
                      id={`addon-${addOn.id}`}
                      checked={checked}
                      onCheckedChange={(next) =>
                        onAddOns(next ? [...selectedAddOns, addOn.id] : selectedAddOns.filter((id) => id !== addOn.id))
                      }
                      className={`${choiceControl} mt-0.5 rounded-[3px]`}
                    />
                    <FieldContent className="gap-1.5">
                      <FieldTitle className="w-full justify-between gap-4 text-[1.0625rem] font-semibold text-ink">
                        <span>{addOn.name}</span>
                        <span className="shrink-0 text-[0.9375rem]">
                          <span className="type-figure">+{formatPrice(addOn)}</span>
                          <span className="font-normal text-ink-soft tabular-nums"> · {formatDuration(addOn.duration)}</span>
                        </span>
                      </FieldTitle>
                      <FieldDescription className="text-[0.9375rem] text-ink-soft">{addOn.description}</FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              )
            })}
          </div>
        </FieldSet>
      ) : null}
    </div>
  )
}
