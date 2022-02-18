import { parse } from 'cookie';
import { getSession as getSessionFromApi } from '$lib/auth-db-utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookies = parse(event.request.headers.get('cookie') ?? '');
  console.log('cookie is ', cookies.session_id);
  if (cookies.session_id) {
    const session = await getSessionFromApi(cookies.session_id);
    if (session) {
      console.log('here');
      event.locals.user = { email: session.email };
      return resolve(event);
    }
  }

  event.locals.user = null;
  return resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  return event.locals.user
    ? {
        user: {
          email: event.locals.user.email
        }
      }
    : {};
}
