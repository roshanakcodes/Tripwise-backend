const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    destinationId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', itinerarySchema);