// /pages/api/auth/register.js
import connectDB from '../db';
import bcrypt from 'bcryptjs';
import { cors, runMiddleware } from '../../middleware/cors';

export default async (req, res) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      const { client, db } = await connectDB();
      const usersCollection = db.collection('users'); // Assuming a 'users' collection

      const { username, password } = req.body;

      // Check if user already exists
      const existingUser = await usersCollection.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = { username, password: hashedPassword };
      await usersCollection.insertOne(newUser);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    } finally {
      // await client.close(); // Consider connection pooling
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
