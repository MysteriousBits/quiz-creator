<script>
  import { toast } from "$lib/stores/store.svelte";

  let colors = { "success": "bg-green-400", "error": "bg-red-400", "loading": "bg-amber-500"};
</script>

{#if toast.message !== ""}
  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 {colors[toast.type]}
    text-white py-2 px-3 rounded-full z-100 max-w-60 text-center text-sm">
    <p class="font-bold">{toast.message}</p>
  </div>
{/if}