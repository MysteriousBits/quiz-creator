<script>
  import Crossbutton from "$lib/components/Crossbutton.svelte";
  import { fly, slide } from 'svelte/transition'

  let { idx, dlt, ques=$bindable() } = $props();
</script>

<div class="backbox question space-y-3 items-start"
  in:fly={{ x: -500, duration: 1000 }} out:slide={{ duration: 500 }}>
  <h2 class="text-left text-xl md:text-2xl w-full">{idx}.</h2>
  <textarea type="text" rows="1" bind:value={ques.txt} placeholder="Type question here"
    class="text-left md:text-lg overflow-hidden"
    oninput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
    ></textarea>
  <div class="flex flex-col w-full items-start space-y-2 ml-1">
    {#each ques.options as option, i}
      <div class="space-x-3 flex w-full" in:fly={{ y: 40, duration: 500}}>
        <input name={idx} type="radio" value={i} bind:group={ques.ans}>
        <input type="text" bind:value={ques.options[i]} class="w-1/2" placeholder="Option here">
        <Crossbutton fn={() => ques.options.splice(i, 1)}/>
        </div>
      {/each}
      <button class="text-gray-400 hover:text-gray-600 ml-1"
        onclick={() => {ques.options.push(`Option ${ques.options.length + 1}`);}}>+ Add option</button>
  </div>
  <div class="flex justify-end w-full">
    <button class="btn-base bg-red-600 hover:bg-red-400 text-lg"
      onclick={dlt}>Delete</button>
  </div>
</div>