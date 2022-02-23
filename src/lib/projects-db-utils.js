import clientPromise from '$lib/mongodb-client';

export const addProject = async (project) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('projects');
    const existingProject = await collection.findOne({ shortTitle: project.shortTitle });
    if (existingProject) return Promise.reject(new Error('This project already exists'));
    const { insertedId } = await collection.insertOne(project);
    project.id = insertedId.toHexString();
    await db.createCollection(project.shortTitle);
    return Promise.resolve(project);
  } catch (error) {
    return Promise.reject(new Error('Error while adding new project'));
  }
};

export const updateUserProjects = async (email, projectTitle) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ email });
    if (!existingUser) return Promise.reject(new Error('User does not exist'));
    const newProjects = [...existingUser.projects, projectTitle];
    const { modifiedCount } = await collection.updateOne(
      { email: email },
      { $set: { projects: newProjects } }
    );
    return Promise.resolve(modifiedCount);
  } catch (error) {
    return Promise.reject(new Error('Error while registering new user'));
  }
};
