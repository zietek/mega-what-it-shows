import { i as __exportAll, t as Runbook } from "./runbook.js";
import { f as escape_html, o as sanitize_props, r as ensure_array_like, s as spread_props, t as attr_class, u as attr } from "./server.js";
import { i as causeOf, n as tenantHandles, r as tenantOf, s as sameCause, t as Callout } from "./Callout.js";
// src/lib/kb/dedupe-cases.ts
var DEDUPE_CASES = [
	{
		why: "app vs email, same tenant",
		a: {
			tenant: "kettle.books",
			channel: "app",
			subject: "Wrong day on the invite"
		},
		b: {
			tenant: "kettle.books",
			channel: "email",
			subject: "Client turned up on the wrong day"
		}
	},
	{
		why: "same subject, same tenant, different channel",
		a: {
			tenant: "alder.physio",
			channel: "form",
			subject: "Booking on the wrong date"
		},
		b: {
			tenant: "alder.physio",
			channel: "app",
			subject: "Booking on the wrong date"
		}
	},
	{
		why: "same subject, same channel, different tenant",
		a: {
			tenant: "copper.studio",
			channel: "form",
			subject: "Date is wrong"
		},
		b: {
			tenant: "morrow.tax",
			channel: "form",
			subject: "Date is wrong"
		}
	},
	{
		why: "different subject, same way in",
		a: {
			tenant: "pale.harbour",
			channel: "form",
			subject: "Month and day swapped?"
		},
		b: {
			tenant: "alder.physio",
			channel: "form",
			subject: "Appointment moved by itself"
		}
	},
	{
		why: "no tenant on file",
		a: {
			tenant: "unknown.sender",
			channel: "email",
			subject: "Dates mixed up"
		},
		b: {
			tenant: "unknown.sender",
			channel: "email",
			subject: "Dates mixed up"
		}
	}
];
// src/lib/kb/DedupeExplorer.svelte
function DedupeExplorer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const CHANNELS = [
			"app",
			"email",
			"form"
		];
		let a = {
			tenant: "alder.physio",
			channel: "form",
			subject: "Booking on the wrong date"
		};
		let b = {
			tenant: "kettle.books",
			channel: "form",
			subject: "Booking on the wrong date"
		};
		const same = (x, y) => sameCause(x, tenantOf(x), y, tenantOf(y));
		$$renderer.push(`<div class="try svelte-gq0h2h"><!--[-->`);
		const each_array = ensure_array_like([a, b]);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let side = each_array[i];
			$$renderer.push(`<fieldset class="svelte-gq0h2h"><legend>report ${escape_html(i === 0 ? "A" : "B")}</legend> `);
			$$renderer.select({
				value: side.tenant,
				"aria-label": "tenant"
			}, ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				const each_array_1 = ensure_array_like(tenantHandles());
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let handle = each_array_1[$$index];
					$$renderer.option({}, handle);
				}
				$$renderer.push(`<!--]-->`);
			});
			$$renderer.push(` `);
			$$renderer.select({
				value: side.channel,
				"aria-label": "channel"
			}, ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				const each_array_2 = ensure_array_like(CHANNELS);
				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
					let channel = each_array_2[$$index_1];
					$$renderer.option({}, channel);
				}
				$$renderer.push(`<!--]-->`);
			});
			$$renderer.push(` <input${attr("value", side.subject)} aria-label="subject"/> <code>${escape_html(causeOf(side, tenantOf(side)) ?? "no cause")}</code></fieldset>`);
		}
		$$renderer.push(`<!--]--> <p${attr_class("verdict svelte-gq0h2h", void 0, { "dup": same(a, b) })}>${escape_html(same(a, b) ? "same cause — merge" : "different causes — keep apart")}</p></div> <table><thead><tr><th>case</th><th>same subject</th><th>same cause</th></tr></thead><tbody><!--[-->`);
		const each_array_3 = ensure_array_like(DEDUPE_CASES);
		for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
			let c = each_array_3[$$index_3];
			$$renderer.push(`<tr><td>${escape_html(c.why)}</td><td>${escape_html(c.a.subject === c.b.subject ? "yes" : "no")}</td><td${attr_class("svelte-gq0h2h", void 0, { "dup": same(c.a, c.b) })}>${escape_html(same(c.a, c.b) ? "yes" : "no")}</td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table>`);
	});
}
// src/routes/kb/triage/dedupe/+page.svx
var _page_exports = /* @__PURE__ */ __exportAll({
	default: () => _page_svx,
	metadata: () => metadata
});
var metadata = {
	"layout": "runbook",
	"title": "Triage: duplicate reports",
	"owner": "support desk",
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
				$$renderer.push(`<p>A busy morning brings hundreds of reports about the same thing. We keep one ticket per issue
and merge every duplicate into it, so engineering sees one thread with a count.</p> <h2>The rule</h2> <p>A report is a duplicate when its <strong>subject line matches</strong> the subject of an open ticket
(<a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a>):</p> <ol><li>lowercase the subject and strip punctuation;</li> <li>look for an open ticket with the same subject;</li> <li>found one: merge the report into it. None: open a new ticket.</li></ol> `);
				Callout($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<!---->Matching on subject is fast and needs no reading. During an incident that matters more than
anything else.`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> <h2>Try it</h2> `);
				DedupeExplorer($$renderer, {});
				$$renderer.push(`<!----> <h2>When you are unsure</h2> <p>Merge. Splitting a ticket later is cheaper than two engineers chasing the same bug.</p>`);
			},
			$$slots: { default: true }
		}
	]));
}
export { _page_svx as n, metadata as r, _page_exports as t };

//# sourceMappingURL=_page4.js.map