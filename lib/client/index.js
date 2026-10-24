import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
const { Button } = require('@deepseek-ai/dsh-client-ui-primitives');
const names = {
    'dsh-structured-document': '结构化文档', 'dsh-structured-document-view': '结构化文档视图',
    'dsh-better-sidebar-controller': '侧边栏控制工具', 'dsh-discussion-workbench': '办公讨论工作台', 'dsh-better-sidebar': 'Better Sidebar',
};
const reasons = { missing: '未找到组件', 'version-mismatch': '版本不符', disabled: '已停用', 'dependency-disabled': '依赖组件已停用', 'duplicate-source': '存在重复安装入口', 'load-error': '加载失败', waiting: '等待宿主依赖' };
export function statusUrl() {
    return new URL('/office-bundle/status', location.protocol === 'dsh-app:' ? 'dsh-app://app/' : location.href).href;
}
export function StatusPanel() {
    const [status, setStatus] = useState(null), [error, setError] = useState(''), [loading, setLoading] = useState(false);
    const request = useRef(null);
    const load = async () => {
        request.current?.abort();
        const current = new AbortController();
        request.current = current;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(statusUrl(), { signal: current.signal, cache: 'no-store' });
            const result = await response.json();
            if (!response.ok)
                throw Error(result.error ?? '读取失败');
            if (!current.signal.aborted)
                setStatus(result);
        }
        catch (e) {
            if (!current.signal.aborted)
                setError(e.message);
        }
        finally {
            if (!current.signal.aborted)
                setLoading(false);
        }
    };
    useEffect(() => { void load(); return () => request.current?.abort(); }, []);
    const row = (member) => _jsxs("li", { style: { padding: '10px 0', overflowWrap: 'anywhere' }, children: [_jsx("strong", { children: names[member.packageName] ?? member.packageName }), _jsxs("div", { children: [member.actualVersion ?? '未安装', " \u00B7 ", member.reason ? reasons[member.reason] : '运行正常'] }), member.actualVersion !== member.expectedVersion && _jsxs("small", { children: ["\u8981\u6C42\u7248\u672C\uFF1A", member.expectedVersion] })] }, member.packageName);
    return _jsxs("section", { "data-office-bundle-status": true, style: { maxWidth: '100%', fontSize: 13, lineHeight: 1.6, color: 'var(--dsw-alias-label-primary)' }, children: [_jsx("h2", { style: { fontSize: 14, fontWeight: 500 }, children: "\u529E\u516C\u5957\u4EF6\u72B6\u6001" }), _jsx("p", { children: "\u603B\u5F00\u5173\u505C\u7528\u6574\u5957\u7EC4\u4EF6\uFF0C\u91CD\u65B0\u5F00\u542F\u4FDD\u7559\u5404\u7EC4\u4EF6\u539F\u6709\u5F00\u5173\u3002\u5404\u7EC4\u4EF6\u7684\u5F00\u5173\u4E0E\u8BBE\u7F6E\u53EF\u5728\u672C\u9875\u300C\u5305\u542B\u7684\u7EC4\u4EF6\u300D\u4E2D\u7BA1\u7406\u3002" }), _jsx(Button, { type: "button", size: "small", disabled: loading, onClick: () => void load(), children: loading ? '读取中…' : '刷新状态' }), error && _jsx("p", { role: "alert", children: error }), status && _jsxs(_Fragment, { children: [_jsx("p", { role: "status", children: ({ ready: '全部组件正常', partial: '部分组件已停用或正在等待', blocked: '需要处理安装或加载问题' })[status.state] }), _jsxs("p", { children: ["DSH ", status.dshVersion, " \u00B7 \u5957\u4EF6 ", status.suiteVersion] }), _jsxs("ul", { style: { paddingLeft: 20 }, children: [status.members.map(row), status.externalDependencies.map(row)] }), status.issues.map(x => _jsx("p", { children: x }, x))] })] });
}
export const inject = ['slots'];
export function apply(ctx) {
    ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'office-bundle-status', order: 40 }, (props) => props.subject?.kind === 'bundle' && props.subject.pkg.name === 'dsh-office-bundle' ? _jsx(StatusPanel, {}) : null));
}
