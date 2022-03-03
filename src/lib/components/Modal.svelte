<script>
  import Button from '$lib/components/Button.svelte';

  let visible = false;
  let promiseResolve;
  let message = '';

  export function open(msg) {
    message = msg;
    visible = true;
    return new Promise((resolve, reject) => {
      promiseResolve = resolve;
    });
  }

  function confirm() {
    visible = false;
    message = '';
    promiseResolve('confirmed');
  }

  function cancel() {
    visible = false;
    message = '';
    promiseResolve('cancelled');
  }
</script>

{#if visible}
  <div class="background">
    <div class="modal">
      <i class="fa fa-question-circle" aria-hidden="true" />
      <p>{message}</p>
      <div class="buttons">
        <Button type="button" purpose="danger" on:clicked={confirm}>Confirm</Button>
        <Button type="button" purpose="cancel" on:clicked={cancel}>Cancel</Button>
      </div>
    </div>
  </div>
{/if}

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    width: 100%;
    max-width: 40ch;
    min-height: 3rem;
    margin: 1em;
    padding: 1em;
    text-align: center;
    background-color: #ececec;
    color: #222;
    /* border: 3px solid rgb(218, 59, 59); */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 9999;
  }
  .fa-question-circle {
    font-size: 2em;
    /* color: rgb(218, 59, 59); */
  }
</style>
