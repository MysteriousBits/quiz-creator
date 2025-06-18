<script>
  import { redirect } from "@sveltejs/kit";
  import { goto } from '$app/navigation';
</script>

<div class="backbox my-auto min-w-60 max-w-130 p-8">
  <h1 class="font-bold text-5xl text-fuchsia-600">Quiz Creator</h1>
  <p class="text-gray-500 text-base text-center">Quiz Creator is a simple online tool for making timed quizes
    consisting of multiple choice questions. Just share the generated unique link of a quiz with the people
    to let them participate the test. You can view the submissions and modify your quiz later. So start creating now!
  </p>
  <div class="flex justify-around space-x-12">
    <button class="btn-base" onclick={() => goto('/create')}>Create Quiz</button>
    <button class="btn-base" onclick={() => goto('/manage')}>Manage Quiz</button>
  </div>
</div>