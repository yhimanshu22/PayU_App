import mongoose from 'mongoose';
import 'dotenv/config';
import colors from 'colors'

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MongoDB connection URI is not defined in environment variables.');
    }

    try {
        await mongoose.connect(uri);
        console.log(`MongoDB connected successfully`.bgCyan);
    } catch (err) {
        console.error(`Error connecting to MongoDB:`.bgRed, err.message);
        process.exit(1);
    }
};

export default connectDB;
