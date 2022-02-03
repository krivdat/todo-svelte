<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let todo;

  function handleDeleteClick() {
    // submit delete event
    dispatch('delete');
  }

  function handleCompleteClick(e) {
    // submit completion event
    dispatch('complete');
  }
</script>

<div class="todo-item">
  <div>{todo.subject}:</div>
  <div class="task"><strong>{todo.task}</strong></div>
  <div>
    {#if todo.completed}
      completed
    {:else}
      pending
    {/if}
  </div>
  <div>
    <button type="button" on:click={handleDeleteClick}>Delete</button>
    <button type="button" class:completed={todo.completed} on:click={handleCompleteClick}>
      Done
    </button>
  </div>
</div>
<div class="todo-item bottom-line">
  <div>resp.int. <strong>{todo.responsibleIntern}</strong></div>
  <div>resp.ext. <strong>{todo.responsibleExtern}</strong></div>
  <div class="notes">note: {todo.note}</div>
  <div>{todo.dateDue}</div>
</div>

<style>
  .todo-item {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-left: 8px;
    padding-right: 8px;
  }
  .completed {
    background-color: green;
    color: beige;
  }
  .task,
  .notes {
    flex-grow: 5;
  }

  .bottom-line {
    font-size: small;
  }
</style>
