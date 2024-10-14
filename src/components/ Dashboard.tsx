'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Trade interface
interface Trade {
    type: string;
    symbol: string;
    price: number;
    timestamp: string;
}

const Dashboard = () => {
    const [tradeHistory, setTradeHistory] = useState<Trade[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTradeHistory() {
            try {
                const res = await axios.get('/api/trade-history');
                setTradeHistory(res.data);
            } catch (err: unknown) {
                // Log or handle the error if necessary
                if (err instanceof Error) {
                    console.error(err.message);
                    setError('Failed to fetch trade history: ' + err.message);
                } else {
                    setError('Failed to fetch trade history');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchTradeHistory();
    }, []);

    // Helper function to format the timestamp
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).format(date);
    };

    return (
        <div>
            <h1>Gold Trading Bot Dashboard</h1>
            <h2>Trade History</h2>

            {/* Loading State */}
            {loading && <p>Loading trade history...</p>}

            {/* Error Handling */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display Trade History */}
            {!loading && !error && (
                <ul>
                    {tradeHistory.map((trade, index) => (
                        <li key={index}>
                            {trade.type} {trade.symbol} at {trade.price} on {formatDate(trade.timestamp)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
