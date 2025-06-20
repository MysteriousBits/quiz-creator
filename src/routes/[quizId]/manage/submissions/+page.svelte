<script>
    import { startLoading, stopLoading } from '$lib/stores/store.svelte.js';

  const { data } = $props();
  let { requiredFields, submissions } = data;

  function csvRow(row) {
    return row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',');
  }

  function exportCSV() {
    startLoading();
    
    const headers = csvRow([...requiredFields, 'Score']);
    const rows = submissions.map(submission => csvRow([...submission.requiredFields, String(submission.score)]));
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "submissions.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    stopLoading();
  }
</script>

<div class="backbox my-auto min-w-xs w-1/2 items-center">
  <h2 class="text-3xl text-center">Submissions</h2>

  <table class="text-center table-fixed w-full">
    <thead class="font-bold">
      <tr>
        <th>No.</th>
        <th>{requiredFields[0]}</th>
        <th>Score</th>
      </tr>
    </thead>

    <tbody class="text-lg">
      {#each submissions as submission, i}
        <tr>
          <td>{i + 1}.</td>
          <td>{submission.requiredFields[0]}</td>
          <td>{submission.score}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if submissions.length === 0}
      <p class="text-gray-500"><i>No submissions yet</i></p>
  {:else}
      <button class="btn-base" onclick={exportCSV}>Export</button>
  {/if}
</div>