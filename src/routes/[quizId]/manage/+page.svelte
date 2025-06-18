<script>
  import QuestionCreate from "$lib/components/QuestionCreate.svelte";
  import Crossbutton from "$lib/components/Crossbutton.svelte";
  import Sharepage from "$lib/components/Sharepage.svelte";
  import { tick } from 'svelte';
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
    import { err, success } from "$lib/stores/store.svelte.js";

  let { data } = $props();
  let { uid, infos, requiredFields, questions } = $state(data);
  let id = questions[questions.length - 1].id;

  let submissionpage = $state(false);

  async function addQuestion() {
    ++id;
    questions.push({ id: id, txt: "", options: ["Option 1"], ans : 0 });

    await tick();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  function toggleSubmission() { submissionpage = !submissionpage; }

  async function dlt() {
    const reply = confirm("Do you want to delete this quiz parmanently?");

    if (reply) {
      const response = await fetch(page.url.pathname + '/delete');

      const msg = await response.json();
      if (msg.error) err(msg.error);
      else {
        success(msg.success);
        goto('/');
      }
    }
  }

  async function saveQuiz() {
    const response = await fetch(page.url.pathname + '/save', {
      method: 'POST',
      body: JSON.stringify({ infos, requiredFields, questions }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { error } = await response.json();

    if (error) err(error);
    else success("Saved")
  }
</script>

<!-- Infos -->
<div class="backbox question">
  <h1 class="text-5xl text-center font-bold text-fuchsia-600">Create Quiz</h1>
  <div class="flex flex-col text-left space-y-3 w-full items-center">
    <h4 class="font-bold text-lg md:text-xl">Actions:</h4>
    <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between
      outline-gray-300 outline-2 rounded-lg py-2 px-3 md:space-x-3 mb-12">
      <button class="btn-base" onclick={toggleSubmission}>Share</button>
      <button class="btn-base" onclick={() => goto(page.url.pathname + '/submissions')}>Submissions</button>
      <button class="btn-base bg-red-600 hover:bg-red-400" onclick={dlt}>Delete</button>
    </div>
    <div class="grid-fields">
      <h4 class="font-bold text-lg md:text-xl">Title:</h4>
      <input type="text" bind:value={infos.title} placeholder="Untitled" class="text-lg md:text-xl" required>
      <h5 class="font-bold md:text-lg">Time(Minutes):</h5>
      <input type="number" bind:value={infos.time} class="text-lg md:text-lg" required>
      <h5 class="font-bold md:text-lg col-span-2">Description:</h5>
      <textarea placeholder="Description..." bind:value={infos.desc}
        class="md:text-lg min-h-20 col-span-2"></textarea>
    </div>
  </div>
</div>

<!-- Required -->
<div class="backbox question">
  <h2 class="text-2xl md:text-3xl">Required*</h2>
  <div class="grid-fields grid-cols-[1fr_2fr_auto] gap-x-6 gap-y-4">
    {#each requiredFields as field, i}
      <input type="text" bind:value={requiredFields[i]} placeholder="New field" required
        class="font-bold text-lg md:text-lg border-2 rounded px-2">
      <span class=" flex space-x-2 text-lg md:text-xl">
        <p>:</p>
        <input type="text" placeholder="Required*" disabled>
      </span>
      <Crossbutton fn={() => requiredFields.splice(i, 1)}/>
    {/each}
  </div>
  <div class="flex w-full justify-end mt-3">
    <button class="btn-base text-lg"
      onclick={() => requiredFields.push("")}>+ Add Field</button>
  </div>
</div>

<!-- Questions -->
{#each questions as ques, i (ques.id)}
  <QuestionCreate idx={i + 1} bind:ques={questions[i]}
    dlt={() => questions.splice(i, 1)}/>
{/each}

<div class="backbox question bg-transparent outline-none flex-row space-y-0 space-x-6 justify-center">
    <button class="btn-base bg-purple-500 hover:bg-purple-400"
      onclick={addQuestion}
      >+ Add Question</button>
      <button class="btn-base bg-emerald-500 hover:bg-emerald-400 px-6 md:px-10"
        onclick={saveQuiz}> Save </button>
</div>

{#if submissionpage}
  <Sharepage { toggleSubmission } link={window.location.href.slice(0, -6) + uid}/>
{/if}