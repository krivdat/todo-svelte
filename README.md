# Todo App for Projects

Todo web app created for various professional projects. Users can create their own projects (groups of todo lists) with tasks. Each task can have it's category, responsible person (internal end external), due date and additional note. Tasks can be filtered by their status (pending, due today, overdue, completed) or responsible person. Each task can be marked as done or permanently deleted.

The app is made with Svelte/SvelteKit and uses MongoDB database for permanent data storage.

## Installation & Building

Clone the project from this repository and install dependencies:

```bash
npm install
```

Configure environment variables - create file .env in main project directory and insert VITE_MONGODB_URI="your mongo db uri", and optionally NODE_ENV="development" (or "production").
Then start development version of the app for testing:

```bash
npm run dev
```

To build for production first install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
