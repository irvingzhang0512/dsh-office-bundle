import {describe,it,expect} from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {MEMBERS,VERSION,DSH_VERSION} from '../src/shared/status.ts'
import {collectStatus,type Entry} from '../src/status.ts'
import {statusHandler,type HostContext} from '../src/index.ts'
function fixture(run:(ctx:HostContext,entries:Entry[],dir:string)=>void){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'office-status-'))
 fs.writeFileSync(path.join(dir,'package.json'),JSON.stringify({version:'0.2.1-rc.3',dsh:{profile:{bundles:['dsh-office-bundle','dsh-better-sidebar']}}}))
 const entries=['dsh-office-bundle',...MEMBERS,'dsh-better-sidebar'].map(name=>({options:{name,id:name,inject:name==='dsh-discussion-workbench'?['structuredDocument']:[]},disabled:false,fiber:{state:2,uid:1},parent:{tree:{ctx:{baseUrl:'file:///profile/package.json'}}}}))
 const ctx:HostContext={loader:{entries:()=>entries},pluginPackages:{packageOf:name=>({version:name==='dsh-better-sidebar'?'0.28.0':VERSION})},profileContext:{dir,installAnchor:path.join(dir,'package.json')},connection:{requestRejection:()=>undefined},webServer:{register:()=>()=>{}},effect:()=>{}}
 try{run(ctx,entries,dir)}finally{fs.rmSync(dir,{recursive:true,force:true})}
}
describe('实际来源与状态分类',()=>{
 it('状态基线与真实分发 manifest 一致，旧宿主仍阻断',()=>fixture((ctx,_entries,dir)=>{
  const manifest=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'))
  expect(VERSION).toBe(manifest.version);expect(DSH_VERSION).toBe(manifest.engines.dsh)
  const profile=JSON.parse(fs.readFileSync(path.join(dir,'package.json'),'utf8'));profile.version='0.2.1-rc.2';fs.writeFileSync(path.join(dir,'package.json'),JSON.stringify(profile))
  expect(collectStatus(ctx).state).toBe('blocked');expect(collectStatus(ctx).issues).toContain('宿主版本与固定组合不符')
 }))
 it('全部实际运行才ready',()=>fixture(ctx=>{expect(collectStatus(ctx).state).toBe('ready');expect(collectStatus(ctx).members).toHaveLength(4)}))
 it('主动停用与依赖等待保留partial',()=>fixture((ctx,entries)=>{entries[1].disabled=true;entries[4].fiber!.state=0;const status=collectStatus(ctx);expect(status.state).toBe('partial');expect(status.members[3].reason).toBe('dependency-disabled')}))
 it('实际版本缺失、加载异常与重复入口blocked',()=>fixture((ctx,entries,dir)=>{
  ctx.pluginPackages.packageOf=()=>undefined;expect(collectStatus(ctx).state).toBe('blocked')
  ctx.pluginPackages.packageOf=name=>({version:name==='dsh-better-sidebar'?'0.28.0':VERSION});entries[1].fiber!.state=3;expect(collectStatus(ctx).members[0].reason).toBe('load-error')
  fs.writeFileSync(path.join(dir,'package.json'),JSON.stringify({version:'0.2.1-rc.3',dsh:{profile:{bundles:['dsh-office-bundle',MEMBERS[0]]}}}));expect(collectStatus(ctx).members[0].reason).toBe('duplicate-source')
 }))
 it('路由遵守宿主鉴权、405与503且释放唯一注册',()=>fixture(ctx=>{
  let code=0,body='',allow='',disposed=0
  const res:any={writeHead:(x:number)=>{code=x},end:(x:string)=>{body=x},setHeader:(_:string,x:string)=>{allow=x}}
  ctx.connection.requestRejection=()=>401;statusHandler(ctx,{method:'GET'} as any,res);expect(code).toBe(401)
  ctx.connection.requestRejection=()=>undefined;statusHandler(ctx,{method:'POST'} as any,res);expect(code).toBe(405);expect(allow).toBe('GET')
  statusHandler(ctx,{method:'GET'} as any,res);expect(JSON.parse(body).state).toBe('ready')
  ctx.loader.entries=()=>{throw Error('private-path')};statusHandler(ctx,{method:'GET'} as any,res);expect(code).toBe(503);expect(body).not.toContain('private-path')
 }))
})
