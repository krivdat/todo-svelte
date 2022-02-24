<script>
  import Input from '$lib/components/Input.svelte';
  import Button from '$lib/components/Button.svelte';

  import { createEventDispatcher } from 'svelte';

  let fullName = '';
  let initials = '';
  let projects = [];
  let isAdmin = false;
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error;
  let confirmPasswordInputRef;

  const dispatch = createEventDispatcher();

  function submit() {
    error = null;
    if (password !== confirmPassword) {
      error = 'Passwords do not match.';
      confirmPasswordInputRef.focus();
      return;
    }

    // const projectsArray = projects.split(',').map((item) => item.trim());
    dispatch('submit', {
      fullName,
      initials,
      projects,
      isAdmin,
      email,
      password
    });
  }
</script>

<form on:submit|preventDefault={submit}>
  <Input label="Full name" id="fullName" name="fullName" type="text" bind:value={fullName} />
  <Input
    label="Initials"
    id="initials"
    name="initials"
    type="text"
    bind:value={initials}
    required
  />
  <!-- <Input
    label="Projects (comma separated list)"
    id="projects"
    name="projects"
    type="text"
    bind:value={projects}
  /> -->
  <Input label="Email" id="email" name="email" type="email" bind:value={email} required />
  <Input
    label="Password"
    id="password"
    name="password"
    type="password"
    bind:value={password}
    required
  />
  <Input
    label="Confirm Password"
    id="confirm-password"
    name="confirm-password"
    type="password"
    bind:value={confirmPassword}
    bind:inputRef={confirmPasswordInputRef}
  />
  {#if error}
    <p class="text-red-600 text-sm font-semibold">{error}</p>
  {/if}
  <div class="center">
    <Button type="submit">Sign Up</Button>
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
