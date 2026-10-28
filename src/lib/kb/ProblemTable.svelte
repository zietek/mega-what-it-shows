<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  // One row per problem in a merged ticket: the causes causes.ts knows, plus the reports the desk
  // read as a one-day move (desk-notes.json). Those stay counted where they're filed and get a
  // footnoted row of their own, because they are no swap at all.
  let { ticket, issues = {} }: { ticket: number; issues?: Record<string, string> } = $props();

  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  const groups = $derived(groupByCause(merged, tenantOf));
  const moves = $derived(
    groupByCause(merged.filter((r) => notes.oneDayMove.includes(r.id)), tenantOf).map((g) => ({ ...g, filedUnder: g.cause, cause: 'one-day move' as const })),
  );
  const rows = $derived([...groups, ...moves]);
</script>

<p class="sum">
  <strong>{merged.length}</strong> reports merged into #{ticket} · <strong>{rows.length}</strong> problems
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each rows as g (g.cause)}
      <tr>
        <td><code>{g.cause}</code></td>
        <td>{g.reports.length}{'filedUnder' in g ? '*' : ''}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>{#if issues[g.cause]}<a href={issues[g.cause]}>#{issues[g.cause].split('/').at(-1)}</a>{/if}</td>
      </tr>
    {/each}
  </tbody>
</table>

{#each moves as m (m.filedUnder)}
  <p class="note">* {m.reports.length} reports read as a one-day move; counted under <code>{m.filedUnder}</code> by tenant.</p>
{/each}

<style>
  .sum { font-size: 1.1rem; }
  .note { color: var(--muted); font-size: 0.85em; }
</style>
