"use client"

import type { FC } from "react"
import { memo, useMemo } from "react"
import WalletRow from "./wallet-row"
import { useWalletBalances } from "../hooks/useWalletBalances"
import { usePrices } from "../hooks/usePrices"

const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  "Osmosis": 100,
  "Ethereum": 50,
  "Arbitrum": 30,
  "Zilliqa": 20,
  "Neo": 20
}

const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99
}

export interface WalletBalance {
  currency: string
  amount: number
  blockchain: string
  id?: string
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string
  usdValue: number
  priority: number
}

interface WalletPageProps {
  className?: string
}

const MemoizedWalletRow = memo(WalletRow)

const WalletPage: FC<WalletPageProps> = ({ className, ...rest }) => {
  const balances = useWalletBalances()
  const prices = usePrices()

  const processedBalances = useMemo(() => {
    return balances.reduce<FormattedWalletBalance[]>((result, balance) => {
      const priority = getPriority(balance.blockchain)
      
      // Early return if we should filter this item out
      if (priority <= -99 || balance.amount <= 0) return result
      
      const price = prices[balance.currency] ?? 0
      const usdValue = price * balance.amount
      
      result.push({
        ...balance,
        formatted: balance.amount.toFixed(2),
        usdValue,
        priority
      })
      
      return result
    }, []).sort((a, b) => b.priority - a.priority) // Sort by priority descending
  }, [balances, prices])

  return (
    <div className={`bg-white rounded-lg shadow-md ${className || ''}`} {...rest}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Wallet Balances</h2>
      </div>

      {processedBalances.length > 0 ? (
        <div>
          {processedBalances.map((balance, index) => {
            const key = balance.id || `${balance.currency}-${balance.blockchain}-${index}`
            return (
              <MemoizedWalletRow
                className="p-4 border-b border-gray-200 flex justify-between items-center"
                key={key}
                amount={balance.amount}
                usdValue={balance.usdValue}
                formattedAmount={balance.formatted}
                currency={balance.currency}
                blockchain={balance.blockchain}
              />
            )
          })}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">No wallet balances found</div>
      )}
    </div>
  )
}

export default memo(WalletPage)