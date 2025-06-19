<script>
  import Crossbutton from "./Crossbutton.svelte";
  import { success } from "$lib/stores/store.svelte";

  let { toggleSubmission, link } = $props();

  function copy() {
    navigator.clipboard.writeText(link).then(() => success("Copied"));
  }
</script>

<!-- Overlay -->
<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2">
  <div class="bg-gray-100 py-1 px-3 rounded-xl shadow-xl flex flex-col space-y-3 max-w-screen">
    <div class="flex justify-end">
      <Crossbutton fn={toggleSubmission}/>
    </div>
    <div class="flex flex-col items-center p-3 space-y-4">
      <p class="font-bold text-lg text-center">Share this link with the participants:</p>
      <div class="mx-auto outline-2 outline-gray-400 p-2 rounded max-w-full overflow-hidden">
        <p class="text-center text-lg text-gray-600">{link}</p>
      </div>
      <button class="btn-base" onclick={copy}>Copy</button>
    </div>
  </div>
</div>
