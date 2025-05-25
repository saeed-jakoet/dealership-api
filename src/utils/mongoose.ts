import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'db-connection';

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error;
    }
};

export default connectToDatabase;
