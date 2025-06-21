import type React from "react"

interface WalletRowProps {
  className?: string
  amount: number
  usdValue: number
  formattedAmount: string
  currency: string
  blockchain: string
}

const WalletRow: React.FC<WalletRowProps> = ({
  className,
  amount = 0,
  usdValue = 0,
  formattedAmount = "0.00",
  currency = "",
  blockchain = "",
}) => {
  // Ensure usdValue is a valid number before calling toFixed
  const safeUsdValue = Number.isFinite(usdValue) ? usdValue : 0

  return (
    <div className={className}>
      <div className="flex flex-col">
        <div className="font-medium text-gray-900">
          {currency} ({blockchain})
        </div>
        <div className="text-sm text-gray-500">Amount: {formattedAmount}</div>
      </div>
      <div className="text-right">
        <div className="font-medium text-gray-900">${safeUsdValue.toFixed(2)}</div>
        <div className="text-sm text-gray-500">USD Value</div>
      </div>
    </div>
  )
}

export default WalletRow
