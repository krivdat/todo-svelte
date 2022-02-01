import clientPromise from '$lib/mongodb-client';

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
    console.log({ insertedId });
    const storedTodo = await collection.findOne({ _id: insertedId });
    return {
      status: 200,
      body: {
        storedTodo
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: new Error('Error during storing new item to database')
    };
  }
}

export async function put(request) {
  // add put method
  try {
    return {
      status: 200,
      body: {
        request
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: new Error('Error updating item in database')
    };
  }
}

export async function del({ request }) {
  // add del method
  try {
    return {
      status: 200,
      body: {
        request
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: new Error('Error deleting item from database')
    };
  }
}
