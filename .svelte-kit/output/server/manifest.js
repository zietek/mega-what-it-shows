export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set([]),
	mime_types: {},
	client: {start:"_app/immutable/entry/start.CH5w6lId.js",app:"_app/immutable/entry/app.DO8M0fVy.js",imports:["_app/immutable/entry/start.CH5w6lId.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/CRzLMJPS.js","_app/immutable/chunks/B2Ul7l_u.js","_app/immutable/chunks/BCPXOG7W.js","_app/immutable/chunks/Dh1V97Jm.js","_app/immutable/entry/app.DO8M0fVy.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('./nodes/0.js')),
		__memo(() => import('./nodes/1.js'))
	],
	remotes: {
		
	},
	routes: [
		
	],
	prerendered_routes: new Set(["/kb","/kb/decisions/0001-dedupe-by-subject","/kb/incidents/4471-split","/kb/incidents/4471","/kb/triage/dedupe"]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
