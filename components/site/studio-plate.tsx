import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { BookLink } from "@/components/site/book-link"
import { shop } from "@/content/shop"

const address = `${shop.contact.street}, ${shop.contact.postcode} ${shop.contact.city}`
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name}, ${address}`)}`

/**
 * A wide print of the room, pressed flat to the page edges as it scrolls in,
 * with a paper label pinned to it: where it is, and the Book stamp.
 */
export function StudioPlate() {
  const { photo, caption } = shop.studio
  if (!photo) return null

  return (
    <section aria-label={caption} className="relative">
      <div data-motion="plate" className="relative aspect-[4/3] overflow-hidden bg-paper-deep sm:aspect-[16/9] lg:aspect-auto lg:h-[min(80svh,52rem)]">
        <Image
          src={photo}
          alt={caption}
          fill
          sizes="100vw"
          data-motion="plate-img"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-[90rem] px-(--gutter) lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-(--gutter)">
        <div className="relative -mt-10 max-w-[27rem] rounded-[4px] bg-paper p-5 sm:p-6 lg:pointer-events-auto lg:mt-0">
          <p className="type-ledger text-[1.5rem] text-ink sm:text-[1.75rem]">{caption}</p>
          <p className="mt-3 border-t border-rule-strong pt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            {address}. {shop.contact.directions}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <BookLink />
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener"
              className="type-header inline-flex h-11 items-center gap-1.5 text-[0.75rem] text-ink underline decoration-ink/30 underline-offset-[0.4em] transition-colors hover:text-stamp hover:decoration-stamp"
            >
              Open in maps
              <ArrowUpRight className="size-3.5" strokeWidth={2.25} aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
