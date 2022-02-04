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
    <label class="form-input-wide"
      >Task:
      <input type="text" bind:value={task} placeholder="enter new task description" />
    </label>
  </div>
  <div class="form-group">
    <label for="subject"
      >Subject
      <input type="text" id="subject" bind:value={subject} placeholder="enter task subject" />
    </label>
    <label for="responsibleIntern" class="form-input-small"
      >Resp.int.
      <input type="text" id="responsibleIntern" bind:value={responsibleIntern} />
    </label>
    <label for="responsibleExtern" class="form-input-small"
      >Resp.ext.
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
    <label class="form-input-wide" for="note"
      >Note:
      <input type="text" id="note" bind:value={note} placeholder="add notes" />
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
  label {
    display: inline-block;
    font-size: small;
  }
  input {
    height: 1.5em;
    width: 100%;
  }
  .form-input-wide {
    min-width: 40ch;
    flex-grow: 1;
  }
  .form-input-small {
    max-width: 8ch;
    flex-grow: 0;
  }
  button.submit {
    margin-top: 0.5rem;
  }
</style>
