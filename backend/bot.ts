import { getGoldPrice, placeBuyOrder, placeSellOrder, simulateBuyOrder, simulateSellOrder } from './api/broker';
import { calculateMovingAverage, calculateRSI } from './indicators';
import { executeTrade } from '../src/controllers/tradeController';
import { logMessage } from './services/logger';

// Define the structure of a Trade
interface Trade {
    type: string;
    symbol: string;
    price: number;
    amount: number;
    timestamp: Date;
}

// Use a flag to toggle between real and simulated trading
const USE_SIMULATION = process.env.USE_SIMULATION === 'true';

export async function tradeGold(): Promise<void> {
    await logMessage("Starting trade cycle...");

    if (!isWithinTradingHours()) {
        await logMessage("Outside trading hours, stopping trade.");
        return;
    }

    try {
        const priceData = await getGoldPrice();

        if (!priceData || !priceData.close) {
            await logMessage("Invalid price data received. Skipping trade execution.");
            return;
        }

        const closingPrices = Array.isArray(priceData.close) ? priceData.close : [priceData.close as number];
        const ma50 = calculateMovingAverage(closingPrices, 50);
        const ma200 = calculateMovingAverage(closingPrices, 200);
        const rsi = calculateRSI(closingPrices, 14);

        await logMessage(`MA50: ${ma50}, MA200: ${ma200}, RSI: ${rsi}`);

        if (ma50 > ma200 && rsi < 70) {
            let order;
            if (USE_SIMULATION) {
                order = await simulateBuyOrder('XAU/USD', 1);
            } else {
                order = await placeBuyOrder('XAU/USD', 1);
            }

            const trade: Trade = {
                type: 'buy',
                symbol: 'XAU/USD',
                price: order.price,
                amount: order.amount,
                timestamp: new Date(order.timestamp),
            };

            await executeTrade(trade);
            await logMessage(`Buy order executed at ${trade.price}`);
        }

        if (ma50 < ma200 && rsi > 30) {
            let order;
            if (USE_SIMULATION) {
                order = await simulateSellOrder('XAU/USD', 1);
            } else {
                order = await placeSellOrder('XAU/USD', 1);
            }

            const trade: Trade = {
                type: 'sell',
                symbol: 'XAU/USD',
                price: order.price,
                amount: order.amount,
                timestamp: new Date(order.timestamp),
            };

            await executeTrade(trade);
            await logMessage(`Sell order executed at ${trade.price}`);
        }

    } catch (error) {
        if (error instanceof Error) {
            await logMessage(`Error during trade execution: ${error.message}`);
        } else {
            await logMessage(`Unknown error during trade execution.`);
        }
    }
}


function isWithinTradingHours(): boolean {
    const now = new Date();
    const currentHour = now.getUTCHours();
    return (currentHour >= 8 && currentHour < 16) || (currentHour >= 13 && currentHour < 21);  // London & New York sessions
}

// Execute the trading function immediately and at intervals
(async () => {
    await tradeGold(); // Run once immediately
    setInterval(async () => {
        await tradeGold();
    }, 15 * 60 * 1000);  // Every 15 minutes
})();



// Test trade function
async function testTrade() {
    const trade: Trade = {
        type: 'buy',
        symbol: 'XAU/USD',
        price: 1800,
        amount: 1,
        timestamp: new Date(),
    };
    await executeTrade(trade);
    await logMessage('Test trade executed.');
}

// Call the test trade function
testTrade();
