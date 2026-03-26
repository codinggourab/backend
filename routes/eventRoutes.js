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
    const event = await Event.create(req.body);

    // ✅ emit to all clients
    const io = req.app.get('io');
    io.emit('new_event', event);

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;