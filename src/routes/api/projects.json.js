import clientPromise from '$lib/mongodb-client';
import { getUserByEmail } from '$lib/auth-db-utils';
import { addProject, addUserProject, delUserProject } from '$lib/projects-db-utils';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const { shortTitle, fullTitle, createdByEmail, accessPublic, isProtected } = await request.json();
  const user = await getUserByEmail(createdByEmail);
  if (!user) {
    return {
      status: 409,
      body: {
        message: 'User does not exist'
      }
    };
  }

  const project = await addProject({
    shortTitle,
    fullTitle,
    createdByEmail,
    accessPublic,
    isProtected
  });

  if (!project) {
    return {
      status: 409,
      body: {
        message: 'Please choose different short title for the project'
      }
    };
  }

  if (await addUserProject(user.email, project.shortTitle)) {
    return {
      status: 200,
      body: {
        message: 'Successfully added new project'
      }
    };
  }
  return {
    status: 409,
    body: {
      message: 'User does not exist'
    }
  };
}

export async function get() {
  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('projects');
    const projects = await collection.find().toArray();

    return {
      status: 200,
      body: {
        projects
      }
    };
  } catch (error) {
    // console.log({ error });
    return {
      status: 500,
      error: new Error('Error while getting projects from database')
    };
  }
}

export async function del({ request }) {
  const { project, email } = await request.json();

  try {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('projects');
    await collection.deleteOne({ shortTitle: project });
    const delCollection = db.collection(project);
    await delCollection.drop();
    await delUserProject(email, project);

    return {
      status: 200,
      body: {
        message: `Project ${project} deleted successfully`
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: new Error('Error deleting item from database')
    };
  }
}
