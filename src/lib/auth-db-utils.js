import clientPromise from '$lib/mongodb-client';
import { ObjectId } from 'mongodb';

export const getUserByEmail = async (email) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ email: email });
    if (!existingUser) return Promise.resolve(null);
    return Promise.resolve(existingUser);
  } catch (error) {
    return Promise.reject(new Error('Error while looking up existing user'));
  }
};

export const registerUser = async (user) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ email: user.email });
    if (existingUser) return Promise.reject(new Error('User already exists'));
    const { insertedId } = await collection.insertOne(user);
    user.id = insertedId.toHexString();
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(new Error('Error while registering new user'));
  }
};

export const createSession = async (email) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('sessions');
    const { insertedId } = await collection.insertOne({ email: email });
    const session = {
      id: insertedId.toHexString(),
      email: email
    };
    return Promise.resolve(session);
  } catch (error) {
    return Promise.reject(new Error('Error while creating new session'));
  }
};

export const getSession = async (id) => {
  console.log('in auth-db-utils: ', { id });
  if (id == 'undefined') {
    return Promise.resolve(null);
  }
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('sessions');
    const session = await collection.findOne({ _id: new ObjectId(id) });
    if (!session) return Promise.resolve(null);
    return Promise.resolve(session);
  } catch (error) {
    return Promise.reject(new Error('Error while looking up session'));
  }
};

export const removeSession = async (id) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('sessions');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) return Promise.reject(new Error('Session not found'));
    return Promise.resolve(id);
  } catch (error) {
    return Promise.reject(new Error('Error removing session'));
  }
};
