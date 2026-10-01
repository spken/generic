import type { CSSProperties } from "react"
import type { Metadata, Viewport } from "next"
import { Archivo, Inter_Tight, JetBrains_Mono } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { shop } from "@/content/shop"
import "./globals.css"

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
})

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
})

const ledgerMono = JetBrains_Mono({
  variable: "--font-ledger-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: `${shop.name} | ${shop.booking.label}`,
  description: shop.promise,
  openGraph: {
    title: shop.name,
    description: shop.promise,
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#f3f5f7",
}

const themeVars = {
  "--stamp": shop.theme.stamp,
  "--stamp-ink": shop.theme.stampInk,
} as CSSProperties

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={shop.locale.split("-")[0]} className={`${archivo.variable} ${display.variable} ${ledgerMono.variable} antialiased`} style={themeVars}>
      <body className="min-h-dvh">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
