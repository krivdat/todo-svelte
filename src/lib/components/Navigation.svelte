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
  <div class="navigation-general">
    <ul>
      {#each navigation as link}
        <a href={link.href}>
          <li>{link.name}</li>
        </a>
      {/each}
    </ul>
  </div>
  <div class="navigation-lists">
    <ul>
      {#if $session.user}
        {#each $session.user.projects as list}
          <a href="/{list}"><li>{list}</li></a>
        {/each}
        <a href="/projects/add"><li>Add project</li></a>
        <a href="#"><li on:click={handleSignOut}>Sign out</li></a>
      {:else}
        <a href="/sign-in"><li>Sign in</li></a>
        <!-- {#if $session.user.isAdmin} -->
        <a href="/sign-up"><li>Sign up</li></a>
        <!-- {/if} -->
      {/if}
    </ul>
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #222;
    color: azure;
    font-size: 0.9rem;
  }
  nav > div {
    height: 100%;
  }
  nav ul {
    display: flex;
    align-items: stretch;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0 1em;
  }
  nav ul li {
    margin: 0;
    padding: 0.5em 0.5em;
  }
  nav ul li:hover,
  nav ul a:hover {
    background-color: rgba(150, 138, 123, 0.5);
    cursor: pointer;
  }
  nav a,
  nav a:visited {
    color: azure;
    text-decoration: none;
  }
</style>
