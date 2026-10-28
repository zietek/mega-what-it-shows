import { i as __exportAll, t as Runbook } from "./runbook.js";
import { o as sanitize_props, s as spread_props } from "./server.js";
// src/routes/kb/decisions/0001-dedupe-by-subject/+page.svx
var _page_exports = /* @__PURE__ */ __exportAll({
	default: () => _page_svx,
	metadata: () => metadata
});
var metadata = {
	"layout": "runbook",
	"title": "0001 · Duplicates share a subject line",
	"owner": "rune",
	"status": "accepted",
	"reviewed": "2024-06-11T00:00:00.000Z"
};
var { layout, title, owner, status, reviewed } = metadata;
function _page_svx($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	Runbook($$renderer, spread_props([
		$$sanitized_props,
		metadata,
		{
			children: ($$renderer) => {
				$$renderer.push(`<p><strong>Date:</strong> 11 June 2024 · <strong>Deciders:</strong> Rune (product), support desk</p> <h2>Context</h2> <p>Reports arrive faster than the desk can read them. During incidents the same problem comes in
hundreds of times, and engineering asks for one ticket per issue.</p> <h2>Decision</h2> <p>Two reports are the same issue when their subject lines match after lowercasing and stripping
punctuation. The desk merges on subject alone; nobody has to read the body.</p> <h2>Consequences</h2> <ul><li>Fast: one person can triage an incident morning.</li> <li>Reports with different subjects about the same bug end up in separate tickets. Accepted;
engineering merges them later.</li></ul>`);
			},
			$$slots: { default: true }
		}
	]));
}
export { _page_svx as n, metadata as r, _page_exports as t };

//# sourceMappingURL=_page.js.map