import { parse } from 'cookie';
import { getSession as getSessionFromApi } from '$lib/auth-db-utils';
import { getUserByEmail } from '$lib/auth-db-utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookies = parse(event.request.headers.get('cookie') ?? '');
  // console.log('cookie is ', cookies.session_id);
  if (cookies.session_id) {
    const session = await getSessionFromApi(cookies.session_id);
    if (session) {
      const user = await getUserByEmail(session.email);
      // console.log('in hooks.js ', { user });
      event.locals.user = {
        fullName: user.fullName,
        initials: user.initials,
        projects: user.projects,
        isAdmin: user.isAdmin,
        email: session.email
      };
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
          fullName: event.locals.user.fullName,
          initials: event.locals.user.initials,
          projects: event.locals.user.projects,
          isAdmin: event.locals.user.isAdmin,
          email: event.locals.user.email
        }
      }
    : {};
}
