// cardSchema.js

const mongoose = require('mongoose');

// Define the card schema
const cardSchema = new mongoose.Schema({
    // Define the properties of the card
  name: String,
  imgUrl: String
});

// Export the card model
const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
