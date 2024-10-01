import connectDB from '../db';
import { cors, runMiddleware } from '../../middleware/cors';
import { generateToken } from '../../middleware/auth';
import bcrypt from 'bcryptjs'; // Import bcryptjs

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  try {
    const { client, db } = await connectDB(); // Get the database connection
    const usersCollection = db.collection('users'); // Assuming you have a 'users' collection

    if (req.method === 'POST') {
      const { username, password } = req.body;

      // 1. Find the user by username
      const user = await usersCollection.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // 2. Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // 3. If credentials are valid, generate a JWT
      const token = generateToken(user._id.toString()); // Use user._id for the token payload

      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; Path=/;`);
      res.status(200).json({ message: 'Authentication successful', token });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close(); // Consider connection pooling
  }
}
