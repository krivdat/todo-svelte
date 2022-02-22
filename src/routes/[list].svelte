<script context="module">
  export async function load({ fetch, params, session }) {
    if (!session?.user) {
      return {
        status: 302,
        redirect: '/sign-in'
      };
    }

    const list = params.list;
    try {
      const res = await fetch(`/api/todos.json?list=${list}`);
      const { todos } = await res.json();
      if (res.ok) {
        todos.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue));
        return {
          props: { todos, list, user: session.user }
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
  import { fade, slide } from 'svelte/transition';
  import Todo from '$lib/components/Todo.svelte';
  import InputForm from '$lib/components/InputForm.svelte';

  let filterRules = {};
  let respIntSelected = '';
  let respExtSelected = '';
  let showInputForm = true;

  $: todosFiltered = filterTodos(todos, filterRules, respIntSelected, respExtSelected);
  $: totalTodos = todos.length;
  $: totalTodosFiltered = todosFiltered.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;
  $: overdueTodos = todos.filter(
    (todo) => Date.parse(todo.dateDue) < Date.now() && !todo.completed
  ).length;
  $: respIntList = [...new Set(todos.map((todo) => todo.responsibleIntern))];
  $: respExtList = [...new Set(todos.map((todo) => todo.responsibleExtern))];

  async function fetchTodos() {
    try {
      const res = await fetch(`/api/todos.json?list=${list}`);
      const data = await res.json();

      if (res.ok) {
        const unsortedTodos = data.todos;
        todos = unsortedTodos.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue));
      }
    } catch (error) {
      return new Error('Could not fetch list of todos');
    }
  }

  function filterTodos(list, rules, respInt, respExt) {
    console.log('Inside filter function. ', { rules }, { respIntSelected }, { respExtSelected });
    let result;
    if (rules.overdue) {
      result = list.filter((todo) => Date.parse(todo.dateDue) < Date.now() && !todo.completed);
    } else if (rules) {
      result = list.filter((todo) => {
        for (let key in rules) {
          if (todo[key] === undefined || todo[key] != rules[key]) return false;
        }
        return true;
      });
    }
    result = result.filter((todo) => {
      if (
        (respInt != '' && todo.responsibleIntern != respInt) ||
        (respExt != '' && todo.responsibleExtern != respExt)
      ) {
        return false;
      }
      return true;
    });

    return result;
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
  }

  function showDueToday() {
    const date = new Date();
    const today =
      date.getFullYear() +
      '-' +
      (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
      '-' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
    filterRules = { dateDue: today };
  }

  function showOverdue() {
    filterRules = { overdue: true };
  }
</script>

<svelte:head>
  <title>Todo List</title>
</svelte:head>

<section class="input-and-filters">
  <div class="top-title">
    <h1>Task manager - {list}</h1>
    <button on:click={() => (showInputForm = !showInputForm)} title="show/hide input form"
      >▲ ▼</button
    >
  </div>

  {#if showInputForm}
    <div transition:slide>
      <InputForm on:submit={handleSubmit} />
    </div>
  {/if}

  <!-- Filter -->

  <div class="container">
    <div class="filters">
      <button on:click={showAll}>All</button>
      <button on:click={showPending}>Pending</button>
      <button on:click={showDueToday}>Due today</button>
      <button on:click={showOverdue}>Overdue</button>
      <button on:click={showCompleted}>Completed</button>
    </div>
    <div class="filters">
      <label for="filterRespInt"
        ><span>resp.int.</span>
        <select name="filterRespInt" id="filterRespInt" bind:value={respIntSelected}>
          <option value="">all</option>
          {#each respIntList as person}
            <option value={person}>{person}</option>
          {/each}
        </select>
      </label>
      <label for="filterRespExt"
        ><span>resp.ext.</span>
        <select name="filterRespExt" id="filterRespExt" bind:value={respExtSelected}>
          <option value="">all</option>
          {#each respExtList as person}
            <option value={person}>{person}</option>
          {/each}
        </select>
      </label>
    </div>
  </div>

  <!-- Todos status -->
  <h2>
    {completedTodos} out of {totalTodos} items completed,
    <span class="txt-danger">{overdueTodos} item(s) overdue</span>
  </h2>
</section>

<section class="tasks">
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
    <!-- <button type="button">Check all</button> -->
    <!-- <button type="button">Remove completed</button> -->
  </div>
</section>

<style>
  section.input-and-filters {
    background-color: rgba(150, 138, 123, 0.5);
    padding: 1rem;
  }
  section.tasks {
    padding: 1rem;
  }
  h1 {
    margin-top: 0;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 0.6em;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  li {
    padding: 0.4rem;
    background-color: rgba(150, 138, 123, 0.3);
    border-radius: 5px;
  }

  li.completed {
    background-color: rgb(225, 230, 236);
    color: rgb(107, 107, 107);
  }

  li:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  button {
    font-size: smaller;
    padding: 0.4em 1em;
    margin-top: 0.5rem;
    background-color: #eee;
    border: 1px solid black;
    border-radius: 3px;
  }
  button:hover {
    cursor: pointer;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2em;
    font-size: smaller;
    gap: 0.5em;
  }
  .filters label {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .filters select {
    width: 10ch;
    background-color: #eee;
  }
  .top-title {
    display: flex;
    justify-content: space-between;
  }
  .top-title button {
    font-size: 10px;
    line-height: 10px;
    height: 20px;
  }
</style>
