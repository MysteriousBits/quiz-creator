<script>
  import { page } from "$app/state";
  import { err } from "$lib/stores/store.svelte.js";

  let { data, form } = $props();

  if (form?.error) err(form.error);
</script>

<div class="backbox my-auto w-1/2 min-w-2xs max-w-180">
  <div class="flex flex-col w-full space-y-2">
    <h1 class="text-4xl text-center">{data.title}</h1>
    <h3 class="text-lg text-gray-600 text-center font-bold">Time: {data.time} {data.time === 1 ? "minute" : "minutes"}</h3>
  </div>
  <p class="mb-12 text-gray-600 text-center break-all">{data.desc}</p>

  <form method="POST" class="w-full space-y-12">
    <div class="grid-fields grid-cols-[1fr_2fr] gap-x-6 gap-y-4 w-full">
      {#each data.requiredFields as field, i}
        <label for={field} class="font-bold">{field}</label>
        <span class=" flex space-x-2 text-lg md:text-xl">
          <p class="pr-2">:</p>
          <input type="text" name={i} id={field} required>
        </span>
      {/each}
    </div>
    <div class="flex w-full justify-between px-6 items-center">
      <a href={`/manage/${data.quizId}`} class="btn-base">Manage Quiz</a>
      <button type="submit" class="btn-base bg-red-600 hover:bg-red-400 px-6">Start</button>
    </div>
  </form>
</div>