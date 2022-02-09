<script>
  // import { page } from '$app/stores';
  import '../global.css';

  // const error = $page.error;
  // console.log('page.error: ', $page.error);
</script>

<!-- {#if !error} -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/todos">Default list</a></li>
    </ul>
  </nav>
</header>
<!-- {/if} -->

<main>
  <slot />
</main>

<!-- {#if !error} -->
<footer>Copyright 2022 Tomas Krivda</footer>

<!-- {/if} -->
<style>
  main {
    max-width: 960px;
    margin: 20px auto;
    padding: 1rem;
    background-color: lightsteelblue;
  }
  /* main.error {
    max-width: 100%;
    padding: 4rem 2rem;
    background-color: indianred;
  } */
  nav {
    background-color: indigo;
    color: azure;
    padding: 0.5em 1em;
  }
  nav ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    gap: 1em;
  }
  nav a,
  nav a:visited {
    color: azure;
    text-decoration: none;
  }
  nav a:hover {
    color: rgb(201, 199, 85);
  }
  footer {
    text-align: center;
    margin: 2rem auto;
    font-size: small;
  }
</style>
