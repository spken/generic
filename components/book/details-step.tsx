"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { choiceControl } from "@/components/book/service-step"

export type Details = {
  name: string
  email: string
  phone: string
  notes: string
  firstVisit: boolean
  smsReminder: boolean
}

export const emptyDetails: Details = {
  name: "",
  email: "",
  phone: "",
  notes: "",
  firstVisit: false,
  smsReminder: true,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateDetails(d: Details) {
  const errors: Partial<Record<keyof Details, string>> = {}
  if (d.name.trim().length < 2) errors.name = "Add your name so we know who to expect."
  if (!EMAIL.test(d.email.trim())) errors.email = "Add an email address like name@example.com. Your confirmation goes there."
  const digits = d.phone.replace(/\D/g, "")
  if (d.smsReminder && digits.length < 7) errors.phone = "Add a mobile number for the text reminder, or turn the reminder off."
  else if (d.phone.trim() && digits.length < 7) errors.phone = "That number looks too short. Check it, or leave it empty."
  return errors
}

const labelClass = "type-header text-[0.75rem] text-ink"
const inputClass =
  "h-12 rounded-[3px] border-rule-strong bg-paper px-4 text-[1rem] md:text-[1rem] placeholder:text-ink-meta focus-visible:border-stamp focus-visible:ring-0 aria-invalid:border-destructive"

export function DetailsStep({
  details,
  onChange,
  errors,
}: {
  details: Details
  onChange: (d: Details) => void
  errors: Partial<Record<keyof Details, string>>
}) {
  const set = <K extends keyof Details>(key: K, value: Details[K]) => onChange({ ...details, [key]: value })

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FieldGroup className="gap-6">
        <Field data-invalid={Boolean(errors.name) || undefined}>
          <FieldLabel htmlFor="name" className={labelClass}>
            Name
          </FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            value={details.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          <FieldError id="name-error">{errors.name}</FieldError>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.email) || undefined}>
            <FieldLabel htmlFor="email" className={labelClass}>
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={details.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={Boolean(errors.email) || undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass}
            />
            <FieldError id="email-error">{errors.email}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.phone) || undefined}>
            <FieldLabel htmlFor="phone" className={labelClass}>
              Mobile <span className="text-ink-meta">{details.smsReminder ? "" : "(optional)"}</span>
            </FieldLabel>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+41 79 000 00 00"
              value={details.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone) || undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`${inputClass} type-figure`}
            />
            <FieldError id="phone-error">{errors.phone}</FieldError>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="notes" className={labelClass}>
            Anything we should know? <span className="text-ink-meta">(optional)</span>
          </FieldLabel>
          <Textarea
            id="notes"
            rows={3}
            value={details.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Access needs, what you have in mind, a photo you'll bring…"
            className="min-h-28 rounded-[3px] border-rule-strong bg-paper px-4 py-3 text-[1rem] md:text-[1rem] placeholder:text-ink-meta focus-visible:border-stamp focus-visible:ring-0"
          />
        </Field>

        <div className="grid gap-4 border-t border-rule-strong pt-6">
          <Field orientation="horizontal" className="items-start gap-3">
            <Checkbox
              id="sms"
              checked={details.smsReminder}
              onCheckedChange={(v) => set("smsReminder", Boolean(v))}
              className={`${choiceControl} mt-0.5 rounded-[3px]`}
            />
            <FieldContent>
              <FieldLabel htmlFor="sms" className="text-[1rem] font-semibold text-ink">
                Text me a reminder the day before
              </FieldLabel>
            </FieldContent>
          </Field>
          <Field orientation="horizontal" className="items-start gap-3">
            <Checkbox
              id="first"
              checked={details.firstVisit}
              onCheckedChange={(v) => set("firstVisit", Boolean(v))}
              className={`${choiceControl} mt-0.5 rounded-[3px]`}
            />
            <FieldContent>
              <FieldLabel htmlFor="first" className="text-[1rem] font-semibold text-ink">
                This is my first visit
              </FieldLabel>
              <FieldDescription className="text-[0.9375rem] text-ink-soft">
                We&rsquo;ll leave a few extra minutes to talk it through.
              </FieldDescription>
            </FieldContent>
          </Field>
        </div>

        <p className="text-[0.875rem] leading-relaxed text-ink-meta">
          By confirming you agree to the studio&rsquo;s cancellation policy: free up to 24 hours before.
        </p>
      </FieldGroup>
    </form>
  )
}
