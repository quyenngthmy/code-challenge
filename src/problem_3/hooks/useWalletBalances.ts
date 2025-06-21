"use client"
import { useState } from "react"

interface WalletBalance {
    currency: string
    amount: number
    blockchain: string
    id?: string
}

export function useWalletBalances(): WalletBalance[] {
    const [balances] = useState<WalletBalance[]>([
        { id: "1", currency: "BTC", amount: 1.5, blockchain: "Ethereum" },
        { id: "2", currency: "ETH", amount: 10.2, blockchain: "Ethereum" },
        { id: "3", currency: "OSMO", amount: 500, blockchain: "Osmosis" },
        { id: "4", currency: "ARB", amount: 0, blockchain: "Arbitrum" }, // Zero balance to test filtering
        { id: "5", currency: "ZIL", amount: 1000, blockchain: "Zilliqa" },
    ])

    return balances
}
