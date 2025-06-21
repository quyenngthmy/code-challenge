# Crypto Wallet Dashboard

A modern, responsive dashboard application for monitoring cryptocurrency wallet balances across multiple blockchains. Built with Next.js, React,
TypeScript, and Tailwind CSS.

## Features

- Real-time wallet balance display across different blockchains
- Prioritized display of wallet balances based on blockchain importance
- USD value calculation based on current cryptocurrency prices
- Clean, responsive UI built with Tailwind CSS
- Type-safe code with TypeScript

## Tech Stack

- **Framework**: Next.js 15.2.4
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4.17
- **Language**: TypeScript 5
- **Package Manager**: pnpm
- **Component Libraries**:
    - React Hook Form 7.54.1
    - Embla Carousel 8.5.1
    - Recharts 2.15.0
    - Lucide React 0.454.0
    - Sonner 1.7.1

## Project Structure

- `/app` - Next.js application routes and layouts
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks for data fetching and state management
- `/styles` - Global styles and Tailwind configurations

## Key Components

- **WalletPage**: Main component that displays all wallet balances
- **WalletRow**: Component for displaying individual wallet balance information
- **useWalletBalances**: Hook for fetching wallet balance data
- **usePrices**: Hook for fetching cryptocurrency price data

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/quyenngthmy/code-challenge.git
cd src/problem_3

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at http://localhost:3000

### Build for Production

```bash
pnpm build
pnpm start
```

## Development

### Adding New Cryptocurrencies

Update the `useWalletBalances` and `usePrices` hooks to include new cryptocurrency data.

### Blockchain Priority

Blockchain display priority can be modified in the `getPriority` function within the `WalletPage` component.

## License

MIT
