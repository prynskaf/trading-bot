export const BINANCE_API_KEY = process.env.BINANCE_API_KEY as string;
export const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET as string;
export const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
