import { removeSession } from '$lib/auth-db-utils';
import { parse, serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request }) {
  const cookies = parse(request.headers.get('cookie') || '');
  // console.log('in sign-out', { cookies });
  if (cookies.session_id) {
    await removeSession(cookies.session_id);
  }

  return {
    status: 200,
    headers: {
      'Set-Cookie': serialize('session_id', '', {
        path: '/',
        maxAge: 0
      })
    }
  };
}
