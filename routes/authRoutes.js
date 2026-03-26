import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ IMPORT THIS

const router = express.Router();

// =====================
// Signup
// =====================
router.post('/signup', async (req, res) => {
  const { name, email, password, type } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    type
  });

  const token = jwt.sign(
    { id: user._id, name: user.name, type: user.type },
    "secret",
    { expiresIn: "7d" }
  );

  res.json({ token, user });
});

// =====================
// Login
// =====================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Wrong password' });

  const token = jwt.sign(
    { id: user._id, name: user.name, type: user.type },
    "secret",
    { expiresIn: "7d" }
  );

  res.json({ token, user });
});

// =====================
// ✅ ADD HERE (OUTSIDE)
// =====================
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;