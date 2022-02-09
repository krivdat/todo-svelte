import clientPromise from '$lib/mongodb-client';
import { ObjectId } from 'mongodb';

export async function get({ url }) {
  const list = url.searchParams.get('list');
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((item) => item.name);
    if (!collectionNames.includes(list)) {
      console.log(`Collection ${list} does not exist`);
      return {
        status: 400,
        error: new Error('Requested todo list does not exist')
      };
    }

    const collection = db.collection(list);
    const todos = await collection.find().toArray();

    return {
      status: 200,
      body: {
        todos
      }
    };
  } catch (error) {
    console.log({ error });
    return {
      status: 500,
      error: new Error('Error while getting todos from database')
    };
  }
}

export async function post({ request, url }) {
  const todo = await request.json();
  const list = url.searchParams.get('list');

  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((item) => item.name);
    if (!collectionNames.includes(list)) {
      console.log(`Collection ${list} does not exist`);
      return {
        status: 400,
        error: new Error('Requested todo list does not exist')
      };
    }

    const collection = db.collection(list);
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

export async function put({ request, url }) {
  const { id, change } = await request.json();
  const list = url.searchParams.get('list');

  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((item) => item.name);
    if (!collectionNames.includes(list)) {
      console.log(`Collection ${list} does not exist`);
      return {
        status: 400,
        error: new Error('Requested todo list does not exist')
      };
    }

    const collection = db.collection(list);
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

export async function del({ request, url }) {
  const id = await request.json();
  const list = url.searchParams.get('list');

  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((item) => item.name);
    if (!collectionNames.includes(list)) {
      console.log(`Collection ${list} does not exist`);
      return {
        status: 400,
        error: new Error('Requested todo list does not exist')
      };
    }

    const collection = db.collection(list);
    const result = await collection.deleteOne({ _id: ObjectId(id) });

    return {
      status: 200,
      body: {
        message: `${result.deletedCount} todo(s) deleted successfully`
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: new Error('Error deleting item from database')
    };
  }
}
