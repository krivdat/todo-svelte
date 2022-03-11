<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let todo;

  function handleCompleteClick(e) {
    dispatch('complete');
  }
</script>

<div class="group">
  <div>
    {#if todo.priority === '0' || !todo.priority}
      <i class="fa-regular fa-clock" title="standard priority" />
    {:else if todo.priority === '1'}
      <i class="fa-solid fa-exclamation priority-high" title="high priority" />
    {:else if todo.priority === '2'}
      <i class="fa-regular fa-circle-exclamation priority-top" title="top priority" />
    {/if}
  </div>
  <div class="task">{todo.task}</div>
  <div>({todo.subject})</div>
</div>

<div class="group">
  <div>{todo.responsibleIntern}</div>
  <div>/</div>
  <div>{todo.responsibleExtern}</div>
  <div class="right">
    {#if todo.dateDueOriginal && todo.dateDue !== todo.dateDueOriginal}
      <span>({todo.dateDueOriginal}) -></span>
    {/if}
  </div>
  <div>
    {#if Date.parse(todo.dateDue) < Date.now()}
      <span class="overdue">{todo.dateDue}</span>
    {:else}
      <span class="pending">{todo.dateDue}</span>
    {/if}
  </div>
</div>

<div class="group">
  <div class="notes">{todo.note}</div>
  <i
    class="fa-solid fa-pen right"
    aria-hidden="true"
    on:click={() => dispatch('edit')}
    title="edit task"
  />
  <i
    class="far fa-trash-alt icon-danger"
    aria-hidden="true"
    on:click={() => dispatch('delete')}
    title="delete task"
  />
  <button
    class="btn-done"
    type="button"
    class:completed={todo.completed}
    on:click={handleCompleteClick}
    title="mark as complete"
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
    color: #999;
    border: 1px solid #999;
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
  i.priority-high {
    color: red;
  }
  i.priority-top {
    color: red;
    font-weight: 800;
  }
</style>
