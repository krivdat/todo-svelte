<script>
  import { page } from '$app/stores';
  import '../global.css';

  const error = $page.error;
</script>

{#if !error}
  <header>
    <nav>this is navigation</nav>
  </header>
{/if}

<main class:error>
  <slot />
</main>

{#if !error}
  <footer>this is footer</footer>
{/if}

<style>
  main {
    max-width: 960px;
    margin: 20px auto;
    padding: 1rem;
    background-color: lightsteelblue;
  }
  main.error {
    max-width: 100%;
    padding: 4rem 2rem;
    background-color: indianred;
  }
  nav {
    background-color: indigo;
    color: azure;
    padding: 0.5em 1em;
  }
  footer {
    text-align: center;
    margin: 2rem auto;
  }
</style>
