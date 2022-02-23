import { getUserByEmail } from '$lib/auth-db-utils';
import { addProject, updateUserProjects } from '$lib/projects-db-utils';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const { shortTitle, fullTitle, createdByEmail, accessPublic } = await request.json();
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
    accessPublic
  });

  if (!project) {
    return {
      status: 409,
      body: {
        message: 'Could not add new project'
      }
    };
  }

  updateUserProjects(user.email, project.shortTitle);

  return {
    status: 200,
    body: {
      message: 'Successfully added new project'
    }
  };
}
