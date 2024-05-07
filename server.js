// server.js

const express = require('express');
const cors = require('cors');

const connectToMongoDB = require('./mongoDBService'); // Import the MongoDB connection function

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
    connectToMongoDB; // Call the MongoDB connection function when the server starts
});
