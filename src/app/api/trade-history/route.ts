import { fetchTradeHistory } from '@/controllers/tradeController';

export async function GET() {
    try {
        return await fetchTradeHistory();
    } catch (error) {
        console.error("Error fetching trade history:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch trade history' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
