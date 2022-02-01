<script>
  let result;
  async function addtodo() {
    try {
      const todo = {
        task: 'walk a dog',
        status: 'pending'
      };
      result = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
    } catch (err) {
      alert(err);
    }
  }
</script>

<button on:click={addtodo} type="button">Click me</button>
{result}
