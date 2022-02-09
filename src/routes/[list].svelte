<script context="module">
  export async function load({ fetch, params }) {
    const list = params.list;
    try {
      const res = await fetch(`/api/todos.json?list=${list}`);
      const { todos } = await res.json();
      if (res.ok) {
        // console.log({ todos });
        return {
          props: { todos, list }
        };
      }

      return {
        status: res.status,
        error: new Error('Could not fetch todos')
      };
    } catch (err) {
      return {
        status: 500,
        error: new Error('Could not fetch todos')
      };
    }
  }
</script>

<script>
  export let todos;
  export let list;
  import { fade } from 'svelte/transition';
  import Todo from '$lib/components/Todo.svelte';
  import InputForm from '$lib/components/InputForm.svelte';

  let filterRules = {};
  $: todosFiltered = filterTodos(todos, filterRules);
  $: totalTodos = todos.length;
  $: totalTodosFiltered = todosFiltered.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;
  $: overdueTodos = todos.filter((todo) => todo.status == 'overdue').length;

  async function fetchTodos() {
    try {
      const res = await fetch(`/api/todos.json?list=${list}`);
      const data = await res.json();

      if (res.ok) {
        todos = data.todos;
      }
    } catch (error) {
      return new Error('Could not fetch list of todos');
    }
  }

  function filterTodos(list, rules) {
    return list.filter((todo) => {
      for (let key in rules) {
        if (todo[key] === undefined || todo[key] != rules[key]) return false;
      }
      return true;
    });
  }

  async function handleSubmit(e) {
    try {
      const res = await fetch(`/api/todos.json?list=${list}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(e.detail)
      });

      if (res.ok) {
        fetchTodos();
        return;
      }

      alert('Could not add new todo');
    } catch (error) {
      return new Error('Could not add new todo');
    }
  }

  async function handleDelete(id) {
    // console.log(id);
    try {
      const res = await fetch(`/api/todos.json?list=${list}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
      });
      if (res.ok) {
        fetchTodos();
        return;
      }

      alert('Could not delete todo');
    } catch (error) {
      return new Error('Could not delete todo');
    }
  }

  async function handleComplete(id) {
    const todo = todos.find((todo) => todo._id == id);
    try {
      const res = await fetch(`/api/todos.json?list=${list}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          change: { completed: !todo.completed }
        })
      });

      if (res.ok) {
        fetchTodos();
        return;
      }

      alert('Could not add new todo');
    } catch (error) {
      return new Error('Could add new todo');
    }
  }

  function showCompleted() {
    filterRules = { completed: true };
  }

  function showAll() {
    filterRules = {};
  }

  function showPending() {
    filterRules = { completed: false };
    // console.log({ todosFiltered, todos });
  }
</script>

<svelte:head>
  <title>Todo List</title>
</svelte:head>

<h1>Task manager - {list}</h1>

<InputForm on:submit={handleSubmit} />

<!-- Filter -->
<div class="filters">
  <button on:click={showAll}>All</button>
  <button on:click={showPending}>Pending</button>
  <button>Overdue</button>
  <button on:click={showCompleted}>Completed</button>
</div>

<!-- Todos status -->
<h2>
  {completedTodos} out of {totalTodos} items completed,
  <span class="txt-danger">{overdueTodos} item(s) overdue</span>
</h2>

<!-- List of todos -->
<h2>Selected tasks</h2>

<ul>
  {#each todosFiltered as todo (todo._id)}
    <li class:completed={todo.completed} transition:fade={{ duration: 150 }}>
      <Todo {todo} on:delete={handleDelete(todo._id)} on:complete={handleComplete(todo._id)} />
    </li>
  {:else}
    <p>nothing to do</p>
  {/each}
</ul>

<hr />

<!-- More Actions -->
<div>
  <button type="button">Check all</button>
  <button type="button">Remove completed</button>
</div>

<style>
  h1 {
    margin-top: 0;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  li {
    padding: 0.4rem;
    background-color: beige;
    border-radius: 5px;
  }

  li.completed {
    background-color: rgb(200, 208, 218);
    color: #444;
  }

  li:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  button {
    padding: 0.3em 1em;
    margin-top: 0.5rem;
  }
  button:hover {
    cursor: pointer;
  }
</style>
