"use client"

import dynamic from "next/dynamic"

/** GSAP loads after hydration, so it never delays the first paint or the Book button. */
export const ScrollMotion = dynamic(() => import("@/components/site/scroll-motion-effects"), { ssr: false })
