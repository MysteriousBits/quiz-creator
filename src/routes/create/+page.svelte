<script>
  import Loadingform from '$lib/components/Loadingform.svelte';
  import { err } from '$lib/stores/store.svelte.js';

  let { data, form } = $props();

  if (form?.error) err(form.error);
</script>

<Loadingform title="Create" quizId={data.quizId}/>