<script>
  import SignUpForm from '$lib/components/SignUpForm.svelte';

  let error;

  async function handleSubmit({
    detail: { fullName, initials, projects, isAdmin, email, password }
  }) {
    const response = await fetch('/api/sign-up.json', {
      method: 'POST',
      body: JSON.stringify({ fullName, initials, projects, isAdmin, email, password }),
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
  <h1>Sign Up</h1>
  {#if error}
    <p>{error}</p>
  {/if}
  <SignUpForm on:submit={handleSubmit} />
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
