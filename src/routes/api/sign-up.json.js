import { createSession, getUserByEmail, registerUser } from '$lib/auth-db-utils';
import { serialize } from 'cookie';
import { randomBytes, pbkdf2Sync } from 'crypto';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const { fullName, initials, projects, isAdmin, email, password } = await request.json();
  const user = await getUserByEmail(email);

  if (user) {
    return {
      status: 409,
      body: {
        message: 'User already exists'
      }
    };
  }

  const salt = randomBytes(32).toString('hex');
  const passwordHashed = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  await registerUser({
    fullName,
    initials,
    projects,
    isAdmin,
    email,
    salt,
    passwordHashed
  });

  const { id } = await createSession(email);
  return {
    status: 201,
    headers: {
      'Set-Cookie': serialize('session_id', id, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // one week
      })
    },
    body: {
      message: 'Successfully signed up'
    }
  };
}
