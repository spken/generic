import { shop } from "@/content/shop"
import { SECTIONS } from "@/lib/sections"

export function Footer() {
  return (
    <footer className="bg-paper pb-28 sm:pb-0">
      <div className="mx-auto max-w-[90rem] px-(--gutter)">
        <p
          aria-hidden
          className="type-ledger -mb-[0.12em] overflow-hidden pt-14 text-[clamp(3.25rem,9vw,5.5rem)] leading-[0.9] whitespace-nowrap text-ink"
        >
          {shop.shortName}
        </p>
        <div className="flex flex-col gap-6 border-t border-rule-strong py-6 text-[0.875rem] text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {shop.name}. {shop.contact.street}, {shop.contact.city}.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-stamp">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={shop.contact.instagram} target="_blank" rel="noopener" className="hover:text-stamp">
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
