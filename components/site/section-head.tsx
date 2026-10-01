import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** A section head: heading with a short note directly beneath it. Space, not rules, opens the section. */
export function SectionHead({
  id,
  title,
  children,
  className,
}: {
  id: string
  title: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative", className)}>
      <h2 id={`${id}-title`} className="type-ledger text-[clamp(2.75rem,6vw,4.75rem)] text-ink">
        {title}
      </h2>
      {children ? (
        <div className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]">
          {children}
        </div>
      ) : null}
    </div>
  )
}
