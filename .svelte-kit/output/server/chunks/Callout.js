import { d as clsx, t as attr_class } from "./server.js";
// src/lib/kb/causes.ts
var DATE_HINT = {
	"booking-v2": "DD/MM/YYYY",
	"booking-v3": "MM/DD/YYYY"
};
function dayFirst(locale) {
	const order = new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).formatToParts(new Date(Date.UTC(2026, 0, 2, 12))).map((p) => p.type);
	return order.indexOf("day") < order.indexOf("month");
}
function causeOf(r, t) {
	if (!t || !dayFirst(t.locale)) return null;
	return r.channel === "form" && DATE_HINT[t.form].startsWith("MM") ? "hint" : "parser";
}
function sameCause(a, ta, b, tb) {
	const ca = causeOf(a, ta);
	return ca !== null && ca === causeOf(b, tb);
}
function uniqueById(reports) {
	return [...new Map(reports.map((r) => [r.id, r])).values()];
}
function groupByCause(reports, tenantOf) {
	const byCause = /* @__PURE__ */ new Map();
	for (const r of reports) {
		const cause = causeOf(r, tenantOf(r)) ?? "unplaced";
		byCause.set(cause, [...byCause.get(cause) ?? [], r]);
	}
	return [...byCause.entries()].map(([cause, rs]) => {
		const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
		return {
			cause,
			reports: rs,
			taggedAs: rs.reduce((n, r) => ({
				...n,
				[r.meta.intakeTag]: (n[r.meta.intakeTag] ?? 0) + 1
			}), {}),
			tenants: new Set(rs.map((r) => r.tenant)).size,
			firstSeen: days[0],
			lastSeen: days[days.length - 1],
			mergedInto: [...new Set(rs.flatMap((r) => r.mergedInto ? [r.mergedInto] : []))]
		};
	}).sort((a, b) => b.reports.length - a.reports.length);
}
function ticketCause(groups, ticket) {
	return groups.find((g) => g.mergedInto.includes(ticket))?.cause ?? null;
}
function readAs(g, ids) {
	return g.reports.filter((r) => ids.includes(r.id)).length;
}
// src/lib/kb/locales.ts
var tenants = Object.values([
	{
		handle: "alder.physio",
		name: "Alder Physio",
		locale: "de-DE",
		form: "booking-v3"
	},
	{
		handle: "copper.studio",
		name: "Copper Studio",
		locale: "es-ES",
		form: "booking-v3"
	},
	{
		handle: "harbour.dental",
		name: "Harbour Dental",
		locale: "en-GB",
		form: "booking-v2"
	},
	{
		handle: "kettle.books",
		name: "Kettle Books",
		locale: "nl-NL",
		form: "booking-v2"
	},
	{
		handle: "lantern.row",
		name: "Lantern Row",
		locale: "cs-CZ",
		form: "booking-v2"
	},
	{
		handle: "long.table",
		name: "Long Table",
		locale: "it-IT",
		form: "booking-v2"
	},
	{
		handle: "morrow.tax",
		name: "Morrow Tax",
		locale: "fr-FR",
		form: "booking-v2"
	},
	{
		handle: "nine.lanterns",
		name: "Nine Lanterns",
		locale: "pl-PL",
		form: "booking-v2"
	},
	{
		handle: "pale.harbour",
		name: "Pale Harbour",
		locale: "pt-PT",
		form: "booking-v3"
	},
	{
		handle: "ridge.clinic",
		name: "Ridge Clinic",
		locale: "da-DK",
		form: "booking-v2"
	},
	{
		handle: "stone.and.sons",
		name: "Stone and Sons",
		locale: "en-IE",
		form: "booking-v2"
	}
]);
var byHandle = new Map(tenants.map((t) => [t.handle, t]));
function tenantOf(r) {
	return byHandle.get(r.tenant);
}
var tenantHandles = () => [...byHandle.keys()].sort();
// src/lib/kb/Callout.svelte
function Callout($$renderer, $$props) {
	let { kind = "note", children } = $$props;
	$$renderer.push(`<aside${attr_class(clsx(kind), "svelte-17bri61")}>`);
	children($$renderer);
	$$renderer.push(`<!----></aside>`);
}
export { groupByCause as a, ticketCause as c, causeOf as i, uniqueById as l, tenantHandles as n, readAs as o, tenantOf as r, sameCause as s, Callout as t };

//# sourceMappingURL=Callout.js.map