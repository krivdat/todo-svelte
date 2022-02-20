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
<div class="welcome">
  <p>Welcome, {user.fullName ? user.fullName : 'stranger'}!</p>
  <ul>
    <li>Initials: {user.initials ? user.initials : ''}</li>
    <li>Projects: {user.projects ? user.projects : 'you have no projects assigned'}</li>
    <li>{user.isAdmin ? 'You are admin' : 'You are not admin'}</li>
    <li>E-mail: {user.email}</li>
    <li />
  </ul>
</div>

<!-- <section class="todos">
  <a href="/R5-bistro"><div>R5 - Bistro fitout</div></a>
  <a href="/R6-concierge"><div>R6 - Concierge fitout</div></a>
  <a href="/R8-show-flat"><div>R8 Show Appartment</div></a>
</section> -->
<style>
  .welcome {
    text-align: center;
    margin-bottom: 4rem;
  }
  h1 {
    text-align: center;
  }
  .todos {
    max-width: 300px;
    margin: 2em auto 4em auto;
  }
  .todos div {
    padding: 1em;
    margin: 0.5em 0;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    box-shadow: 1px 1px 5px rgba(83, 82, 82, 50%);
  }
  .todos div:hover {
    background-color: rgba(150, 138, 123, 1);
  }
  .todos a {
    text-decoration: none;
    color: inherit;
  }
  .todos a:visited {
    color: inherit;
  }
  .todos a:hover {
    color: white;
  }
</style>
