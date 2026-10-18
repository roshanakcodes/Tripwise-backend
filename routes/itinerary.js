const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// GET /api/itinerary - View all saved itinerary items
router.get('/', async (req, res, next) => {
    try {
        const items = await Itinerary.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        next(error);
    }
});

// POST /api/itinerary - Add destination to itinerary
router.post('/', async (req, res, next) => {
    try {
        const { destinationId, name, category, location, description, notes } = req.body;

        if (!destinationId || !name || !location) {
            return res.status(400).json({ error: 'Missing required fields: destinationId, name, and location are required.' });
        }

        const existingItem = await Itinerary.findOne({ destinationId });
        if (existingItem) {
            return res.status(409).json({ error: 'Destination is already in your itinerary.' });
        }

        const newItem = new Itinerary({ destinationId, name, category, location, description, notes });
        await newItem.save();
        
        res.status(201).json({ message: 'Destination added to itinerary successfully', item: newItem });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/itinerary/:id - Remove destination from itinerary
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedItem = await Itinerary.findOneAndDelete({ destinationId: id });

        if (!deletedItem) {
            return res.status(404).json({ error: 'Itinerary item not found.' });
        }

        res.json({ message: 'Destination removed successfully', id });
    } catch (error) {
        next(error);
    }
});

module.exports = router;