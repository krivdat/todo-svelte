<script>
  let todoLists = {
    default: [
      {
        id: 1,
        subject: 'general',
        task: 'do something',
        responsibleIntern: 'MH',
        responsibleExtern: 'RTC',
        dateAdded: '2022-01-21',
        dateDue: '2022-01-30',
        status: 'pending'
      }
    ]
  };
  let currentList = 'default';
  let subject, task, responsibleIntern, responsibleExtern, dateAdded, dateDue, status;

  const handleSubmit = () => {
    // handle submit new todo
  };
</script>

<main>
  <h1>Task manager</h1>

  <form action="" on:submit|preventDefault={handleSubmit}>
    <label for="task">New task:</label>
    <input
      type="text"
      bind:value={task}
      placeholder="enter new task description"
      name="task"
      id="task"
    />
  </form>

  <h2>Selected tasks</h2>

  <ul>
    {#each todoLists[currentList] as todo (todo.id)}
      <li>
        <div><strong>{todo.subject}: </strong></div>
        <div class="task">{todo.task}</div>
        <div>{todo.responsibleIntern}</div>
        <div>{todo.responsibleExtern}</div>
        <div>{todo.dateDue}</div>
        <div>{todo.status}</div>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    padding: 1rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background-color: beige;
    padding-left: 8px;
    padding-right: 8px;
  }
  .task {
    flex-grow: 4;
  }
</style>
