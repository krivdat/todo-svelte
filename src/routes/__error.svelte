<script context="module">
  export function load({ error, status }) {
    return {
      props: { error, status }
    };
  }
</script>

<script>
  export let status;
  export let error;
</script>

<div class="error">
  <h1>Oops, something went wrong!</h1>

  <h2>{status}</h2>

  <pre>{error.message}</pre>

  <a href="/">Go back to main todos page</a>
</div>

<style>
  .error {
    text-align: center;
    margin-bottom: 4rem;
  }
</style>
