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
    margin: 0 auto 20px;
    padding: 1rem;
    background-color: rgba(150, 138, 123, 0.5);
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
  nav {
    background-color: #222;
    color: azure;
  }
  nav ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0 0 0 1em;
  }
  nav ul li {
    padding: 0.5em 0.5em;
  }
  nav ul li:hover {
    background-color: rgba(150, 138, 123, 0.5);
  }
  nav a,
  nav a:visited {
    color: azure;
    text-decoration: none;
  }
  nav a:hover {
  }
  footer {
    text-align: center;
    margin: 2rem auto;
    font-size: small;
  }
</style>
