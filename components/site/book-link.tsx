import type { ComponentProps } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { shop } from "@/content/shop"
import { cn } from "@/lib/utils"

type BookLinkProps = Omit<ComponentProps<"a">, "href"> & {
  size?: "stamp" | "stamp-lg"
  variant?: "stamp" | "ledger"
  /** Appended to the booking URL, e.g. a service or team member id. */
  query?: Record<string, string>
}

export function bookingHref(query?: Record<string, string>) {
  if (!query) return shop.booking.url
  return `${shop.booking.url}?${new URLSearchParams(query)}`
}

export function BookLink({
  size = "stamp",
  variant = "stamp",
  query,
  className,
  children = shop.booking.label,
  ...props
}: BookLinkProps) {
  return (
    <Link
      href={bookingHref(query)}
      className={cn(buttonVariants({ variant, size }), "group/book", className)}
      {...props}
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden
        strokeWidth={2.25}
        className="transition-transform duration-300 ease-(--ease-ink) group-hover/book:translate-x-0.5 group-hover/book:-translate-y-0.5"
      />
    </Link>
  )
}
