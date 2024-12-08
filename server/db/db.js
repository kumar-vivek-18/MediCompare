import mongoose from "mongoose";
import colors from 'colors';

/**
 * Function to connect to the MongoDB database using Mongoose.
 * This function uses an async/await pattern to ensure proper error handling.
 */
export const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the connection string from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Log the host to which the connection is established
        console.log("DB connected successfully at host:".yellow.bold, conn.connection.host.yellow.bold);
    } catch (error) {
        // Log an error message if the connection fails
        console.error("Error occurred while connecting to the database:", error.message.red.bold);

        // Optionally, you could terminate the process if the connection fails
        process.exit(1); // Exit the process with a failure code
    }
};
