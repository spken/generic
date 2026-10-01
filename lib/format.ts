import { shop, type Service } from "@/content/shop"

export const money = new Intl.NumberFormat(shop.locale, {
  style: "currency",
  currency: shop.currency,
  maximumFractionDigits: 0,
})

export function formatPrice(service: Pick<Service, "price" | "from">) {
  if (service.price === 0) return "Free"
  return `${service.from ? "from " : ""}${money.format(service.price)}`
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${m} min` : `${h} h`
}
