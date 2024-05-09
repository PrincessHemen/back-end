// mongoDBService.js

// import mongoose from 'mongoose' and dotenv from 'dotenv';

const dotenv = require('dotenv')

dotenv.config();

const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const uri = process.env.DB
        // Use the MongoDB connection string from the env file

        await mongoose.connect(uri, {
            // useUnifiedTopology: true,z
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

module.exports = connectToMongoDB;
