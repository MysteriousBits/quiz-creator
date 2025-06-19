<script>
  import { page } from "$app/state";
</script>

<div class="backbox my-auto items-center max-w-3/4 min-w-3xs">
  <h1 class="text-3xl text-red-600">Error | {page.status}</h1>
  <p class="text-lg text-gray-500">{page.error.message}</p>
</div>