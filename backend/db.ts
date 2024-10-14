import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '../config/settings';
import { logMessage } from './services/logger';  // Import the logger

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

// Create a new MongoClient only if it hasn't been created yet
if (!client) {
    client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
} else {
    clientPromise = Promise.resolve(client);
}

// Function to connect to the database
export async function connectToDB() {
    try {
        client = await clientPromise;  // Always wait for the client connection
        await logMessage('Connected to MongoDB successfully.');  // Log successful connection
        return client.db('gold_trading_bot');  // This should match your database name
    } catch (error) {
        if (error instanceof Error) {
           await logMessage(`Error connecting to MongoDB: ${error.message}`);  // Log error
        } else {
           await logMessage(`Unknown error connecting to MongoDB.`);
        }
        throw new Error('Failed to connect to MongoDB');
    }
}
