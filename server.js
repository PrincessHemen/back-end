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

// Call the MongoDB connection function when the server starts
connectToMongoDB()
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the Express server only after successfully connecting to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        // Still start the server even if MongoDB connection fails
        app.listen(port, () => {
            console.log(`Server is running on port ${port} (without MongoDB connection)`);
        });
    });

// Error handling middleware to catch any unhandled errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;

//server.close(() => {
   // process.exit(1);
 // });