// server.js

import express from 'express';
import cors from 'cors';
import { connectToMongoDB } from './mongoDBService'; // Import the MongoDB connection function

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Define route to handle /api/data endpoint
app.get('/api/data', (req, res) => {
    // Dummy data
    const dummyData = {
        message: 'This is dummy data from the server!'
    };

    res.json(dummyData);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToMongoDB(); // Call the MongoDB connection function when the server starts
});
