import { config } from "./config.js";
import mongoose from "mongoose";

async function connectToDatabase() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToDatabase;