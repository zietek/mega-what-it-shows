import { i as __exportAll, t as Runbook } from "./runbook.js";
import { f as escape_html, n as derived, o as sanitize_props, r as ensure_array_like, s as spread_props, u as attr } from "./server.js";
import { n as reports_4471_default, t as desk_notes_default } from "./desk-notes.js";
import { a as groupByCause, l as uniqueById, r as tenantOf, t as Callout } from "./Callout.js";
// src/lib/kb/ProblemTable.svelte
function ProblemTable($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ticket, issues = {} } = $$props;
		const merged = derived(() => uniqueById(reports_4471_default).filter((r) => r.mergedInto === ticket));
		const groups = derived(() => groupByCause(merged(), tenantOf));
		const moves = derived(() => groupByCause(merged().filter((r) => desk_notes_default.oneDayMove.includes(r.id)), tenantOf).map((g) => ({
			...g,
			filedUnder: g.cause,
			cause: "one-day move"
		})));
		const rows = derived(() => [...groups(), ...moves()]);
		$$renderer.push(`<p class="sum svelte-1op6c6"><strong>${escape_html(merged().length)}</strong> reports merged into #${escape_html(ticket)} · <strong>${escape_html(rows().length)}</strong> problems</p> <table><thead><tr><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>ticket</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(rows());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let g = each_array[$$index];
			$$renderer.push(`<tr><td><code>${escape_html(g.cause)}</code></td><td>${escape_html(g.reports.length)}${escape_html("filedUnder" in g ? "*" : "")}</td><td>${escape_html(g.tenants)}</td><td>${escape_html(g.firstSeen)} → ${escape_html(g.lastSeen)}</td><td>`);
			if (issues[g.cause]) $$renderer.push(`<!--[0--><a${attr("href", issues[g.cause])}>#${escape_html(issues[g.cause].split("/").at(-1))}</a>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table> <!--[-->`);
		const each_array_1 = ensure_array_like(moves());
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let m = each_array_1[$$index_1];
			$$renderer.push(`<p class="note svelte-1op6c6">* ${escape_html(m.reports.length)} reports read as a one-day move; counted under <code>${escape_html(m.filedUnder)}</code> by tenant.</p>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// src/lib/kb/desk-ref.ts
var ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
function fnv1a(text, seed) {
	let h = seed >>> 0;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619) >>> 0;
	}
	return h;
}
function deskRef(signature) {
	const t = signature.trim();
	const a = fnv1a(t, 2166136261);
	const b = fnv1a(t, 2654435769);
	let bits = BigInt(a) << 8n | BigInt(b & 255);
	let out = "";
	for (let i = 0; i < 8; i++) {
		out = ALPHABET[Number(bits & 31n)] + out;
		bits >>= 5n;
	}
	return `DR-${out.slice(0, 4)}-${out.slice(4)}`;
}
// src/lib/kb/RenderStamp.svelte
function RenderStamp($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { signature } = $$props;
		const ref = derived(() => signature ? deskRef(signature) : null);
		if (ref()) $$renderer.push(`<!--[0--><p class="stamp svelte-1280m42">desk ref <b class="svelte-1280m42">${escape_html(ref())}</b></p>`);
		else $$renderer.push(`<!--[-1--><p class="stamp missing svelte-1280m42">no desk ref: this page isn't signed (no <code>signature</code> in its frontmatter)</p>`);
		$$renderer.push(`<!--]-->`);
	});
}
// src/routes/kb/incidents/4471-split/+page.svx
var _page_exports = /* @__PURE__ */ __exportAll({
	default: () => _page_svx,
	metadata: () => metadata
});
var metadata = {
	"layout": "runbook",
	"title": "#4471 · three problems, not one",
	"owner": "zietek",
	"status": "open",
	"reviewed": "2026-10-28T00:00:00.000Z",
	"signature": "zietek"
};
var { layout, title, owner, status, reviewed, signature } = metadata;
function _page_svx($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	const issues = {
		parser: "https://github.com/zietek/mega-what-it-shows/issues/1",
		hint: "https://github.com/zietek/mega-what-it-shows/issues/2",
		"one-day move": "https://github.com/zietek/mega-what-it-shows/issues/3"
	};
	Runbook($$renderer, spread_props([
		$$sanitized_props,
		metadata,
		{
			children: ($$renderer) => {
				$$renderer.push(`<p><a href="/kb/incidents/4471">#4471</a> holds every report about dates since April, merged on subject line
(<a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a>). Read by what the reports show, not by their
subject, it is three problems with three fixes. Each now has its own ticket.</p> `);
				ProblemTable($$renderer, {
					ticket: 4471,
					issues
				});
				$$renderer.push(`<!----> <h2>The three problems</h2> <p><strong><code>parser</code>: day and month swapped.</strong> The shared parser reads every date month first, and every
tenant on file writes the day first. “4 March turned into 3 April.” This is the bug #4471 names,
and the fix shipped for it covers only this row.</p> <p><strong><code>hint</code>: the booking-v3 form.</strong> booking-v3 prints <code>MM/DD/YYYY</code> under its date field. People type
what it says, and the form reads their date day first. Same symptom, a swap, but it only comes
through the form at the three booking-v3 tenants, and the parser fix does not touch it.</p> <p><strong><code>one-day move</code>: off by one day.</strong> These are no swap at all. A date moves by exactly one day, or
two people in different time zones see different days for the same meeting. That points to time zone
handling, not to date order. The desk had already listed them in <code>desk-notes.json</code>. They stay
counted under <code>parser</code>, where the desk files them by tenant, and now have a ticket of their own.</p> <h2>Where each one stands</h2> <p>#4471 closed on 5 October with two outcomes. They cover two of the three problems.</p> <table><thead><tr><th>problem</th><th>outcome</th><th>ticket</th></tr></thead><tbody><tr><td><code>parser</code></td><td>fixed: <code>fix(dates): parse dd/mm for eu locales</code></td><td>closed</td></tr><tr><td><code>hint</code></td><td>won’t fix: booking-v3 form retired</td><td>closed</td></tr><tr><td><code>one-day move</code></td><td>nothing yet</td><td><strong>open</strong></td></tr></tbody></table> `);
				Callout($$renderer, {
					kind: "warn",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Closing #4471 did not close the one-day move. Neither fix touches it: it is no swap, and it does
not come through the retired form. Keep its ticket open until engineering takes it.`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> <h2>Why they were merged</h2> <ul><li>Decision 0001 merges on subject alone. All three problems produce the same subjects (“Wrong day
on the invite”), so subject matching cannot tell them apart.</li> <li>Intake tags (<code>meta.intakeTag</code>) come from the reporter’s browser and disagree with the cause in
both directions. The cause comes from the tenant: their locale, their booking form, and the
channel the report came through.</li></ul> <h2>What to do next time</h2> <ul><li>Before merging into a big ticket, check the cause with the <a href="/kb/triage/dedupe">triage explorer</a>,
not the subject.</li> <li>A report that is no swap (one day off, differs by place) is a different problem. Give it a ticket.</li></ul> `);
				RenderStamp($$renderer, { signature });
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		}
	]));
}
export { _page_svx as n, metadata as r, _page_exports as t };

//# sourceMappingURL=_page3.js.map