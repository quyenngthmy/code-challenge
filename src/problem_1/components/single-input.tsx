"use client"

import {useState} from "react"
import {InputNumber} from "antd";

// Three sum_to_n implementations
var sum_to_n_a = (n: number): number => {
    // Method A: For loop
    let sum = 0
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}

var sum_to_n_b = (n: number): number => {
    // Method B: Mathematical formula
    return (n * (n + 1)) / 2
}

var sum_to_n_c = (n: number): number => {
    // Method C: Recursion
    if (n <= 1) return n
    return n + sum_to_n_c(n - 1)
}

export default function SingleInput() {
    const [value, setValue] = useState<number | null>(null)
    const num = Number(value) || 0

    return (
        <div className="max-w-lg mx-auto p-8 space-y-6">
            <h1 className="text-2xl font-bold text-center">Sum to N Calculator</h1>

            {/* Single Input */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Enter a number:</label>
                <InputNumber
                    min={0}
                    placeholder="Enter number"
                    value={value}
                    onChange={setValue}
                    className="text-lg p-3 w-full"
                />
            </div>

            {/* Three Results */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Results:</h2>

                <div className="grid gap-3">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="font-medium text-blue-800">Method A (Loop)</div>
                        <div className="text-2xl font-bold text-blue-600">{sum_to_n_a(num)}</div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="font-medium text-green-800">Method B (Formula)</div>
                        <div className="text-2xl font-bold text-green-600">{sum_to_n_b(num)}</div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="font-medium text-purple-800">Method C (Recursion)</div>
                        <div className="text-2xl font-bold text-purple-600">{sum_to_n_c(num)}</div>
                    </div>
                </div>
            </div>

            {/* Code Display */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-3">JavaScript Functions:</h3>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{`var sum_to_n_a = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function(n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function(n) {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};`}</pre>
            </div>
        </div>
    )
}
