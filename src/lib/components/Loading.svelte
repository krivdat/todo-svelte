<script>
  import { loading } from '$lib/loading';

  $: if ($loading.status === 'NAVIGATING') {
    setTimeout(() => {
      if ($loading.status === 'NAVIGATING') {
        $loading.status = 'LOADING';
      }
    }, 400);
  }
</script>

<!-- {$loading.status} -->

{#if $loading.status === 'LOADING'}
  <i class="fa fa-spinner" aria-hidden="true" />
{/if}

<style>
  i {
    --size: 100px;
    font-size: var(--size);
    position: fixed;
    top: 0;
    left: 0;
    inset: calc(50% - calc(var(--size) / 2));
    color: purple;
    /* height: var(--size); */
    /* width: var(--size); */
    animation: moveLoader 1s infinite alternate;
  }

  @keyframes moveLoader {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
</style>
