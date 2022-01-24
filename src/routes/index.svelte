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
        status: 'pending',
        note: ''
      }
    ]
  };
  let currentList = 'default';
  let subject, task, responsibleIntern, responsibleExtern, dateAdded, dateDue, status, note, id;

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
    id = todoLists[currentList].length + 1;
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
    todoLists[currentList].push(newTodo);
    todoLists = todoLists;
    console.log(newTodo);
  };
</script>

<main>
  <h1>Task manager</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <h2>Add new task</h2>
    <label
      >Subject
      <input type="text" bind:value={subject} placeholder="enter task subject" />
    </label>
    <label
      >Task:
      <input type="text" bind:value={task} placeholder="enter new task description" />
    </label>
    <label
      >Resp. internal:
      <input type="text" bind:value={responsibleIntern} placeholder="" />
    </label>
    <label
      >Resp. external:
      <input type="text" bind:value={responsibleExtern} />
    </label>
    <label
      >Due:
      <input type="date" bind:value={dateDue} />
    </label>
    <label
      >Added:
      <input type="date" bind:value={dateAdded} />
    </label>
    <label
      >Status:
      <input type="text" bind:value={status} />
    </label>
    <label
      >Notes:
      <input type="text" bind:value={note} placeholder="add notes" />
    </label>
    <button>Submit task</button>
  </form>

  <h2>Selected tasks</h2>

  <ul>
    {#each todoLists[currentList] as todo (todo.id)}
      <li>
        <div>
          <div>{todo.subject}:</div>
          <div class="task"><strong>{todo.task}</strong></div>
          <div>{todo.status}</div>
        </div>
        <div class="bottom-line">
          <div>resp. <strong>{todo.responsibleIntern}</strong></div>
          <div>ext.resp. <strong>{todo.responsibleExtern}</strong></div>
          <div class="notes">note: {todo.note}</div>
          <div>{todo.dateDue}</div>
        </div>
      </li>
    {/each}
  </ul>
</main>

<style>
  input {
    height: 1.5em !important;
  }
  main {
    padding: 1rem;
  }

  li {
    border: 1px solid black;
    padding: 0.4rem;
    background-color: beige;
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
