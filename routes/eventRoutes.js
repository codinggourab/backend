import express from 'express';
import Event from '../models/Event.js';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ ADD THIS

const router = express.Router();


// =====================
// ✅ Get all events
// =====================
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🌍 Public events (for explore page)
router.get('/all', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// =====================
// ✅ Create event (with user)
// =====================
router.post('/', authMiddleware, async (req, res) => {
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

    const event = await Event.create({
      ...req.body,
      organizerId: req.user.id,     // 🔥 IMPORTANT
      organizerName: req.user.name  // 🔥 OPTIONAL
    });

    return res.status(201).json(event);

  } catch (err) {
    console.error("🔥 EVENT ERROR:", err);

    if (!res.headersSent) {
      return res.status(500).json({ error: err.message });
    }
  }
});

// =====================
// ✅ Delete event (with user)
// =====================



// DELETE event
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // 🔐 Only organizer can delete
    if (event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await event.deleteOne();

    res.json({ msg: 'Event deleted successfully' });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
export default router;
