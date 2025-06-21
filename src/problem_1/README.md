# Sum to N Calculator

This is a simple web application built with [Next.js](https://nextjs.org/) and [React](https://react.dev/) that demonstrates three different ways to
calculate the sum of the first N integers. The user can input a number, and the application will display the result calculated by each of the three
methods.

The application is styled using [Tailwind CSS](https://tailwindcss.com/) and uses the [Ant Design](https://ant.design/) `Input` component for the
number input.

## Features

- Calculates the sum of integers from 1 to a given number `n`.
- Implements three different algorithms for the calculation:
    - **Method A:** Iterative approach using a `for` loop.
    - **Method B:** Efficient calculation using the mathematical formula `n * (n + 1) / 2`.
    - **Method C:** Recursive approach.
- Displays the results from all three methods for comparison.
- Shows the underlying JavaScript code for each implementation.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or yarn/pnpm) installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/quyenngthmy/code-challenge.git
   ```
2. Navigate to the project directory:
   ```sh
   cd src/problem_1
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```

### Running the Application

1. Run the development server:
   ```sh
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Code Overview

The main logic is contained within the `single-input.tsx` component.

### Summation Functions

Three different TypeScript functions are defined to calculate the sum:

1. **`sum_to_n_a(n)`**: Uses a simple `for` loop to iterate from 1 to `n` and accumulate the sum.
   ```typescript
   var sum_to_n_a = (n: number): number => {
     let sum = 0;
     for (let i = 1; i <= n; i++) {
       sum += i;
     }
     return sum;
   };
   ```

2. **`sum_to_n_b(n)`**: Uses the direct mathematical formula for the sum of an arithmetic series. This is the most efficient method.
   ```typescript
   var sum_to_n_b = (n: number): number => {
     return (n * (n + 1)) / 2;
   };
   ```

3. **`sum_to_n_c(n)`**: Uses recursion. It calls itself with a decremented value until it reaches the base case (`n <= 1`).
   ```typescript
   var sum_to_n_c = (n: number): number => {
     if (n <= 1) return n;
     return n + sum_to_n_c(n - 1);
   };
   ```