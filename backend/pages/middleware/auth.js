import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong, randomly generated secret

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // Add userId to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export { generateToken, authenticateToken }; 
