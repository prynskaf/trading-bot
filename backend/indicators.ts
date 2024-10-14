// Calculate Simple Moving Average (SMA)
export function calculateMovingAverage(prices: number[], period: number): number {
    if (prices.length < period) {
        throw new Error(`Not enough data to calculate the moving average. Received ${prices.length} prices, but the period is ${period}`);
    }

    const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
    return sum / period;
}

// Calculate Relative Strength Index (RSI)
export function calculateRSI(prices: number[], period: number): number {
    if (prices.length < period + 1) {
        throw new Error(`Not enough data to calculate RSI. Need at least ${period + 1} prices.`);
    }

    let gains = 0;
    let losses = 0;

    for (let i = prices.length - period; i < prices.length - 1; i++) {
        const difference = prices[i + 1] - prices[i];
        if (difference > 0) {
            gains += difference;
        } else {
            losses -= difference;  // Losses are represented as positive numbers
        }
    }

    const averageGain = gains / period;
    const averageLoss = losses / period;

    // Edge case: avoid division by zero for the RSI calculation
    if (averageLoss === 0) {
        return 100;  // No losses mean RSI is 100
    }

    const relativeStrength = averageGain / averageLoss;
    const rsi = 100 - (100 / (1 + relativeStrength));

    return rsi;
}
