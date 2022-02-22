<script context="module">
  export async function load({ session }) {
    if (!session?.user) {
      return {
        status: 302,
        redirect: '/sign-in'
      };
    }
    return {
      props: {
        user: session.user
      }
    };
  }
</script>

<script>
  export let user;
  console.log('in index.svelte', { user });
</script>

<h1>Todo Lists</h1>
<section class="welcome">
  <p>Welcome, {user.fullName ? user.fullName : 'stranger'}!</p>
  <div class="user-summary">
    <p>Initials: {user.initials ? user.initials : ''}</p>
    <p>{user.isAdmin ? 'You are admin' : 'You are not admin'}</p>
    <p>E-mail: {user.email}</p>
  </div>

  <div class="projects">
    <h2>Your projects</h2>
    {#if user.projects.length > 0}
      {#each user.projects as project}
        <div class="project"><a href="/{project}">{project}</a></div>
      {/each}
    {:else}
      <span>you have no projects assigned</span>
    {/if}
  </div>
</section>

<style>
  h1 {
    text-align: center;
  }
  .welcome {
    text-align: center;
    margin-bottom: 4rem;
  }
  .projects {
    max-width: 300px;
    margin: 2em auto 4em auto;
  }
  .project {
    padding: 1em;
    margin: 0.5em 0;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    box-shadow: 1px 1px 5px rgba(83, 82, 82, 50%);
  }
  .project:hover {
    background-color: rgba(150, 138, 123, 1);
    color: white;
    cursor: pointer;
  }
  .projects a,
  .projects a:visited {
    text-decoration: none;
    color: inherit;
  }
</style>
