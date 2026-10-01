import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { BookLink } from "@/components/site/book-link"
import { SectionHead } from "@/components/site/section-head"
import { shop, type WorkItem } from "@/content/shop"
import { cn } from "@/lib/utils"

// A fixed rhythm of frames so any six photos compose like a contact sheet.
const LAYOUT = [
  "aspect-[4/5] lg:col-span-5 lg:row-span-2",
  "aspect-[4/3] lg:col-span-4",
  "aspect-[3/4] lg:col-span-3 lg:row-span-2",
  "aspect-[4/3] lg:col-span-4",
  "aspect-[4/3] lg:col-span-8",
  "aspect-square lg:col-span-4",
]

function Crop() {
  // Registration corners, as on a print proof.
  const corner = "absolute size-3 border-ink/50"
  return (
    <span aria-hidden>
      <span className={cn(corner, "top-3 left-3 border-t border-l")} />
      <span className={cn(corner, "top-3 right-3 border-t border-r")} />
      <span className={cn(corner, "bottom-3 left-3 border-b border-l")} />
      <span className={cn(corner, "right-3 bottom-3 border-r border-b")} />
    </span>
  )
}

function Frame({ item, index }: { item: WorkItem; index: number }) {
  return (
    <figure
      data-motion={item.photo ? "print" : undefined}
      className={cn("group/frame relative overflow-hidden bg-paper-deep lg:aspect-auto", LAYOUT[index % LAYOUT.length])}
    >
      {item.photo ? (
        <div data-motion="print-img" className="absolute inset-0">
          <Image
            src={item.photo}
            alt={item.alt ?? item.caption}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-[1.2s] ease-(--ease-ink) group-hover/frame:scale-[1.03]"
          />
        </div>
      ) : (
        <div aria-hidden className="hatch absolute inset-0 opacity-60" />
      )}
      {item.photo ? null : <Crop />}
      <figcaption className="absolute bottom-0 left-0 flex items-center gap-3 bg-paper px-3 py-2 text-[0.8125rem] text-ink">
        <span className="type-figure font-semibold">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-ink-soft">{item.caption}</span>
      </figcaption>
    </figure>
  )
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-[90rem] px-(--gutter) py-20 lg:py-32">
      <SectionHead id="work" title="Recent pages">
        A few recent appointments and a look around the studio. There&rsquo;s more on our Instagram.
      </SectionHead>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:auto-rows-[16rem] lg:grid-cols-12 lg:gap-4">
        {shop.work.map((item, index) => (
          <Frame key={index} item={item} index={index} />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 border-t border-rule-strong pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
        <p className="type-ledger max-w-[22ch] text-[1.75rem] text-ink sm:text-[2rem]">
          Like what you see? The next page of the book is yours.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <BookLink size="stamp-lg" />
          <a
            href={shop.contact.instagram}
            target="_blank"
            rel="noopener"
            className="type-header inline-flex h-11 items-center gap-1.5 text-[0.75rem] text-ink underline decoration-ink/30 underline-offset-[0.4em] transition-colors hover:text-stamp hover:decoration-stamp"
          >
            More on Instagram
            <ArrowUpRight className="size-3.5" strokeWidth={2.25} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
