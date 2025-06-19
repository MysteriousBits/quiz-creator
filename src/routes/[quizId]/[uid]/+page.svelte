<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import QuestionAns from "$lib/components/QuestionAns.svelte";
  import Timer from "$lib/components/Timer.svelte";
  import { err, startLoading, success } from "$lib/stores/store.svelte.js";

  const { data } = $props();
  const { title, desc, questions, rem, error } = data;
  
  let ans = $state();
  if (!error) ans = new Array(questions.length).fill(-1);

  $effect(() => {
    if (error) {
      err(error);
      goto('/');
    }
  });

  async function submitQuiz() {
    startLoading();
    const response = await fetch(page.url.pathname + '/submit', {
      method: 'POST',
      body: JSON.stringify({ ans }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      success("Submission Accepted");
    } else {
      const { message } = await response.json();
      err(message);
    }

    goto('/');
  }
</script>

<div class="backbox question">
  <h1 class="text-4xl text-center mb-2">{title}</h1>
  <p class="text-center text-base md:text-lg text-gray-600">{desc}</p>
</div>

{#each questions as ques, i}
  <QuestionAns idx={i + 1} value={i} {ques} bind:ans={ans[i]}/>
{/each}

<div class="backbox question bg-transparent outline-none items-center">
    <button class="btn-base bg-red-600 hover:bg-red-400 px-10"
      onclick={submitQuiz}> Submit </button>
</div>

<Timer {rem} stop={submitQuiz}/>