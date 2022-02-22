<script>
  import SignInForm from '$lib/components/SignInForm.svelte';

  let error;

  async function handleSubmit({ detail: { email, password } }) {
    const response = await fetch('/api/sign-in.json', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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
  <h1>Sign In</h1>
  {#if error}
    <p>{error}</p>
  {/if}
  <SignInForm on:submit={handleSubmit} />
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
