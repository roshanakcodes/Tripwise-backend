# Tripwise-backend
Backend of Tripwise- REST API, you can discover places to travel(External API), search, save, retrieve and delete your travel Iterineries)

# Technologies Used
 * Runtime: Node.js
 * Framework: Express.js
 * Database & ODM: MongoDB & Mongoose
 * HTTP Client: Axios (for external API communication)
# API Details: 
The backend integrates with the OpenTripMap API as the primary external data source for destination discovery. Below are the documented endpoints, parameters, and example bodies.
1. Get Destinations (Search, Filter, and Sort)
 * Endpoint: GET /api/destinations
 * Description: Retrieves destination data from the external API based on city, category filtering, and server-side sorting.
 * Query Parameters:
   * city (string, optional) — City name (default: Paris)
   * category (string, optional) — Place categories (e.g., museums, cultural)
   * sort (string, optional) — Sorting option (name or rate)
 * Example Request:
   GET /api/destinations?city=London&category=museums&sort=rate

 * Example Response:
   {
  "count": 1,
  "city": "London",
  "destinations": [
    {
      "id": "Q84",
      "name": "British Museum",
      "category": "museums,cultural",
      "distance": 120,
      "rate": 3
    }
  ]
}

2. Get Destination Details
 * Endpoint: GET /api/destinations/:id
 * Description: Fetches comprehensive information about a specific destination using its unique ID.
 * Example Request:
   GET /api/destinations/1

 * Example Response:
   {
  "id": "1",
  "name": "British Museum",
  "address": "Great Russell St, London",
  "description": "The British Museum is a public museum dedicated to human history, art and culture.",
  "category": "museums",
  "website": "https://opentripmap.com/card/Q84"
}

3. View Itinerary
 * Endpoint: GET /api/itinerary
 * Description: Retrieves all saved destinations in the user's itinerary from the database.
 * Example Response:
   [
  {
    "destinationId": "1",
    "name": "British Museum",
    "category": "museums",
    "location": "London",
    "description": "Museum of human history.",
    "createdAt": "2026-10-18T10:00:00.000Z"
  }
]

4. Add to Itinerary
 * Endpoint: POST /api/itinerary
 * Description: Adds a destination to the persistent itinerary database.
 * Example Request Body:
   {
  "destinationId": "1",
  "name": "British Museum",
  "category": "museums",
  "location": "London",
  "description": "Museum of human history."
}

 * Example Response:
   {
  "message": "Destination added to itinerary successfully",
  "item": {
    "destinationId": "1",
    "name": "British Museum",
    "category": "museums",
    "location": "London"
  }
}

5. Remove from Itinerary
 * Endpoint: DELETE /api/itinerary/:id
 * Description: Deletes a specific destination from the saved itinerary database.
 * Example Request:
   DELETE /api/itinerary/1

 * Example Response:
   {
  "message": "Destination removed successfully",
  "id": "1"
}

Database Configuration
 * Database Provider: MongoDB Atlas (M0 Free Tier cluster)
 * Persistence: Itinerary data is permanently stored via Mongoose schemas to ensure saved items remain available between requests and server reboots.
 * Connection String Format: Stored securely in environment variables as MONGO_URI.

 * Install Dependencies:
   npm install

 * Configure Environment Variables:
   Create a .env file in the root directory and add the following keys:
   PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENTRIPMAP_API_KEY=your_opentripmap_api_key

 * Run the Server:
   * For Development (with nodemon):
     npm run dev

   * For Production:
     npm start

Live Deployment Link
 * Access Live Backend API Here - 

