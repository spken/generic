"use client"

import { useSyncExternalStore } from "react"
import { shop } from "@/content/shop"
import { shopNow } from "@/lib/hours"

// One shared minute clock for every component that shows "now".
let snapshot: ReturnType<typeof shopNow> | null = null
const listeners = new Set<() => void>()
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  const next = shopNow(shop.timeZone)
  if (!snapshot || next.minutes !== snapshot.minutes || next.weekday !== snapshot.weekday) {
    snapshot = next
    for (const listener of listeners) listener()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!timer) {
    tick()
    timer = setInterval(tick, 15_000)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && timer) {
      clearInterval(timer)
      timer = undefined
    }
  }
}

function getSnapshot() {
  if (!snapshot) snapshot = shopNow(shop.timeZone)
  return snapshot
}

/** The shop's current weekday and minute, or `null` during server render. */
export function useShopNow() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}
