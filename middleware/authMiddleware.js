import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, "secret");

    req.user = decoded; // ✅ IMPORTANT

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

export default authMiddleware; // ✅ THIS LINE FIXES EVERYTHING