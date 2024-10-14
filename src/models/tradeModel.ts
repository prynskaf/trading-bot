import { connectToDB } from '../../backend/db';  // Import connection logic
import { logMessage } from '../../backend/services/logger';

export interface Trade {
    type: string;
    symbol: string;
    price: number;
    amount: number;
    timestamp: Date;
}

// Save a trade to the database
export async function saveTrade(order: Trade): Promise<void> {
    try {
        const db = await connectToDB();
        const tradesCollection = db.collection<Trade>('trades');  

        await tradesCollection.insertOne(order);
        console.log("Trade saved to DB:", order);
        await logMessage(`Trade saved to DB: ${JSON.stringify(order)}`);
    } catch (error) {
        // Type narrowing for error
        if (error instanceof Error) {
            await logMessage(`Error saving trade to DB: ${error.message}`);
            console.error("Error saving trade to DB:", error.message);
        } else {
            await logMessage(`Unknown error saving trade to DB: ${String(error)}`);
            console.error("Unknown error saving trade to DB:", String(error));
        }
        throw new Error('Failed to save trade');
    }
}

// Get all trades from the database
export async function getAllTrades(): Promise<Trade[]> {
    try {
        const db = await connectToDB();
        const tradesCollection = db.collection<Trade>('trades');

        const trades = await tradesCollection.find().toArray();
        console.log("Trades fetched from DB:", trades);
        return trades;
    } catch (error) {
        // Type narrowing for error
        if (error instanceof Error) {
            console.error("Error fetching trades from DB:", error.message);
            throw new Error(`Failed to fetch trades: ${error.message}`);
        } else {
            console.error("Unknown error fetching trades from DB:", String(error));
            throw new Error('Failed to fetch trades due to an unknown error');
        }
    }
}
