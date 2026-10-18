import { useEffect, useRef, useState } from 'react'
import type { OfficeStatus, MemberStatus } from '../shared/status.ts'
declare const require:(name:string)=>any
const {Button}=require('@deepseek-ai/dsh-client-ui-primitives')
const names: Record<string,string> = {
  'dsh-structured-document':'结构化文档','dsh-structured-document-view':'结构化文档视图',
  'dsh-better-sidebar-controller':'侧边栏控制工具','dsh-discussion-workbench':'办公讨论工作台','dsh-better-sidebar':'Better Sidebar',
}
const reasons: Record<string,string> = {missing:'未找到组件', 'version-mismatch':'版本不符',disabled:'已停用','dependency-disabled':'依赖组件已停用','duplicate-source':'存在重复安装入口','load-error':'加载失败',waiting:'等待宿主依赖'}
export function statusUrl(): string {
  return new URL('/office-bundle/status',location.protocol==='dsh-app:'?'dsh-app://app/':location.href).href
}
export function StatusPanel() {
  const [status,setStatus]=useState<OfficeStatus|null>(null),[error,setError]=useState(''),[loading,setLoading]=useState(false)
  const request=useRef<AbortController|null>(null)
  const load=async()=>{
    request.current?.abort();const current=new AbortController();request.current=current;setLoading(true);setError('')
    try{const response=await fetch(statusUrl(),{signal:current.signal,cache:'no-store'});const result=await response.json();if(!response.ok)throw Error(result.error??'读取失败');if(!current.signal.aborted)setStatus(result)}
    catch(e){if(!current.signal.aborted)setError((e as Error).message)}finally{if(!current.signal.aborted)setLoading(false)}
  }
  useEffect(()=>{void load();return()=>request.current?.abort()},[])
  const row=(member:MemberStatus)=><li key={member.packageName} style={{padding:'10px 0',overflowWrap:'anywhere'}}><strong>{names[member.packageName]??member.packageName}</strong><div>{member.actualVersion??'未安装'} · {member.reason?reasons[member.reason]:'运行正常'}</div>{member.actualVersion!==member.expectedVersion&&<small>要求版本：{member.expectedVersion}</small>}</li>
  return <section data-office-bundle-status style={{maxWidth:'100%',fontSize:13,lineHeight:1.6,color:'var(--dsw-alias-label-primary)'}}>
    <h2 style={{fontSize:14,fontWeight:500}}>办公套件状态</h2><p>总开关停用整套组件，重新开启保留各组件原有开关。各组件的开关与设置可在本页「包含的组件」中管理。</p>
    <Button type="button" size="small" disabled={loading} onClick={()=>void load()}>{loading?'读取中…':'刷新状态'}</Button>
    {error&&<p role="alert">{error}</p>}{status&&<><p role="status">{({ready:'全部组件正常',partial:'部分组件已停用或正在等待',blocked:'需要处理安装或加载问题'})[status.state]}</p><p>DSH {status.dshVersion} · 套件 {status.suiteVersion}</p><ul style={{paddingLeft:20}}>{status.members.map(row)}{status.externalDependencies.map(row)}</ul>{status.issues.map(x=><p key={x}>{x}</p>)}</>}
  </section>
}
export const inject=['slots']
export function apply(ctx:any):void {
  ctx.slots.inject('plugins.detail.section',()=>ctx.slots.register({name:'plugins.detail.section',id:'office-bundle-status',order:40},(props:any)=>props.subject?.kind==='bundle'&&props.subject.pkg.name==='dsh-office-bundle'?<StatusPanel/>:null))
}
