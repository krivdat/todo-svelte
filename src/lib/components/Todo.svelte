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

<div class="group">
  <div>{todo.subject}:</div>
  <div class="task">{todo.task}</div>
</div>

<div class="group">
  <div>resp.int. <strong>{todo.responsibleIntern}</strong></div>
  <div>resp.ext. <strong>{todo.responsibleExtern}</strong></div>
  <div class="status">
    {#if todo.completed}
      completed
    {:else}
      pending
    {/if}
  </div>
  <div>{todo.dateDue}</div>
</div>

<div class="group">
  <div class="notes">note: {todo.note}</div>
  <button class="btn-danger" type="button" on:click={handleDeleteClick}>Delete</button>
  <button
    class="btn-action"
    type="button"
    class:completed={todo.completed}
    on:click={handleCompleteClick}
  >
    Done
  </button>
</div>

<style>
  .group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: small;
    margin-bottom: 0.2em;
  }
  .status,
  .btn-danger {
    margin-left: auto;
  }
  .task {
    font-weight: 600;
    font-size: medium;
    flex-grow: 1;
  }
  .completed {
    background-color: green;
    color: beige;
  }

  button {
    display: inline-block;
    padding: 0.3em 0.7em;
    border: none;
    border-radius: 0.2em;
    box-sizing: border-box;
    font-weight: 300;
    text-align: center;
    transition: all 0.2s;
    opacity: 0.7;
  }
  button:hover {
    cursor: pointer;
    opacity: 1;
  }

  .btn-danger {
    background-color: red;
    color: white;
  }
  .btn-action {
    background-color: green;
    color: white;
  }
</style>
