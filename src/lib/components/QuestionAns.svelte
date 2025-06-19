<script>
  let { idx, ques, ans = $bindable() } = $props();
</script>

<div class="backbox question space-y-3 items-start">
  <h2 class="text-left text-xl md:text-2xl w-full">{idx}.</h2>
  <div class="outline-2 outline-violet-300 rounded p-2 w-full break-all">
    <p class="text-left md:text-lg overflow-hidden">{ques.txt}</p>
  </div>
  <div class="flex flex-col w-full items-start space-y-2 ml-1">
    {#each ques.options as option, i}
      <div class="space-x-3 flex w-full">
        <input name={idx} type="radio" value={i} bind:group={ans}>
        <p class="w-full text-left">{option}</p>
        </div>
      {/each}
  </div>
</div>