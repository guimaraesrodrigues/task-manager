// /pages/api/tasks/index.js (Example protected route)
// import Task from '../models/Task'; // Assuming you have a Task model
// import jwt from 'jsonwebtoken';

// export default async (req, res) => {
//   try {
//     await connectDB();

//     // Get token from cookie or Authorization header
//     const token = req.cookies.token || req.headers.authorization.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decodedToken.userId;

//     // Now you have the userId, you can fetch tasks for this user
//     const tasks = await Task.find({ userId }); // Assuming tasks are associated with a user

//     res.status(200).json(tasks);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
import connectDB from '../db';
import { cors, runMiddleware } from '../../middleware/cors';
import { ObjectId } from 'mongodb';
import { authenticateToken } from '../../middleware/auth'; // Import middleware

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  try {
    const { client, db } = await connectDB();
    const tasksCollection = db.collection('tasks');

    if (req.method === 'OPTIONS') {
      console.log('Handling OPTIONS request'); // Add this for debugging
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your Angular app's origin
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(200).end();
      return; // Important: Exit early
    }
    
    switch (req.method) {
      case 'GET':
        await runMiddleware(req, res, authenticateToken); // Apply authentication middleware

        const tasks = await tasksCollection.find({}).toArray();
        res.status(200).json(tasks);
        break;

      case 'POST':
        // Protected route: Requires authentication to create a task
        await runMiddleware(req, res, authenticateToken); // Apply authentication middleware

        const { title, completed, description } = req.body; 

        // Simulate user authentication (replace with your actual authentication logic)
        const userId = req.userId;; // Replace with the ID of the authenticated user

        const newTask = { userId, title, completed, description };

        const resultPost = await tasksCollection.insertOne(newTask);

        const createdTask = await tasksCollection.findOne({ _id: resultPost.insertedId });

        res.status(201).json({ message: 'Task created', task: createdTask  });
        break;
      
      case 'PUT':
        await runMiddleware(req, res, authenticateToken); // Apply authentication middleware

        // Update the task in MongoDB
        const updatedTaskData = req.body;

        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(id) }, // Find the task by its ID
          { $set: updatedTaskData } // Update the task with the new data
        );

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Task updated successfully' });
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
        break;

      case 'DELETE':
        await runMiddleware(req, res, authenticateToken); // Apply authentication middleware
          const { id } = req.query; // Assuming you're passing the task ID in the URL
          const deleteResult = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
  
          if (deleteResult.deletedCount === 1) {
            res.status(200).json({ message: 'Task deleted successfully' });
          } else {
            res.status(404).json({ message: 'Task not found' });
          }
          break;

      default:
        res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}
