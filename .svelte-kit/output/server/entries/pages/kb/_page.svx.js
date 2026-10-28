import { n as daysSince, r as isoDay, t as Runbook } from "../../../chunks/runbook.js";
import { f as escape_html, o as sanitize_props, r as ensure_array_like, s as spread_props, t as attr_class, u as attr } from "../../../chunks/server.js";
import { t as _page_exports } from "../../../chunks/_page.js";
import { t as _page_exports$1 } from "../../../chunks/_page2.js";
import { t as _page_exports$2 } from "../../../chunks/_page3.js";
import { t as _page_exports$3 } from "../../../chunks/_page4.js";
// src/lib/kb/KbIndex.svelte
function KbIndex($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const rows = Object.entries(/* @__PURE__ */ Object.assign({
			"/src/routes/kb/decisions/0001-dedupe-by-subject/+page.svx": _page_exports,
			"/src/routes/kb/incidents/4471/+page.svx": _page_exports$1,
			"/src/routes/kb/incidents/4471-split/+page.svx": _page_exports$2,
			"/src/routes/kb/triage/dedupe/+page.svx": _page_exports$3
		})).map(([path, mod]) => ({
			href: path.replace("/src/routes", "").replace("/+page.svx", ""),
			...mod.metadata
		})).sort((x, y) => x.href.localeCompare(y.href));
		$$renderer.push(`<table><thead><tr><th>page</th><th>owner</th><th>status</th><th>reviewed</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(rows);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let r = each_array[$$index];
			$$renderer.push(`<tr><td><a${attr("href", r.href)}>${escape_html(r.title)}</a></td><td>${escape_html(r.owner)}</td><td>${escape_html(r.status)}</td><td${attr_class("svelte-tbc1ha", void 0, { "stale": daysSince(r.reviewed) > 180 })}>${escape_html(isoDay(r.reviewed))}</td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table>`);
	});
}
// src/routes/kb/+page.svx
var metadata = {
	"layout": "runbook",
	"title": "Support knowledge base",
	"owner": "support desk",
	"status": "living",
	"reviewed": "2026-09-28T00:00:00.000Z"
};
var { layout, title, owner, status, reviewed } = metadata;
function _page_svx($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	Runbook($$renderer, spread_props([
		$$sanitized_props,
		metadata,
		{
			children: ($$renderer) => {
				$$renderer.push(`<p>What the support desk knows, kept next to the code that knows it. One desk, every product: <code>sched-prod</code> (calendar invites for about 300k people) and the rest. When something breaks, the reports land here first.</p> <p>Start with <a href="/kb/triage/dedupe">triage</a> if you are new on the desk.</p> <h2>Pages</h2> `);
				KbIndex($$renderer, {});
				$$renderer.push(`<!----> <h2>Writing a page</h2> <p>Keep the words here and the logic in <code>src/lib</code>. A number that can be computed should be
computed by a component, not typed into a paragraph.</p>`);
			},
			$$slots: { default: true }
		}
	]));
}
export { _page_svx as default, metadata };

//# sourceMappingURL=_page.svx.js.map