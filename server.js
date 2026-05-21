import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());

app.get("/api/events", async (req, res) => {
  try {
    const keyword = req.query.keyword || "Berlin";

    // Use JSONPlaceholder API (free, no auth required)
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=7`
    );

    // Transform JSONPlaceholder posts into event-like data
    const events = response.data.map((post, index) => {
      // Generate random future dates for events
      const startDate = new Date(2026, 5, Math.floor(Math.random() * 25) + 1);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2);

      return {
        title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Event #${post.id}`,
        description: post.body.substring(0, 120) + "...",
        url: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        image: `https://via.placeholder.com/300x200?text=Event+${post.id}`,
        start: startDate.toISOString(),
        end: endDate.toISOString()
      };
    });

    console.log(`✓ API request for "${keyword}" returning ${events.length} events from JSONPlaceholder`);
    res.json(events);

  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error("API Error:", errorData);

    res.status(500).json({
      error: "Failed to fetch events",
      details: errorData
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});