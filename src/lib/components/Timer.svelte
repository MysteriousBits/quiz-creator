<script>
  import { onMount } from "svelte";

  let { rem, stop } = $props();
  let min = $state(0);
  let sec = $state(0);
  let lst = 0;

  onMount(() => {
    let interval = setInterval(() => {
      rem -= performance.now() - lst;
      lst = performance.now();
  
      min = Math.floor(rem / 60000);
      sec = Math.floor(rem / 1000) % 60;
  
      if (rem <= 0) {
        min = sec = 0;
        clearInterval(interval);
        stop();
      }
    }, 1000);
  });
</script>

<div class="fixed top-2 left-1 p-2 bg-gray-50 rounded-lg">
  <div class="flex flex-col items-center">
    <!-- <h4 class="text-center text-gray-500 text-sm">Remaining:</h4> -->
    <div class="flex space-x-1 text-xl md:text-2xl font-bold">
      <span class="text-right">{min}</span>
      <span>:</span>
      <span class="text-left w-[2ch]">{sec.toString().padStart(2, '0')}</span>
    </div>
  </div>
</div>