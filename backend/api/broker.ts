import ccxt from 'ccxt';
import { logMessage } from '../services/logger';  // Import logger

// Ensure environment variables exist
if (!process.env.BINANCE_API_KEY || !process.env.BINANCE_API_SECRET) {
    throw new Error('Please define BINANCE_API_KEY and BINANCE_API_SECRET in your environment variables');
}

// Define the broker instance
const broker = new ccxt.binance({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_API_SECRET,
});

// Fetch Gold price (XAU/USD)
export async function getGoldPrice(): Promise<ReturnType<typeof broker.fetchTicker>> {
    try {
       await logMessage('Fetching Gold price from Binance...');
        const ticker = await broker.fetchTicker('XAU/USD');
       await   logMessage(`Gold price fetched successfully: ${ticker.last}`);
        return ticker;
    } catch (error) {
        if (error instanceof Error) {
         await   logMessage(`Error fetching Gold price: ${error.message}`);
        } else {
          await  logMessage('Unknown error occurred while fetching Gold price.');
        }
        throw new Error(`Error fetching Gold price: ${String(error)}`);
    }
}

// Place a Buy Order
export async function placeBuyOrder(symbol: string, amount: number): Promise<ReturnType<typeof broker.createMarketBuyOrder>> {
    try {
       await logMessage(`Placing Buy order for ${symbol} with amount ${amount}...`);
        const order = await broker.createMarketBuyOrder(symbol, amount);
       await logMessage(`Buy order executed successfully at price ${order.price}`);
        return order;
    } catch (error) {
        if (error instanceof ccxt.RateLimitExceeded) {
            await logMessage('Rate limit exceeded for Binance API during Buy order.');
        } else if (error instanceof Error) {
            await logMessage(`Error placing Buy order: ${error.message}`);
        } else {
            await logMessage('Unknown error occurred while placing Buy order.');
        }
        throw new Error(`Error placing Buy order: ${String(error)}`);
    }
}

// Place a Sell Order
export async function placeSellOrder(symbol: string, amount: number): Promise<ReturnType<typeof broker.createMarketSellOrder>> {
    try {
      await  logMessage(`Placing Sell order for ${symbol} with amount ${amount}...`);
        const order = await broker.createMarketSellOrder(symbol, amount);
       await logMessage(`Sell order executed successfully at price ${order.price}`);
        return order;
    } catch (error) {
        if (error instanceof ccxt.RateLimitExceeded) {
            await logMessage('Rate limit exceeded for Binance API during Sell order.');
        } else if (error instanceof Error) {
            await logMessage(`Error placing Sell order: ${error.message}`);
        } else {
            await logMessage('Unknown error occurred while placing Sell order.');
        }
        throw new Error(`Error placing Sell order: ${String(error)}`);
    }
}

// Simulate Buy Order (without real execution)
export async function simulateBuyOrder(symbol: string, amount: number) {
    await logMessage(`Simulating Buy order for ${symbol} with amount ${amount}...`);
    const simulatedOrder = {
        price: 1800.00,  // Simulated price
        amount: amount,
        timestamp: Date.now(),  // Simulated timestamp
    };
    await logMessage(`Simulated Buy order at price ${simulatedOrder.price}`);
    return simulatedOrder;
}

// Simulate Sell Order (without real execution)
export async function simulateSellOrder(symbol: string, amount: number) {
    await logMessage(`Simulating Sell order for ${symbol} with amount ${amount}...`);
    const simulatedOrder = {
        price: 1820.00,  // Simulated price
        amount: amount,
        timestamp: Date.now(),  // Simulated timestamp
    };
    await logMessage(`Simulated Sell order at price ${simulatedOrder.price}`);
    return simulatedOrder;
}
