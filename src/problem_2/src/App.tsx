import { useState, useEffect, useCallback } from "react"
import {
    Card,
    Form,
    InputNumber,
    Select,
    Button,
    Typography,
    Space,
    Divider,
    message,
    Spin,
    Avatar,
    Row,
    Col,
    Alert,
} from "antd"
import { SwapOutlined, ArrowDownOutlined, WalletOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select

interface TokenPrice {
    currency: string
    date: string
    price: number
}

interface SwapFormData {
    fromToken: string
    toToken: string
    fromAmount: number
    toAmount: number
}

export default function CurrencySwapForm() {
    const [form] = Form.useForm<SwapFormData>()
    const [tokenPrices, setTokenPrices] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(true)
    const [swapping, setSwapping] = useState(false)
    const [fromAmount, setFromAmount] = useState<number>(0)
    const [toAmount, setToAmount] = useState<number>(0)
    const [fromToken, setFromToken] = useState<string>("")
    const [toToken, setToToken] = useState<string>("")
    const [exchangeRate, setExchangeRate] = useState<number>(0)
    const [messageApi, contextHolder] = message.useMessage();

    // Available tokens with their symbols and names
    const tokenList = [
        { symbol: "SWTH", name: "Switcheo" },
        { symbol: "ETH", name: "Ethereum" },
        { symbol: "BTC", name: "Bitcoin" },
        { symbol: "USDC", name: "USD Coin" },
        { symbol: "USDT", name: "Tether" },
        { symbol: "BNB", name: "Binance Coin" },
        { symbol: "ADA", name: "Cardano" },
        { symbol: "DOT", name: "Polkadot" },
        { symbol: "MATIC", name: "Polygon" },
        { symbol: "AVAX", name: "Avalanche" },
    ]

    // Fetch token prices
    useEffect(() => {
        const fetchPrices = async () => {
            try {
                setLoading(true)
                const response = await fetch("https://interview.switcheo.com/prices.json")
                const data: TokenPrice[] = await response.json()

                // Convert array to object with latest prices
                const priceMap: Record<string, number> = {}
                data.forEach((item) => {
                    if (!priceMap[item.currency] || new Date(item.date) > new Date(priceMap[item.currency + "_date"])) {
                        priceMap[item.currency] = item.price
                        priceMap[item.currency + "_date"] = Number(item.date)
                    }
                })

                // Clean up date entries
                Object.keys(priceMap).forEach((key) => {
                    if (key.endsWith("_date")) {
                        delete priceMap[key]
                    }
                })

                setTokenPrices(priceMap)

                // Set default tokens if prices are available
                const availableTokens = tokenList.filter((token) => priceMap[token.symbol])
                if (availableTokens.length >= 2) {
                    setFromToken(availableTokens[0].symbol)
                    setToToken(availableTokens[1].symbol)
                    form.setFieldsValue({
                        fromToken: availableTokens[0].symbol,
                        toToken: availableTokens[1].symbol,
                    })
                }
            } catch (error) {
                console.error("Failed to fetch prices:", error)
                message.error("Failed to load token prices")
            } finally {
                setLoading(false)
            }
        }

        fetchPrices()
    }, [form])

    // Calculate exchange rate and amounts
    const calculateExchange = useCallback(() => {
        if (fromToken && toToken && tokenPrices[fromToken] && tokenPrices[toToken]) {
            const rate = tokenPrices[fromToken] / tokenPrices[toToken]
            setExchangeRate(rate)

            if (fromAmount > 0) {
                const calculatedToAmount = fromAmount * rate
                setToAmount(Number(calculatedToAmount.toFixed(8)))
                form.setFieldValue("toAmount", Number(calculatedToAmount.toFixed(8)))
            }
        }
    }, [fromToken, toToken, tokenPrices, fromAmount, form])

    useEffect(() => {
        calculateExchange()
    }, [calculateExchange])

    // Handle amount changes
    const handleFromAmountChange = (value: number | null) => {
        const amount = value || 0
        setFromAmount(amount)

        if (exchangeRate > 0) {
            const calculatedToAmount = amount * exchangeRate
            setToAmount(Number(calculatedToAmount.toFixed(8)))
            form.setFieldValue("toAmount", Number(calculatedToAmount.toFixed(8)))
        }
    }

    const handleToAmountChange = (value: number | null) => {
        const amount = value || 0
        setToAmount(amount)

        if (exchangeRate > 0) {
            const calculatedFromAmount = amount / exchangeRate
            setFromAmount(Number(calculatedFromAmount.toFixed(8)))
            form.setFieldValue("fromAmount", Number(calculatedFromAmount.toFixed(8)))
        }
    }

    // Handle token selection
    const handleFromTokenChange = (value: string) => {
        setFromToken(value)
        if (value === toToken) {
            // Swap tokens if same token selected
            setToToken(fromToken)
            form.setFieldValue("toToken", fromToken)
        }
    }

    const handleToTokenChange = (value: string) => {
        setToToken(value)
        if (value === fromToken) {
            // Swap tokens if same token selected
            setFromToken(toToken)
            form.setFieldValue("fromToken", toToken)
        }
    }

    // Swap tokens
    const handleSwapTokens = () => {
        const tempToken = fromToken
        const tempAmount = fromAmount

        setFromToken(toToken)
        setToToken(tempToken)
        setFromAmount(toAmount)
        setToAmount(tempAmount)

        form.setFieldsValue({
            fromToken: toToken,
            toToken: tempToken,
            fromAmount: toAmount,
            toAmount: tempAmount,
        })
    }

    // Handle form submission
    const handleSwap = async (values: SwapFormData) => {
        try {
            setSwapping(true)

            await new Promise((resolve) => setTimeout(resolve, 2000))

            messageApi.open({
                type: 'success',
                content: `Successfully swapped ${values.fromAmount} ${values.fromToken} for ${values.toAmount} ${values.toToken}`,
                duration: 2,
            });

            // Reset form
            form.resetFields(['fromAmount', 'toAmount'])
            setFromAmount(0)
            setToAmount(0)
        } catch {
            messageApi.open({
                type: 'error',
                content:"Swap failed. Please try again.",
                duration: 2,
            });
        } finally {
            setSwapping(false)
        }
    }

    // Get token icon URL
    const getTokenIcon = (symbol: string) => {
        return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`
    }

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: "linear-gradient(to bottom right, #f6ffed, #dcfce7)" }}
            >
                <Card className="w-full max-w-md">
                    <div className="text-center py-8">
                        <Spin size="large" />
                        <div className="mt-4">
                            <Text>Loading token prices...</Text>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-4" style={{ background: "linear-gradient(to bottom right, #f6ffed, #dcfce7)" }}>
            {contextHolder}
            <div className="max-w-[600px] mx-auto pt-8">
                <Card className="shadow-xl border-0" style={{ borderRadius: "16px" }}>
                    <div className="text-center mb-6">
                        <Title level={3} className="mb-2 flex items-center justify-center gap-2">
                            <WalletOutlined style={{ color: "#389e0d" }} />
                            Currency Swap
                        </Title>
                        <Text type="secondary">Swap your tokens instantly at the best rates</Text>
                    </div>

                    {tokenList.length < 2 && (
                        <Alert
                            message="Insufficient token data"
                            description="Not enough tokens with price data available for swapping."
                            type="warning"
                            className="mb-4"
                        />
                    )}

                    <Form form={form} onFinish={handleSwap} layout="vertical" disabled={tokenList.length < 2}>
                        {/* From Token Section */}
                        <div style={{ backgroundColor: "#f6ffed", borderRadius: "8px", padding: "16px", marginBottom: "8px" }}>
                            <div  className={'grid grid-cols-1 gap-2 md:grid-cols-3'}>
                                <Form.Item
                                    label="From"
                                    name="fromToken"
                                    rules={[{ required: true, message: "Please select a token" }]}
                                >
                                    <Select placeholder="Select token" onChange={handleFromTokenChange} size="large">
                                        {tokenList.map((token) => (
                                            <Option key={token.symbol} value={token.symbol}>
                                                <Space>
                                                    <Avatar size="small" src={getTokenIcon(token.symbol)} alt={token.symbol} />
                                                    {token.symbol}
                                                </Space>
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Amount"
                                    name="fromAmount"
                                    className={'col-span-2'}
                                    rules={[
                                        { required: true, message: "Please enter an amount" },
                                        { type: "number", min: 0.00000001, message: "Amount must be greater than 0" },
                                    ]}
                                >
                                    <InputNumber
                                        placeholder="0.00"
                                        size="large"
                                        style={{ width: "100%" }}
                                        onChange={handleFromAmountChange}
                                        precision={8}
                                        min={0}
                                    />
                                </Form.Item>
                            </div>
                            {fromToken && tokenPrices[fromToken] && (
                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                    ≈ ${(fromAmount * tokenPrices[fromToken]).toFixed(2)} USD
                                </Text>
                            )}
                        </div>

                        {/* Swap Button */}
                        <div className="text-center my-4">
                            <Button
                                type="text"
                                icon={<ArrowDownOutlined />}
                                onClick={handleSwapTokens}
                                style={{
                                    border: "1px solid #d9d9d9",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                disabled={!fromToken || !toToken}
                            />
                        </div>

                        {/* To Token Section */}
                        <div style={{ backgroundColor: "#f6ffed", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
                            <div className={'grid grid-cols-1 gap-2 md:grid-cols-3'}>
                                    <Form.Item label="To" name="toToken" rules={[{ required: true, message: "Please select a token" }]}>
                                        <Select placeholder="Select token" onChange={handleToTokenChange} size="large">
                                            {tokenList.map((token) => (
                                                <Option key={token.symbol} value={token.symbol}>
                                                    <Space>
                                                        <Avatar size="small" src={getTokenIcon(token.symbol)} alt={token.symbol} />
                                                        {token.symbol}
                                                    </Space>
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Amount" name="toAmount" className={'col-span-2'}>
                                        <InputNumber
                                            placeholder="0.00"
                                            size="large"
                                            style={{ width: "100%" }}
                                            onChange={handleToAmountChange}
                                            precision={8}
                                            min={0}
                                        />
                                    </Form.Item>
                            </div>
                            {toToken && tokenPrices[toToken] && (
                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                    ≈ ${(toAmount * tokenPrices[toToken]).toFixed(2)} USD
                                </Text>
                            )}
                        </div>

                        {/* Exchange Rate */}
                        {fromToken && toToken && exchangeRate > 0 && (
                            <div style={{ backgroundColor: "#f6ffed", borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Text strong>Exchange Rate</Text>
                                    </Col>
                                    <Col>
                                        <Text>
                                            1 {fromToken} = {exchangeRate.toFixed(8)} {toToken}
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                        )}

                        <Divider />

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={swapping}
                                disabled={!fromToken || !toToken || fromAmount <= 0}
                                icon={<SwapOutlined />}
                                style={{ height: "48px", fontSize: "16px", fontWeight: "600" }}
                            >
                                {swapping ? "Swapping..." : "Swap Tokens"}
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
        </div>
    )
}
