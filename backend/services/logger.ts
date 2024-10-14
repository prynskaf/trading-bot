// import fs from 'fs';
// import path from 'path';

// // Define log file path
// const logFilePath = path.join(__dirname, '../../logs/trading_bot.log');

// // Ensure the logs directory exists
// const logDir = path.join(__dirname, '../../logs');
// if (!fs.existsSync(logDir)) {
//     fs.mkdirSync(logDir);
// }

// // Asynchronous function to log messages to a file
// export async function logMessage(message: string) {
//     const timestamp = new Date().toISOString();
//     const logEntry = `[${timestamp}] ${message}\n`;

//     console.log('Logging message:', logEntry);  // Print to the console for debugging

//     try {
//         // Use promises for asynchronous file operations
//         await fs.promises.appendFile(logFilePath, logEntry, { encoding: 'utf8' });
//     } catch (err) {
//         console.error('Error writing to log file:', err);  // Print errors to the console
//     }
// }


// import fs from 'fs';
// import path from 'path';

// // Use path.resolve to calculate absolute path
// const logFilePath = path.resolve(__dirname, '../../logs/trading_bot.log');

// // Ensure the logs directory exists
// const logDir = path.resolve(__dirname, '../../logs');
// if (!fs.existsSync(logDir)) {
//     fs.mkdirSync(logDir);
// }

// // Asynchronous function to log messages to a file
// export async function logMessage(message: string) {
//     const timestamp = new Date().toISOString();
//     const logEntry = `[${timestamp}] ${message}\n`;

//     console.log('Logging message:', logEntry);  // Print to the console for debugging
//     console.log(`Log file path: ${logFilePath}`);  // Output log file path for debugging

//     try {
//         // Use promises for asynchronous file operations
//         await fs.promises.appendFile(logFilePath, logEntry, { encoding: 'utf8' });
//         console.log('Log message written to file successfully');  // Confirm success
//     } catch (err) {
//         console.error('Error writing to log file:', err);  // Print errors to the console
//     }
// }



import fs from 'fs';
import path from 'path';

// Use path.resolve to calculate the absolute path from the project root
const logFilePath = path.resolve(process.cwd(), 'logs/trading_bot.log');

// Ensure the logs directory exists
const logDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Asynchronous function to log messages to a file
export async function logMessage(message: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    // console.log('Logging message:', logEntry);  // Print to the console for debugging
    // console.log(`Log file path: ${logFilePath}`);  // Output log file path for debugging

    try {
        // Use promises for asynchronous file operations
        await fs.promises.appendFile(logFilePath, logEntry, { encoding: 'utf8' });
        // console.log('Log message written to file successfully');  // Confirm success
    } catch (err) {
        console.error('Error writing to log file:', err);  // Print errors to the console
    }
}
