<script>
  let { title, quizId } = $props();

  let id = $state(quizId);
</script>

<div class="backbox my-auto py-6 px-10 space-y-6 max-w-150 min-w-60">
  <h2 class="text-4xl">{title} Quiz</h2>
  <form method="POST">
    <div class="flex flex-col items-start text-lg space-y-3 ">
      <div class="flex text-gray-900">
        <span class="mr-5">Quiz Id:</span>
        <span>
          <input type="number" name="id" bind:value={id} placeholder="example: 123456" readonly={quizId !== ""}>
        </span>
      </div>
      {#if quizId === ""}
        <p class="text-sm text-gray-400 -mt-2">Find the link if you dont remember the id</p>
      {/if}
      <label class="flex">
        <span class="mr-2">Passkey:</span>
        <input type="text" name="pass" value="" placeholder="example: MAT-102@xyz">
      </label>
      <div class="items-center mt-4 mx-auto">
        <button class="btn-base">{title}</button>
      </div>
    </div>
  </form>
</div>