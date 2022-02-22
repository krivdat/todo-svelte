<script>
  // import { page } from '$app/stores';
  import '../global.css';
  import Navigation from '$lib/components/Navigation.svelte';

  // const error = $page.error;
  // console.log('page.error: ', $page.error);
</script>

<header>
  <Navigation />
</header>

<main>
  <slot />
</main>

<footer>Copyright 2022 Tomas Krivda</footer>

<style>
  main {
    max-width: 960px;
    margin: 0 auto 20px;
    /* padding: 1rem; */
    /* background-color: rgba(150, 138, 123, 0.5); */
  }
  /* main.error {
    max-width: 100%;
    padding: 4rem 2rem;
    background-color: indianred;
  } */
  header {
    position: sticky;
    top: 0;
  }
  footer {
    text-align: center;
    margin: 2rem auto;
    font-size: small;
  }
</style>
