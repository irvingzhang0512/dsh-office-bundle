window.__ModuleLoader__.load({
	id: "dsh-office-bundle",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/index.tsx
		const { Button } = require("@deepseek-ai/dsh-client-ui-primitives");
		const names = {
			"dsh-structured-document": "结构化文档",
			"dsh-structured-document-view": "结构化文档视图",
			"dsh-better-sidebar-controller": "侧边栏控制工具",
			"dsh-discussion-workbench": "办公讨论工作台",
			"dsh-better-sidebar": "Better Sidebar"
		};
		const reasons = {
			missing: "未找到组件",
			"version-mismatch": "版本不符",
			disabled: "已停用",
			"dependency-disabled": "依赖组件已停用",
			"duplicate-source": "存在重复安装入口",
			"load-error": "加载失败",
			waiting: "等待宿主依赖"
		};
		function statusUrl() {
			return new URL("/office-bundle/status", location.protocol === "dsh-app:" ? "dsh-app://app/" : location.href).href;
		}
		function StatusPanel() {
			const [status, setStatus] = (0, react.useState)(null), [error, setError] = (0, react.useState)(""), [loading, setLoading] = (0, react.useState)(false);
			const request = (0, react.useRef)(null);
			const load = async () => {
				request.current?.abort();
				const current = new AbortController();
				request.current = current;
				setLoading(true);
				setError("");
				try {
					const response = await fetch(statusUrl(), {
						signal: current.signal,
						cache: "no-store"
					});
					const result = await response.json();
					if (!response.ok) throw Error(result.error ?? "读取失败");
					if (!current.signal.aborted) setStatus(result);
				} catch (e) {
					if (!current.signal.aborted) setError(e.message);
				} finally {
					if (!current.signal.aborted) setLoading(false);
				}
			};
			(0, react.useEffect)(() => {
				load();
				return () => request.current?.abort();
			}, []);
			const row = (member) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				style: {
					padding: "10px 0",
					overflowWrap: "anywhere"
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: names[member.packageName] ?? member.packageName }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
						member.actualVersion ?? "未安装",
						" · ",
						member.reason ? reasons[member.reason] : "运行正常"
					] }),
					member.actualVersion !== member.expectedVersion && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: ["要求版本：", member.expectedVersion] })
				]
			}, member.packageName);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				"data-office-bundle-status": true,
				style: {
					maxWidth: "100%",
					fontSize: 13,
					lineHeight: 1.6,
					color: "var(--dsw-alias-label-primary)"
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
						style: {
							fontSize: 14,
							fontWeight: 500
						},
						children: "办公套件状态"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "总开关停用整套组件，重新开启保留各组件原有开关。各组件的开关与设置可在本页「包含的组件」中管理。" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "small",
						disabled: loading,
						onClick: () => void load(),
						children: loading ? "读取中…" : "刷新状态"
					}),
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						children: error
					}),
					status && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "status",
							children: {
								ready: "全部组件正常",
								partial: "部分组件已停用或正在等待",
								blocked: "需要处理安装或加载问题"
							}[status.state]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
							"DSH ",
							status.dshVersion,
							" · 套件 ",
							status.suiteVersion
						] }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("ul", {
							style: { paddingLeft: 20 },
							children: [status.members.map(row), status.externalDependencies.map(row)]
						}),
						status.issues.map((x) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: x }, x))
					] })
				]
			});
		}
		const inject = ["slots"];
		function apply(ctx) {
			ctx.slots.inject("plugins.detail.section", () => ctx.slots.register({
				name: "plugins.detail.section",
				id: "office-bundle-status",
				order: 40
			}, (props) => props.subject?.kind === "bundle" && props.subject.pkg.name === "dsh-office-bundle" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatusPanel, {}) : null));
		}
		//#endregion
		exports.StatusPanel = StatusPanel;
		exports.apply = apply;
		exports.inject = inject;
		exports.statusUrl = statusUrl;
		return module.exports;
	}
});
