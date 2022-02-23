import clientPromise from '$lib/mongodb-client';

export const addProject = async (project) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('projects');
    const existingProject = await collection.findOne({ shortTitle: project.shortTitle });
    if (existingProject) return Promise.reject(new Error('This projects already exists'));
    const { insertedId } = await collection.insertOne(project);
    project.id = insertedId.toHexString();
    return Promise.resolve(project);
  } catch (error) {
    return Promise.reject(new Error('Error while adding new project'));
  }
};
