<script>
  import Input from '$lib/components/Input.svelte';
  import Button from '$lib/components/Button.svelte';

  import { createEventDispatcher } from 'svelte';

  export let user;

  let shortTitle = '';
  let fullTitle = '';
  let createdByEmail = user.email;
  let accessPublic = false;
  let error;

  const dispatch = createEventDispatcher();

  function submit() {
    error = null;
    shortTitle = shortTitle.filter((char) => !char == ''); // remove spaces
    dispatch('submit', {
      shortTitle,
      fullTitle,
      createdByEmail,
      accessPublic
    });
  }
</script>

<form on:submit|preventDefault={submit}>
  <Input label="Full title" id="fullTitle" name="fullTitle" type="text" bind:value={fullTitle} />
  <Input
    label="Short title"
    id="shortTitle"
    name="shortTitle"
    type="text"
    bind:value={shortTitle}
    placeholder="short abbreviation, no spaces"
    required
  />
  {#if user.isAdmin}
    <Input
      label="Created by (e-mail)"
      id="createdByEmail"
      name="createdByEmail"
      type="email"
      bind:value={createdByEmail}
      required
    />
  {/if}
  <input
    label="Public"
    type="checkbox"
    name="accessPublic"
    id="accessPublic"
    bind:checked={accessPublic}
  />
  <label for="accessPublic">public</label>

  {#if error}
    <p class="text-red-600 text-sm font-semibold">{error}</p>
  {/if}
  <div class="center">
    <Button type="submit">Add Project</Button>
  </div>
</form>

<style>
  .center {
    display: flex;
    justify-content: center;
  }

  p {
    color: red;
    font-size: small;
    font-weight: 600;
  }
</style>
