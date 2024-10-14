import { executeTrade } from '../../../controllers/tradeController';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const order = await req.json();

        // Add validation if necessary (e.g., check that order contains the required fields)
        if (!order || !order.symbol || !order.amount || !order.price) {
            return NextResponse.json({ error: 'Invalid trade data' }, { status: 400 });
        }

        // Execute the trade
        await executeTrade(order);

        return NextResponse.json({ message: 'Trade executed successfully' });
    } catch (error) {
        console.error("Error executing trade:", error);
        return NextResponse.json({ error: 'Failed to execute trade' }, { status: 500 });
    }
}
