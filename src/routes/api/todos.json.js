import clientPromise from '$lib/mongodb-client';
import { ObjectId } from 'mongodb';

export async function get() {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('todos');

    const todos = await collection.find().toArray();

    return {
      status: 200,
      body: {
        todos
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: new Error('Error while getting todos from database')
    };
  }
}

export async function post({ request }) {
  const todo = await request.json();
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('todos');
    const { insertedId } = await collection.insertOne(todo);
    return {
      status: 200,
      body: {
        message: `Successfully inserted todo with id ${insertedId}`
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: new Error('Error during storing new item to database')
    };
  }
}

export async function put({ request }) {
  const { id, change } = await request.json();
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('todos');
    const { modifiedCount } = await collection.updateOne({ _id: ObjectId(id) }, { $set: change });
    return {
      status: 200,
      body: {
        message: `successfully updated ${modifiedCount} todo`
      }
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: new Error('Error during storing new item to database')
    };
  }
}

export async function del({ request }) {
  const id = await request.json();

  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('todos');
    const result = await collection.deleteOne({ _id: ObjectId(id) });

    return {
      status: 200,
      body: {
        message: 'todo deleted successfully'
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: new Error('Error deleting item from database')
    };
  }
}
