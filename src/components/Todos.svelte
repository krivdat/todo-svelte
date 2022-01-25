<script>
  export let todos = [];

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter((todo) => todo.status == 'completed').length;
  $: overdueTodos = todos.filter((todo) => todo.status == 'overdue').length;
  let subject = '';
  let task = '';
  let responsibleIntern = '';
  let responsibleExtern = '';
  let note = '';
  let status = '';
  let dateAdded, dateDue, id;

  const emptyNewTodo = () => {
    subject = '';
    task = '';
    responsibleExtern = '';
    responsibleIntern = '';
    status = '';
    note = '';
  };

  const handleSubmit = () => {
    if (!dateAdded) {
      const date = new Date();
      dateAdded =
        date.getFullYear() +
        '-' +
        (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
        '-' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
    }
    if (!dateDue) {
      const date = new Date();
      date.setDate(date.getDate() + 7); //default due after 7 days
      dateDue =
        date.getFullYear() +
        '-' +
        (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
        '-' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
    }
    id = todos.length + 1;
    status = status ? status : 'pending'; // default status will be pending
    const newTodo = {
      subject,
      task,
      responsibleExtern,
      responsibleIntern,
      dateDue,
      dateAdded,
      status,
      note,
      id
    };
    todos.push(newTodo);
    todos = todos;
    emptyNewTodo();
    // console.log(newTodo);
  };
</script>

<main>
  <h1>Task manager</h1>

  <!-- Input form -->
  <form on:submit|preventDefault={handleSubmit}>
    <h2>Add new task</h2>
    <label for="subject"
      >Subject
      <input type="text" id="subject" bind:value={subject} placeholder="enter task subject" />
    </label>
    <label
      >Task:
      <input type="text" bind:value={task} placeholder="enter new task description" />
    </label>
    <label for="responsibleIntern"
      >Resp. internal:
      <input type="text" id="responsibleIntern" bind:value={responsibleIntern} placeholder="" />
    </label>
    <label for="responsibleExtern"
      >Resp. external:
      <input type="text" id="responsibleExtern" bind:value={responsibleExtern} />
    </label>
    <label
      >Due:
      <input type="date" bind:value={dateDue} />
    </label>
    <label
      >Added:
      <input type="date" bind:value={dateAdded} />
    </label>
    <label for="status"
      >Status:
      <input type="text" id="status" bind:value={status} />
    </label>
    <label for="note"
      >Notes:
      <input type="text" id="note" bind:value={note} placeholder="add notes" />
    </label>
    <button type="submit">Add task</button>
  </form>

  <!-- Filter -->
  <div class="filters">
    <button>All</button>
    <button>Pending</button>
    <button>Overdue</button>
    <button>Completed</button>
  </div>

  <!-- Todos status -->
  <h2>
    {completedTodos} out of {totalTodos} items completed,
    <span class="txt-danger">{overdueTodos} item(s) overdue</span>
  </h2>

  <!-- List of todos -->
  <h2>Selected tasks</h2>

  <ul>
    {#each todos as todo (todo.id)}
      <li>
        <div>
          <div>{todo.subject}:</div>
          <div class="task"><strong>{todo.task}</strong></div>
          <div>{todo.status}</div>
          <div>
            <button type="button">Delete</button>
            <button type="button" on:click={() => (todo.status = 'completed')}> Done </button>
          </div>
        </div>
        <div class="bottom-line">
          <div>resp.int. <strong>{todo.responsibleIntern}</strong></div>
          <div>resp.ext. <strong>{todo.responsibleExtern}</strong></div>
          <div class="notes">note: {todo.note}</div>
          <div>{todo.dateDue}</div>
        </div>
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
</main>

<style>
  input {
    height: 1.5em !important;
  }
  main {
    padding: 1rem;
  }

  li {
    padding: 0.4rem;
    background-color: beige;
  }

  li:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  li > div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-left: 8px;
    padding-right: 8px;
  }
  .task,
  .notes {
    flex-grow: 5;
  }

  .bottom-line {
    font-size: small;
  }
</style>
