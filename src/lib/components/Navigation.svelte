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
    {#each navigation as link}
      <a href={link.href}>{link.name}</a>
    {/each}
    {#if $session.user}
      <div class="dropdown-container">
        <button class="dropbtn">Your projects <i class="fa fa-caret-down" /></button>
        <div class="dropdown-content">
          {#each $session.user.projects as list}
            <a href="/{list}">{list}</a>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="navigation-auth">
    {#if $session.user}
      <a href="/projects/add">Add project</a>
      <a href="#" on:click={handleSignOut}>Sign out</a>
    {:else}
      <a href="/sign-in">Sign in</a>
      <!-- {#if $session.user.isAdmin} -->
      <a href="/sign-up">Sign up</a>
      <!-- {/if} -->
    {/if}
  </div>
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
  nav > div {
    display: flex;
    align-items: stretch;
    margin: 0;
    padding: 0;
  }
  .dropdown-container {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .dropbtn {
    font-size: 0.9rem;
    border: none;
    outline: none;
    color: azure;
    padding: 0.4em 0.5em;
    background-color: inherit;
    font-family: inherit; /* Important for vertical align on mobile phones */
    margin: 0; /* Important for vertical align on mobile phones */
  }
  a {
    /* display: flex; */
    /* align-items: center; */
    padding: 0.4em 0.5em;
    color: azure;
    text-decoration: none;
  }
  a:hover,
  .dropbtn:hover {
    background-color: rgba(150, 138, 123, 0.5);
    /* text-decoration: underline; */
  }
  a:visited {
    color: inherit;
  }
  /* Dropdown content (hidden by default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #222;
    min-width: 10em;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .dropdown-container:hover .dropdown-content {
    display: flex;
    flex-direction: column;
  }
</style>
