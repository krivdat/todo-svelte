<script>
  import { navigating } from '$app/stores';

  import { loading } from '$lib/loading';
  import Loading from '$lib/components/Loading.svelte';
  import '../global.css';
  import Navigation from '$lib/components/Navigation.svelte';

  $: loading.setNavigate(!!$navigating);
</script>

<Loading />

<header>
  <Navigation />
</header>

<main>
  <slot />
</main>

<footer><span>&copy; 2022 <a href="https://www.tomaskrivda.online">Tomas Krivda</a></span></footer>

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

  footer a {
    text-decoration: none;
    color: inherit;
  }
  footer a:hover {
    text-decoration: underline;
  }
</style>
