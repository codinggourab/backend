import express from 'express';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';

const router = express.Router();

// ✅ CREATE registration
router.post('/', async (req, res) => {
  const registration = await Registration.create(req.body);

  await Event.findByIdAndUpdate(req.body.eventId, {
    $inc: { registrationCount: 1 }
  });

  res.json(registration);
});

// ✅ GET ALL registrations (for organizer dashboard)
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('eventId'); // 🔥 important

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch registrations' });
  }
});

export default router;