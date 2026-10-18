const express = require('express');
const router = express.Router();
const axios = require('axios');

//GET /api/destinations 
router.get('/', async (req, res, next) => {
    try {
        const { city = 'Paris', category = 'interesting_places', sort } = req.query;
        const apiKey = process.env.OPENTRIPMAP_API_KEY;
        const geoRes = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname`, {
            params: { name: city, apikey: apiKey }
        });

        if (!geoRes.data || !geoRes.data.lat) {
            return res.status(404).json({ error: 'City not found or invalid location query.' });
        }

        const { lat, lon } = geoRes.data;

        const placesRes = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius`, {
            params: {
                radius: 10000,
                lat,
                lon,
                kinds: category,
                rate: 2,
                limit: 20,
                apikey: apiKey
            }
        });

        let places = placesRes.data.features.map(place => ({
            id: place.properties.xid,
            name: place.properties.name || 'Unnamed Location',
            category: place.properties.kinds,
            distance: place.properties.dist,
            rate: place.properties.rate
        }));

        
        places = places.filter(p => p.name !== 'Unnamed Location');

        if (sort === 'name') {
            places.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'rate') {
            places.sort((a, b) => b.rate - a.rate);
        }

        res.json({ count: places.length, city, destinations: places });
    } catch (error) {
        next(error);
    }
});

// GET /api/destinations/:id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const apiKey = process.env.OPENTRIPMAP_API_KEY;

        const detailRes = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${id}`, {
            params: { apikey: apiKey }
        });

        if (!detailRes.data || !detailRes.data.name) {
            return res.status(404).json({ error: 'Destination details not found.' });
        }

        const data = detailRes.data;
        res.json({
            id: data.xid,
            name: data.name,
            address: data.address ? `${data.address.road || ''}, ${data.address.city || ''}` : 'Location available in map',
            description: data.wikipedia_extracts ? data.wikipedia_extracts.text : 'No detailed description available.',
            category: data.kinds,
            website: data.otm || ''
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;