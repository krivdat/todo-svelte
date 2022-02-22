<script>
  export let value = '';
  export let id;
  export let label;
  export let type = 'text';
  export let name;
  export let required = false;

  export let inputRef = null;

  function setType(node) {
    node.type = type;
  }
</script>

<div>
  <label for={id}>
    {label}
  </label>
  <div>
    <input use:setType {name} {id} {required} bind:value bind:this={inputRef} />
  </div>
</div>

<style>
  label {
    display: block;
    font-size: medium;
    font-weight: 700;
    color: #222;
  }
  input {
    width: 100%;
    box-shadow: 2px 2px 4px #ccc;
    border: 1px solid #444;
    border-radius: 3px;
    padding: 0.4em 1em;
    margin: 0.5em auto;
  }
  input:focus {
    border: 1px solid indigo;
  }
</style>
