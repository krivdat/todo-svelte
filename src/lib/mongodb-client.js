// import dotenv from 'dotenv';
// dotenv.config();

import { MONGODB_URI } from '$lib/env';
import { MongoClient } from 'mongodb';

let uri;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  // For production
  uri = process.env['MONGODB_URI'];
  // uri = MONGODB_URI;
} else {
  // For development
  uri = MONGODB_URI;
}

// const uri = process.env['MONGODB_URI'];

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env['NODE_ENV'] === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
