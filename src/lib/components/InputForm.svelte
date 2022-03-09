<script>
  import { createEventDispatcher } from 'svelte';

  let _id = '';
  let subject = '';
  let task = '';
  let responsibleExtern = '';
  let responsibleIntern = '';
  let note = '';
  let dateAdded = '';
  let dateDue = '';
  let completed = false;
  let priority = '0';

  let taskFieldRef;

  export function setFormContent(content) {
    _id = content._id;
    subject = content.subject;
    task = content.task;
    responsibleExtern = content.responsibleExtern;
    responsibleIntern = content.responsibleIntern;
    note = content.note;
    dateAdded = content.dateAdded;
    dateDue = content.dateDue;
    completed = content.completed;
    priority = content.priority;

    taskFieldRef.focus();
  }

  const dispatch = createEventDispatcher();

  const emptyNewTodo = () => {
    _id = '';
    subject = '';
    task = '';
    responsibleExtern = '';
    responsibleIntern = '';
    note = '';
    dateAdded = '';
    dateDue = '';
    priority = '0';
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
    const newTodo = {
      _id,
      subject,
      task,
      responsibleExtern,
      responsibleIntern,
      dateDue,
      dateAdded,
      note,
      completed,
      priority
    };
    // dispatch new todo object to main app component
    dispatch('submit', newTodo);
    emptyNewTodo();
  };
</script>

<!-- Input form -->
<form on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <label class="input-wide"
      >Task
      <input type="text" bind:value={task} bind:this={taskFieldRef} />
    </label>
  </div>
  <div class="form-group">
    <label for="subject"
      >Category
      <input type="text" id="subject" bind:value={subject} />
    </label>
    <label class="input-small" for="responsibleIntern"
      >Resp.
      <input type="text" id="responsibleIntern" bind:value={responsibleIntern} />
    </label>
    <label class="input-small" for="responsibleExtern"
      >Ext.
      <input type="text" id="responsibleExtern" bind:value={responsibleExtern} />
    </label>
    <label
      >Due date (default today)
      <input type="date" bind:value={dateDue} />
    </label>
    <label
      >Added (default today)
      <input type="date" bind:value={dateAdded} />
    </label>
    <label
      >Priority
      <select name="priority" id="priority" bind:value={priority}>
        <option value="0">std</option>
        <option value="1">high</option>
        <option value="2">top</option>
      </select>
    </label>
    <label class="input-wide" for="note"
      >Note:
      <input type="text" id="note" bind:value={note} />
    </label>
  </div>
  <button type="submit">Add task</button>
</form>

<style>
  form {
    margin-bottom: 1rem;
  }
  .form-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.5em;
  }
  .form-group > * {
    flex-grow: 1;
  }
  label {
    display: flex;
    flex-direction: column;
    font-size: smaller;
  }
  input {
    padding: 0.3em 0.5em;
    border: 1px solid #666;
    border-radius: 2px;
    box-shadow: inset 0 0 5px #bbb;
  }
  .input-wide {
    min-width: 50ch;
  }
  .input-small {
    max-width: 12ch;
  }

  button {
    padding: 0.4em 1em;
    margin-top: 0.5rem;
    background-color: rgba(150, 138, 123, 1);
    color: white;
    border: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
  button:hover {
    cursor: pointer;
    opacity: 0.8;
  }
</style>
