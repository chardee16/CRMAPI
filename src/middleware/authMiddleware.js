import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  // Expected format: 'Bearer TOKEN'
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Token missing from header' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: 'Invalid or expired token' });
    }

    req.user = decoded; // attach decoded token payload to req.user
    next();
  });
};

export default verifyToken;