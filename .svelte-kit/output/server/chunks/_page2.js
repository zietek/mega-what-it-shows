import { i as __exportAll, t as Runbook } from "./runbook.js";
import { c as stringify, f as escape_html, n as derived, o as sanitize_props, r as ensure_array_like, s as spread_props, t as attr_class, u as attr } from "./server.js";
import { n as reports_4471_default, t as desk_notes_default } from "./desk-notes.js";
import { a as groupByCause, c as ticketCause, l as uniqueById, o as readAs, r as tenantOf, t as Callout } from "./Callout.js";
// src/lib/kb/CauseTable.svelte
function CauseTable($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ticket } = $$props;
		const merged = derived(() => uniqueById(reports_4471_default).filter((r) => r.mergedInto === ticket));
		const groups = derived(() => groupByCause(merged(), tenantOf));
		const owner = derived(() => ticketCause(groups(), ticket));
		const tags = (g) => Object.entries(g.taggedAs).sort((a, b) => b[1] - a[1]).map(([tag, n]) => `${tag} ×${n}`).join(" · ");
		$$renderer.push(`<p class="sum svelte-12oyimm"><strong>${escape_html(merged().length)}</strong> reports merged into #${escape_html(ticket)} · <strong>${escape_html(groups().length)}</strong> ${escape_html(groups().length === 1 ? "cause" : "causes")}</p> <table><thead><tr><th>cause</th><th>reports</th><th>tagged as</th><th>tenants</th><th>seen</th><th></th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(groups());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let g = each_array[$$index];
			$$renderer.push(`<tr${attr_class("svelte-12oyimm", void 0, { "wrong": g.cause !== owner() })}><td class="svelte-12oyimm"><code>${escape_html(g.cause)}</code></td><td class="svelte-12oyimm">${escape_html(g.reports.length)}</td><td class="tags svelte-12oyimm">${escape_html(tags(g))}</td><td class="svelte-12oyimm">${escape_html(g.tenants)}</td><td class="svelte-12oyimm">${escape_html(g.firstSeen)} → ${escape_html(g.lastSeen)}</td><td class="svelte-12oyimm">${escape_html(g.cause === owner() ? `#${ticket}` : "not this ticket — no ticket of its own")}</td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table> <!--[-->`);
		const each_array_1 = ensure_array_like(groups());
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let g = each_array_1[$$index_1];
			const moved = readAs(g, desk_notes_default.oneDayMove);
			if (moved) $$renderer.push(`<!--[0--><p class="note svelte-12oyimm">${escape_html(moved)} reports read as a one-day move; filed under <code>${escape_html(g.cause)}</code> by tenant.</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// src/lib/kb/QueueTimeline.svelte
function QueueTimeline($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ticket, from = "2026-03-30", to = "2026-10-05" } = $$props;
		const WEEK = 6048e5;
		const day = (iso) => Date.parse(iso.slice(0, 10));
		const weeks = derived(() => {
			const start = day(from);
			const count = Math.ceil((day(to) - start) / WEEK);
			const rows = Array.from({ length: count }, (_, i) => ({
				at: start + i * WEEK,
				received: 0,
				merged: 0
			}));
			const weekOf = (iso) => rows[Math.floor((day(iso) - start) / WEEK)];
			for (const r of uniqueById(reports_4471_default)) {
				if (r.mergedInto !== ticket) continue;
				const rIn = weekOf(r.receivedAt);
				if (rIn) rIn.received++;
				const rMerged = r.mergedAt ? weekOf(r.mergedAt) : void 0;
				if (rMerged) rMerged.merged++;
			}
			return rows;
		});
		const max = derived(() => Math.max(...weeks().flatMap((w) => [w.received, w.merged])));
		const label = (ms) => new Date(ms).toISOString().slice(5, 10);
		const h = (n) => n / max() * 100;
		$$renderer.push(`<figure><svg${attr("viewBox", `0 0 ${stringify(weeks().length * 24)} 140`)} role="img"${attr("aria-label", `reports received and merged into #${stringify(ticket)}, per week`)} class="svelte-18a6qal"><!--[-->`);
		const each_array = ensure_array_like(weeks());
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let w = each_array[i];
			$$renderer.push(`<rect class="in svelte-18a6qal"${attr("x", i * 24 + 2)}${attr("y", 110 - h(w.received))} width="9"${attr("height", h(w.received))}></rect><rect class="merged svelte-18a6qal"${attr("x", i * 24 + 12)}${attr("y", 110 - h(w.merged))} width="9"${attr("height", h(w.merged))}></rect>`);
			if (i % 4 === 0) $$renderer.push(`<!--[0--><text${attr("x", i * 24 + 12)} y="128" class="svelte-18a6qal">${escape_html(label(w.at))}</text>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></svg> <figcaption class="svelte-18a6qal"><span class="key in svelte-18a6qal"></span> received · <span class="key merged svelte-18a6qal"></span> merged into #${escape_html(ticket)} · per week</figcaption></figure>`);
	});
}
// src/routes/kb/incidents/4471/+page.svx
var _page_exports = /* @__PURE__ */ __exportAll({
	default: () => _page_svx,
	metadata: () => metadata
});
var metadata = {
	"layout": "runbook",
	"title": "#4471 · dates parse mm/dd in eu locales",
	"owner": "support desk",
	"status": "known",
	"reviewed": "2026-09-30T00:00:00.000Z"
};
var { layout, title, owner, status, reviewed } = metadata;
function _page_svx($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	Runbook($$renderer, spread_props([
		$$sanitized_props,
		metadata,
		{
			children: ($$renderer) => {
				$$renderer.push(`<p>Since April, people have told us their bookings land on the wrong day: a month flipped. By
4 October the desk had <strong>412 reports</strong>.</p> <p><strong>Merged as one issue.</strong> The parser reads dates month first, and our tenants write the day
first. The fix is queued.</p> `);
				Callout($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<!---->Known. One issue, one fix queued.`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> <h2>What was merged</h2> `);
				CauseTable($$renderer, { ticket: 4471 });
				$$renderer.push(`<!----> <h2>Since April</h2> `);
				QueueTimeline($$renderer, { ticket: 4471 });
				$$renderer.push(`<!----> <h2>Lessons</h2> <ul><li>A big ticket is mostly one bug reported many times. Merge early, count once.</li> <li>Write the page while the queue is still in your head.</li></ul>`);
			},
			$$slots: { default: true }
		}
	]));
}
export { _page_svx as n, metadata as r, _page_exports as t };

//# sourceMappingURL=_page2.js.map