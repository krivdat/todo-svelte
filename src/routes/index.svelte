<script>
  import Todos from '../components/Todos.svelte';

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
</script>

<svelte:head>
  <title>Todo List</title>
</svelte:head>

<Todos todos={todoLists[currentList]} />
