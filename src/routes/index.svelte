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
  let subject, task, responsibleIntern, responsibleExtern, dateAdded, dateDue, status, notes;

  const handleSubmit = () => {
    // handle submit new todo

    if (!dateAdded) {
      const date = new Date();
      dateAdded =
        date.getFullYear() +
        '-' +
        (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
        '-' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
    }
    const newTodo = {
      subject,
      task,
      responsibleExtern,
      responsibleIntern,
      dateDue,
      dateAdded,
      status,
      notes
    };
    console.log(newTodo);
  };
</script>

<main>
  <h1>Task manager</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <h2>Add new task</h2>
    <label
      >Subject
      <input type="text" bind:value={subject} placeholder="subject" />
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
      <input type="text" bind:value={notes} placeholder="add notes" />
    </label>
    <button>Submit task</button>
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
