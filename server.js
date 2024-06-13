const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./mongoDBService');
const Card = require('./models/cardsSchema');

const app = express();

// Define port
const port = process.env.PORT || 5000;

// Set up CORS to allow requests from both localhost and the Vercel app
const allowedOrigins = ['http://localhost:5173', 'https://dating-app-nine-jet.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());

// Routes for getting cards from DB
app.get('/api/data', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/data', async (req, res) => {
    const { name, imgUrl } = req.body;

    try {
        const newCard = new Card({ name, imgUrl });
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

connectToMongoDB()
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        app.listen(port, () => {
            console.log(`Server is running on port ${port} (without MongoDB connection)`);
        });
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;
