import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { shop } from "@/content/shop"

export function HowItWorks() {
  return (
    <section aria-labelledby="policies-title" className="bg-paper-deep">
      <div className="mx-auto max-w-[90rem] px-(--gutter) py-20 lg:py-32">

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="policies-title" className="type-ledger text-[clamp(2.5rem,4.5vw,3.5rem)] text-ink">
              The small print
            </h2>
            <p className="mt-5 max-w-[34ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]">
              Short, fair and the same for everyone. Anything else, just ask.
            </p>
          </div>
          <Accordion className="lg:col-span-8" aria-labelledby="policies-title">
            {shop.policies.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-b border-rule-strong last:border-b-0">
                <AccordionTrigger className="rounded-none py-5 text-[1.125rem] font-semibold text-ink hover:no-underline hover:text-stamp focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-ink">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[62ch] pb-6 text-[1rem] leading-relaxed text-ink-soft">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
