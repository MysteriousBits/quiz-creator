<script>
	import '../app.css';
  import Toast from '$lib/components/Toast.svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { startLoading, stopLoading } from '$lib/stores/store.svelte';

  let { children } = $props();

  beforeNavigate(startLoading);
  afterNavigate(stopLoading);
</script>

<div class="container flex flex-col mx-auto min-h-screen bg-none p-6 space-y-8">
	{@render children()}
</div>

<!-- Home button -->
<div class="fixed bottom-2 left-2 bg-gray-100/60 w-10 h-10 rounded hover:bg-gray-400/40 p-1">
  <a href="/"><img src="/icon.png" alt="Home"></a>
</div>

<Toast/>
