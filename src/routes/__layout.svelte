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
      <a href="/"><li>Home</li></a>
      <!-- <li><a href="/todos">Default list</a></li> -->
      <a href="/R5-bistro"><li>R5 Deli Bistro</li></a>
      <a href="/R6-concierge"><li>R6 Concierge</li></a>
      <a href="/R8-show-flat"><li>R8 Show Appartment</li></a>
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
  nav {
    background-color: #222;
    color: azure;
    font-size: 0.9rem;
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
