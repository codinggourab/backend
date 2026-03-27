import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader); // 👈 DEBUG

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
}
