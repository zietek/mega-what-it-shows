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
		__memo(() => import('./nodes/1.js')),
		__memo(() => import('./nodes/2.js')),
		__memo(() => import('./nodes/3.js')),
		__memo(() => import('./nodes/4.js')),
		__memo(() => import('./nodes/5.js')),
		__memo(() => import('./nodes/6.js'))
	],
	remotes: {
		
	},
	routes: [
		{
			id: "/kb",
			pattern: /^\/kb\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 2 },
			endpoint: null
		},
		{
			id: "/kb/decisions/0001-dedupe-by-subject",
			pattern: /^\/kb\/decisions\/0001-dedupe-by-subject\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 3 },
			endpoint: null
		},
		{
			id: "/kb/incidents/4471-split",
			pattern: /^\/kb\/incidents\/4471-split\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 5 },
			endpoint: null
		},
		{
			id: "/kb/incidents/4471",
			pattern: /^\/kb\/incidents\/4471\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 4 },
			endpoint: null
		},
		{
			id: "/kb/triage/dedupe",
			pattern: /^\/kb\/triage\/dedupe\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 6 },
			endpoint: null
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
