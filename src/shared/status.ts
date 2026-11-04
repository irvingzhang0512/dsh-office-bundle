export const MEMBERS = ['dsh-structured-document', 'dsh-structured-document-view', 'dsh-better-sidebar-controller', 'dsh-discussion-workbench'] as const
export const SUITE = 'dsh-office-bundle'
export const VERSION = '0.2.2-rc.1+rev.1'
export const DSH_VERSION = '0.2.2-rc.1'
export interface MemberStatus {
  packageName: string
  entryId: string
  expectedVersion: string
  actualVersion: string | null
  enabled: boolean
  running: boolean
  reason: 'missing' | 'version-mismatch' | 'disabled' | 'dependency-disabled' | 'duplicate-source' | 'load-error' | 'waiting' | null
}
export interface OfficeStatus {
  schemaVersion: 1
  dshVersion: string
  suiteVersion: string
  state: 'ready' | 'partial' | 'blocked'
  members: MemberStatus[]
  externalDependencies: MemberStatus[]
  issues: string[]
}
export function overallState(rows: MemberStatus[], issues: string[]): OfficeStatus['state'] {
  if (issues.length || rows.some(row => ['missing','version-mismatch','duplicate-source','load-error'].includes(row.reason ?? ''))) return 'blocked'
  return rows.every(row => row.running) ? 'ready' : 'partial'
}
