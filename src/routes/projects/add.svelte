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
  import AddProjectForm from '$lib/components/AddProjectForm.svelte';

  export let user;

  let error;

  async function handleSubmit({
    detail: { shortTitle, fullTitle, createdByEmail, accessPublic, isProtected }
  }) {
    const response = await fetch('/api/projects.json', {
      method: 'POST',
      body: JSON.stringify({ shortTitle, fullTitle, createdByEmail, accessPublic, isProtected }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      error = (await response.json()).message;
      return;
    }

    window.location = '/';
  }
</script>

<div class="container">
  <h1>Add Project</h1>
  {#if error}
    <p>{error}</p>
  {/if}
  <AddProjectForm {user} on:submit={handleSubmit} />
</div>

<style>
  .container {
    max-width: 320px;
    margin: auto;
  }
  h1 {
    text-align: center;
  }
  p {
    color: red;
    font-size: small;
    font-weight: 600;
  }
</style>
