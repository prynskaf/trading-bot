import { logMessage } from '../../backend/services/logger';
import { getAllTrades, saveTrade } from '../models/tradeModel';
import { NextResponse } from 'next/server';


// Define the Trade interface here as well or import it from the model
export interface Trade {
    type: string;
    symbol: string;
    price: number;
    amount: number;
    timestamp: Date;
}

// Get Trade History Controller
export async function fetchTradeHistory() {
    try {
       await logMessage('Fetching all trades from the database...');
        const trades = await getAllTrades();
         await logMessage('Fetched trade history successfully.');
        return NextResponse.json(trades);
    } catch (error) {
        if (error instanceof Error) {
           await logMessage(`Error fetching trade history: ${error.message}`);
        } else {
          await  logMessage('Unknown error occurred while fetching trade history.');
        }
        return NextResponse.json({ error: 'Failed to fetch trade history' }, { status: 500 });
    }
}

// Save Trade Controller
export async function executeTrade(order: Trade) {
    try {
         await logMessage(`Saving trade: ${order.type} ${order.symbol} at ${order.price}`);
        await saveTrade(order);
       await logMessage('Trade saved successfully.');
    } catch (error) {
        if (error instanceof Error) {
          await  logMessage(`Error saving trade: ${error.message}`);
        } else {
           await logMessage('Unknown error occurred while saving trade.');
        }
        throw new Error('Failed to save trade');
    }
}
