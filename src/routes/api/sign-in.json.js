import { createSession, getUserByEmail } from '$lib/auth-db-utils';
import { serialize } from 'cookie';
import { pbkdf2Sync } from 'crypto';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const { email, password } = await request.json();
  const user = await getUserByEmail(email);

  const hashVerify = pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex');
  if (!user || user.passwordHashed !== hashVerify) {
    return {
      status: 401,
      body: {
        message: 'Incorrect user or password'
      }
    };
  }

  const { id } = await createSession(email);
  return {
    status: 200,
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
      message: 'Successfully signed in'
    }
  };
}
