export const MEMBERS = ['dsh-structured-document', 'dsh-structured-document-view', 'dsh-better-sidebar-controller', 'dsh-discussion-workbench'];
export const SUITE = 'dsh-office-bundle';
export const VERSION = '0.2.1-rc.2+rev.1';
export const DSH_VERSION = '0.2.1-rc.2';
export function overallState(rows, issues) {
    if (issues.length || rows.some(row => ['missing', 'version-mismatch', 'duplicate-source', 'load-error'].includes(row.reason ?? '')))
        return 'blocked';
    return rows.every(row => row.running) ? 'ready' : 'partial';
}
