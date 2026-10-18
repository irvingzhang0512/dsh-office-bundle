import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { MEMBERS, VERSION, DSH_VERSION, overallState, type MemberStatus, type OfficeStatus } from './shared/status.ts'
export interface Entry {
  options: { id?: string; name?: string; inject?: string[]; disabled?: unknown }
  disabled?: boolean
  fiber?: { state: number; uid?: number | null }
  parent: { tree: { ctx: { baseUrl: string } } }
}
export interface StatusContext {
  loader: { entries(): Iterable<Entry> }
  pluginPackages: { packageOf(name: string, base: string): { version?: string } | undefined }
  profileContext: { dir: string; installAnchor: string }
}
export function collectStatus(ctx: StatusContext): OfficeStatus {
  const entries = [...ctx.loader.entries()]
  const profile = JSON.parse(readFileSync(join(ctx.profileContext.dir, 'package.json'), 'utf8'))
  const dshVersion = JSON.parse(readFileSync(ctx.profileContext.installAnchor, 'utf8')).version
  if (typeof dshVersion !== 'string') throw Error('宿主版本无法读取')
  const selected: string[] = profile.dsh?.profile?.bundles ?? []
  const issues: string[] = dshVersion === DSH_VERSION ? [] : ['宿主版本与固定组合不符']
  const fallbackBase = entries.find(row => row.options.name === 'dsh-office-bundle')?.parent.tree.ctx.baseUrl
  if (!fallbackBase) throw Error('无法确定当前套件解析来源')
  const inspect = (packageName: string, expectedVersion: string, member: boolean): MemberStatus => {
    const matches = entries.filter(row => row.options.name === packageName)
    const entry = matches[0]
    const actualVersion = ctx.pluginPackages.packageOf(packageName, entry?.parent.tree.ctx.baseUrl ?? fallbackBase)?.version ?? null
    const enabled = !!entry && !(entry.disabled ?? Boolean(entry.options.disabled))
    const running = enabled && entry?.fiber?.state === 2
    const duplicate = matches.length > 1 || (member && selected.includes(packageName))
    let reason: MemberStatus['reason'] = duplicate ? 'duplicate-source' : actualVersion === null || !entry ? 'missing' : actualVersion !== expectedVersion ? 'version-mismatch' : !enabled ? 'disabled' : entry.fiber?.state === 3 ? 'load-error' : !running ? 'waiting' : null
    if (reason === 'waiting' && (entry?.options.inject ?? []).some(service => {
      const providers: Record<string,string> = { structuredDocument:'dsh-structured-document', structuredDocumentView:'dsh-structured-document-view', sidebarController:'dsh-better-sidebar-controller' }
      const name=providers[service]
      return name && entries.some(row => row.options.name === name && (row.disabled ?? Boolean(row.options.disabled)))
    })) reason = 'dependency-disabled'
    return { packageName,entryId:entry?.options.id ?? packageName,expectedVersion,actualVersion,enabled,running,reason }
  }
  const members = MEMBERS.map(name => inspect(name, VERSION, true))
  const externalDependencies = [inspect('dsh-better-sidebar', '0.28.0', false)]
  return { schemaVersion:1,dshVersion,suiteVersion:VERSION,state:overallState([...members,...externalDependencies],issues),members,externalDependencies,issues }
}
