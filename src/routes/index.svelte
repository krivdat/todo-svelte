<script context="module">
  export async function load({ fetch }) {
    try {
      const res = await fetch('/api/todos.json');
      const { todos } = await res.json();
      if (res.ok) {
        return {
          props: { todos }
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
  import { fade } from 'svelte/transition';
  import Todo from '$lib/components/Todo.svelte';
  import InputForm from '$lib/components/InputForm.svelte';

  // filter rule is object consisting of keys/values:
  // todo item property
  // todo item value to compare
  let filterRules = [
    {
      property: 'completed',
      value: 'true'
    }
  ];
  let todosFiltered = [];

  // $: todosFiltered = filterTodos(filterRules);
  $: totalTodos = todos.length;
  // $: totalTodosFiltered = todosFiltered.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;
  $: overdueTodos = todos.filter((todo) => todo.status == 'overdue').length;

  async function fetchTodos() {
    try {
      const res = await fetch('/api/todos.json');
      const data = await res.json();

      if (res.ok) {
        todos = data.todos;
      }
    } catch (error) {
      return new Error('Could not fetch list of todos');
    }
  }

  function filterTodos(rules) {
    if (!rules.length > 0) {
      todosFiltered = todos;
      console.log('no rules applied');
      return;
    }
    console.log(rules);
    const filtered = todos.filter((todo) => {
      let pass = false;
      rules.forEach((rule) => {
        console.log(rule.property, todo[rule.property], rule.value);
        if (todo[rule.property] == rule.value) {
          pass = true;
        }
      });
      return pass;
    });
    console.log(filtered);
    return filtered;
  }

  async function handleSubmit(e) {
    try {
      const res = await fetch('/api/todos.json', {
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
      return new Error('Could add new todo');
    }
  }

  async function handleDelete(id) {
    console.log(id);
    try {
      const res = await fetch('/api/todos.json', {
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
      const res = await fetch('/api/todos.json', {
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
    filterTodos({ property: 'completed', value: true });
  }
</script>

<svelte:head>
  <title>Todo List</title>
</svelte:head>

<h1>Task manager</h1>

<InputForm on:submit={handleSubmit} />

<!-- Filter -->
<div class="filters">
  <button>All</button>
  <button>Pending</button>
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
  {#each todos as todo (todo._id)}
    <li class:completed={todo.completed} transition:fade>
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
  }

  li.completed {
    background-color: rgb(200, 208, 218);
    color: #444;
  }

  li:not(:last-child) {
    margin-bottom: 0.3rem;
  }
</style>
