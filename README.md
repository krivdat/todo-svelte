# Todo App for Projects

Todo app created mainly for construction development projects, but possible to use for other purposes. Uses Mongodb database for permanent data storage.

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
