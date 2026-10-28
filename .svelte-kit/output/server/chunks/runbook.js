import { c as stringify, f as escape_html, i as head, n as derived, t as attr_class } from "./server.js";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// src/lib/kb/staleness.ts
function isoDay(d) {
	return new Date(d).toISOString().slice(0, 10);
}
function daysSince(d, now = /* @__PURE__ */ new Date()) {
	return Math.floor((now.getTime() - new Date(d).getTime()) / 864e5);
}
// src/lib/layouts/runbook.svelte
function Runbook($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title, owner, status, reviewed, children } = $$props;
		const age = derived(() => daysSince(reviewed));
		const stale = derived(() => age() > 180);
		head("e2jw2j", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(title)} · support kb</title>`);
			});
		});
		$$renderer.push(`<div class="kb svelte-e2jw2j"><header><a class="crumb svelte-e2jw2j" href="/kb">support desk · kb</a> <h1 class="svelte-e2jw2j">${escape_html(title)}</h1> <p class="meta svelte-e2jw2j"><span>owner <b>${escape_html(owner)}</b></span> <span${attr_class(`status ${stringify(status)}`, "svelte-e2jw2j")}>${escape_html(status)}</span> <span${attr_class("svelte-e2jw2j", void 0, { "stale": stale() })}>reviewed ${escape_html(isoDay(reviewed))} · ${escape_html(age())} days ago${escape_html(stale() ? " · stale" : "")}</span></p></header> `);
		if (stale()) $$renderer.push(`<!--[0--><p class="banner svelte-e2jw2j">Nobody has re-read this page in ${escape_html(age())} days. Check it against the live views before you rely on it.</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <main>`);
		children($$renderer);
		$$renderer.push(`<!----></main> <footer class="svelte-e2jw2j">Pages are written by people. Tables and charts are built from data at render time.</footer></div>`);
	});
}
export { __exportAll as i, daysSince as n, isoDay as r, Runbook as t };

//# sourceMappingURL=runbook.js.map