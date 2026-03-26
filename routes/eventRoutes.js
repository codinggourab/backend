import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
});

// Create event (REAL-TIME)
router.post('/', async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Empty request body" });
    }

    if (req.body.image && req.body.image.startsWith('data:image')) {
      return res.status(400).json({
        error: "Base64 images not allowed. Use image URL."
      });
    }

    const event = await Event.create(req.body);

    // ✅ IMPORTANT FIX
    return res.status(201).json(event);

  } catch (err) {
    console.error("🔥 EVENT ERROR:", err);

    // ✅ ALSO IMPORTANT
    if (!res.headersSent) {
      return res.status(500).json({ error: err.message });
    }
  }
});

export default router;
