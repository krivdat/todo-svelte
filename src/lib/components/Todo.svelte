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
  <div class="task">{todo.task}</div>
  <div>({todo.subject})</div>
</div>

<div class="group">
  <div>{todo.responsibleIntern}</div>
  <div>/</div>
  <div>{todo.responsibleExtern}</div>
  <div class="right">
    {#if Date.parse(todo.dateDue) < Date.now()}
      <span class="overdue">{todo.dateDue}</span>
    {:else}
      <span class="pending">{todo.dateDue}</span>
    {/if}
  </div>
</div>

<div class="group">
  <div class="notes">{todo.note}</div>
  <i class="far fa-trash-alt icon-danger right" aria-hidden="true" on:click={handleDeleteClick} />
  <button
    class="btn-done"
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
  .right {
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
  .pending {
    /* color: red; */
  }
  .overdue {
    color: ghostwhite;
    background-color: red;
    font-weight: 600;
    padding: 0 3px;
    border-radius: 3px;
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
    opacity: 0.8;
  }

  .btn-done {
    color: black;
    border: 1px solid black;
    opacity: 1;
    background-color: transparent;
    padding: 0.1em 0.4em;
    margin-top: 3px;
  }
  .btn-done:hover {
    background-color: green;
    color: white;
  }

  i {
    cursor: pointer;
  }
  i:hover {
    opacity: 0.8;
  }
  .icon-danger:hover {
    color: red;
  }
</style>
