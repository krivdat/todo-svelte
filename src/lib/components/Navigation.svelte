<script>
  import { session } from '$app/stores';
  import { goto } from '$app/navigation';

  const navigation = [
    {
      href: '/',
      name: 'Home'
    }
    // {
    //   href: '/protected',
    //   name: `${$session.user ? '🔓' : '🔒'} Protected`
    // }
  ];

  async function handleSignOut() {
    await fetch('/api/sign-out.json');
    $session = {};
    await goto('/sign-in');
  }
</script>

<nav>
  <ul class="navigation-general">
    {#each navigation as link}
      <li>
        <a href={link.href}>
          {link.name}
        </a>
      </li>
    {/each}
  </ul>
  <ul class="navigation-lists">
    {#if $session.user}
      {#each $session.user.projects as list}
        <li><a href="/{list}">{list}</a></li>
      {/each}
      <li><a href="/projects/add">Add project</a></li>
      <li><a href="#" on:click={handleSignOut}>Sign out</a></li>
    {:else}
      <li><a href="/sign-in">Sign in</a></li>
      <!-- {#if $session.user.isAdmin} -->
      <li><a href="/sign-up">Sign up</a></li>
      <!-- {/if} -->
    {/if}
  </ul>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background-color: #222;
    color: azure;
    font-size: 0.9rem;
  }
  nav > ul {
    display: flex;
    align-items: stretch;
    margin: 0;
    padding: 0;
  }
  nav > ul li {
    display: flex;
    align-items: center;
    padding: 0.3em 0.5em;
  }
  nav > ul li:hover {
    background-color: rgba(150, 138, 123, 0.5);
  }
  a {
    color: azure;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  a:visited {
    color: inherit;
  }
</style>
