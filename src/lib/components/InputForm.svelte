<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let subject = '';
  let task = '';
  let responsibleIntern = '';
  let responsibleExtern = '';
  let note = '';
  let dateAdded, dateDue;
  let completed = false;

  const emptyNewTodo = () => {
    subject = '';
    task = '';
    responsibleExtern = '';
    responsibleIntern = '';
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
    const newTodo = {
      subject,
      task,
      responsibleExtern,
      responsibleIntern,
      dateDue,
      dateAdded,
      note,
      completed
    };
    // dispatch new todo object to main app compoment
    dispatch('submit', newTodo);
    emptyNewTodo();
  };
</script>

<!-- Input form -->
<form on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <label
      >Task:
      <input class="input-wide" type="text" bind:value={task} />
    </label>
  </div>
  <div class="form-group">
    <label for="subject"
      >Category
      <input type="text" id="subject" bind:value={subject} />
    </label>
    <label for="responsibleIntern"
      >Resp.int.
      <input
        class="input-small"
        type="text"
        id="responsibleIntern"
        bind:value={responsibleIntern}
      />
    </label>
    <label for="responsibleExtern"
      >Resp.ext.
      <input
        class="input-small"
        type="text"
        id="responsibleExtern"
        bind:value={responsibleExtern}
      />
    </label>
    <label
      >Due:
      <input type="date" bind:value={dateDue} />
    </label>
    <label
      >Added:
      <input type="date" bind:value={dateAdded} />
    </label>
    <label for="note"
      >Note:
      <input class="input-wide" type="text" id="note" bind:value={note} placeholder="add notes" />
    </label>
  </div>
  <button class="submit" type="submit">Add task</button>
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
    gap: 1rem;
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
    height: 1.5em;
    padding: 0.1em 0.5em;
  }
  .input-wide {
    min-width: 50ch;
  }
  .input-small {
    max-width: 6ch;
  }
  button.submit {
    margin-top: 0.5rem;
  }
</style>
