<script context="module">
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  export async function load({ fetch, params, session }) {
    if (!session?.user) {
      return {
        status: 302,
        redirect: '/sign-in'
      };
    }

    const list = params.list;
    try {
      const res1 = await fetch(`/api/todos.json?list=${list}`);
      const { todos } = await res1.json();
      const res2 = await fetch('/api/projects.json');
      const { projects } = await res2.json();
      const project = projects.find((item) => item.shortTitle === list);

      if (res1.ok && res2.ok) {
        const completedList = todos.filter((item) => item.completed);
        const uncompletedList = todos.filter((item) => !item.completed);
        uncompletedList.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue));
        completedList.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue));
        const sortedList = [...uncompletedList, ...completedList];
        return {
          props: { todos: sortedList, list, user: session.user, project }
        };
      }

      return {
        status: `${res1.status} and ${res2.status}`,
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
  import { fade, slide } from 'svelte/transition';
  import Todo from '$lib/components/Todo.svelte';
  import InputForm from '$lib/components/InputForm.svelte';
  import Modal from '$lib/components/Modal.svelte';

  export let todos;
  export let list;
  export let user;
  export let project;
  // console.log({ project });

  let modal;
  let filterRules = {};
  let respIntSelected = '';
  let respExtSelected = '';
  let prioritySelected = '';
  let showInputForm = true;
  let inputForm;

  $: todosFiltered = filterTodos(
    todos,
    filterRules,
    respIntSelected,
    respExtSelected,
    prioritySelected
  );
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
        const completedList = data.todos.filter((item) => item.completed);
        const uncompletedList = data.todos.filter((item) => !item.completed);
        uncompletedList.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue));
        completedList.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue));
        todos = [...uncompletedList, ...completedList];
      }
    } catch (error) {
      return new Error('Could not fetch list of todos');
    }
  }

  function filterTodos(list, rules, respInt, respExt, priority) {
    // console.log('Inside filter function. ', { rules }, { respIntSelected }, { respExtSelected });
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
        (respExt != '' && todo.responsibleExtern != respExt) ||
        (priority != '' && priority != '0' && todo.priority != priority) ||
        (priority === '0' && !todo.priority == ('0' || ''))
      ) {
        return false;
      }
      return true;
    });

    return result;
  }

  async function handleSubmit({ detail }) {
    let res;
    try {
      if (detail._id === '') {
        // add new todo
        const { _id, ...todo } = detail;
        res = await fetch(`/api/todos.json?list=${list}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todo)
        });
      } else {
        // update existing todo
        const { _id, ...change } = detail;

        res = await fetch(`/api/todos.json?list=${list}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ _id, change })
        });
      }

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
    const response = await modal.open('Do you really want to delete toto item?');
    if (response === 'cancelled') {
      return null;
    }
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

  async function handleComplete(_id) {
    const todo = todos.find((todo) => todo._id == _id);
    try {
      const res = await fetch(`/api/todos.json?list=${list}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id,
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

  function handleEditTodo(id) {
    const editedTodo = todos.find((todo) => todo._id == id);
    inputForm.setFormContent(editedTodo);
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

<Modal bind:this={modal} />

<section class="input-and-filters">
  <div class="top-title">
    <h1>Task manager - {project.fullTitle}</h1>
    <button on:click={() => (showInputForm = !showInputForm)} title="show/hide input form">
      {#if showInputForm}
        ▲
      {:else}
        ▼
      {/if}
    </button>
  </div>

  <div transition:slide class:hidden={!showInputForm}>
    <InputForm bind:this={inputForm} on:submit={handleSubmit} />
  </div>

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
      <label for="filterPriority"
        ><span>priority</span>
        <select name="filterPriority" id="filterPriority" bind:value={prioritySelected}>
          <option value="">all</option>
          <option value="0">std</option>
          <option value="1">high</option>
          <option value="2">top</option>
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
        <Todo
          {todo}
          on:delete={handleDelete(todo._id)}
          on:complete={handleComplete(todo._id)}
          on:edit={handleEditTodo(todo._id)}
        />
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
    /* background-color: rgb(225, 230, 236); */
    /* color: rgb(107, 107, 107); */
    opacity: 0.5;
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
    opacity: 0.8;
  }
  button:active {
    box-shadow: inset 0 0 3px #666;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
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
  .hidden {
    height: 0;
    overflow: hidden;
  }
</style>
