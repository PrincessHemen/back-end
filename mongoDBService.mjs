// mongoDBService.js

import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        const uri = import.meta.env.VITE_DB; // Use the MongoDB connection string from the environment

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
        console.error('Mongoose connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
};

export { connectToMongoDB };
