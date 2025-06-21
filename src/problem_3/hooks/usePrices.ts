"use client"
import { useState } from "react"

export function usePrices(): Record<string, number> {
    const [prices] = useState<Record<string, number>>({
        BTC: 45000,
        ETH: 3000,
        OSMO: 0.5,
        ARB: 1.2,
        ZIL: 0.02,
    })

    return prices
}
