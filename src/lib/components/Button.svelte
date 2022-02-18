<script>
  export let type = 'button';
</script>

<button {type}>
  <slot />
</button>

<style>
  button {
    display: inline-flex;
    align-items: center;
    padding: 0.8em 2em;
    border: 1px solid transparent;
    border-radius: 3px;
    color: white;
    background-color: indigo;
    box-shadow: 2px 2px 4px #ccc;
    margin: 1em auto;
  }
  button:hover {
    cursor: pointer;
  }
</style>
