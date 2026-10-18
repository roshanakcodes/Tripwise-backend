const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const destinationRoutes = require('./routes/destinations');
const itineraryRoutes = require('./routes/itinerary');

app.use('/api/destinations', destinationRoutes);
app.use('/api/itinerary', itineraryRoutes);

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to TripWise Backend API!' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tripwise';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Database connection error:', err));