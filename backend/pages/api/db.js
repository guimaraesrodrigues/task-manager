import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017';
const dbName = 'task-manager'; // Your database name

let cachedClient = null;
let cachedDb = null;

async function connectDB() {
  if (cachedClient && cachedDb) {
    console.log('Using existing database connection');
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    console.log('Connected to MongoDB successfully!');
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export default connectDB;