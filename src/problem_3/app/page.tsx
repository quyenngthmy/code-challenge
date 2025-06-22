import WalletPage from "../components/wallet-page"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Wallet Dashboard</h1>
        <WalletPage />
      </div>
    </div>
  )
}
