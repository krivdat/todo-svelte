<script>
  import { createEventDispatcher } from 'svelte';

  export let type = 'button';
  export let purpose = '';

  const dispatch = createEventDispatcher();
</script>

<button {type} class={purpose} on:click={() => dispatch('clicked')}>
  <slot />
</button>

<style>
  button,
  button.cancel {
    display: inline-flex;
    align-items: center;
    padding: 0.8em 2em;
    border: 1px solid transparent;
    border-radius: 3px;
    color: white;
    background-color: rgba(150, 138, 123, 1);
    box-shadow: 2px 2px 4px #ccc;
    margin: 1em 0;
  }
  button:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  button.confirm {
    background-color: green;
    color: white;
  }

  button.danger {
    background-color: rgb(218, 59, 59);
    color: white;
  }
</style>
