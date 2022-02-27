import clientPromise from '$lib/mongodb-client';

export const addProject = async (project) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('projects');
    // check if added project does not already exist
    const existingProject = await collection.findOne({ shortTitle: project.shortTitle });
    if (existingProject) return Promise.resolve(null);
    // if not insert new db entry
    const { insertedId } = await collection.insertOne(project);
    project.id = insertedId.toHexString();
    await db.createCollection(project.shortTitle);
    return Promise.resolve(project);
  } catch (error) {
    return Promise.reject(new Error('Error while adding new project'));
  }
};

export const addUserProject = async (email, projectTitle) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ email });
    if (!existingUser) return Promise.resolve(null);
    const newProjects = [...existingUser.projects, projectTitle];
    const { modifiedCount } = await collection.updateOne(
      { email: email },
      { $set: { projects: newProjects } }
    );
    return Promise.resolve(modifiedCount);
  } catch (error) {
    return Promise.reject(new Error("Error while adding new user's project"));
  }
};

export const delUserProject = async (email, projectTitle) => {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ email });
    if (!existingUser) return Promise.resolve(null);
    const newProjects = existingUser.projects.filter((item) => item !== projectTitle);
    const { modifiedCount } = await collection.updateOne(
      { email: email },
      { $set: { projects: newProjects } }
    );
    return Promise.resolve(modifiedCount);
  } catch (error) {
    return Promise.reject(new Error("Error while deleting user's project"));
  }
};
