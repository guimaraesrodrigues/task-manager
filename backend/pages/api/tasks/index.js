import connectDB from '../db';
import { cors, runMiddleware } from '../../middleware/cors';
import { ObjectId } from 'mongodb';
import { authenticateToken } from '../../middleware/auth'; // Import middleware

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  try {
    const { db } = await connectDB();
    const tasksCollection = db.collection('tasks');

    if (req.method === 'OPTIONS') {
      console.log('HI IM HERE PLS HELP')
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(200).end();
      return; 
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
          const searchParams = request.nextUrl.searchParams;
          const id = searchParams.get('id');
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
  }
}
