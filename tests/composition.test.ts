import {it,expect} from 'vitest'
import {Context} from '@deepseek-ai/cordis'
import {Loader,Group} from '@deepseek-ai/cordis-plugin-loader'
import {MEMBERS} from '../src/shared/status.ts'
const settle=async(ctx:any)=>{await ctx.loader.await();await new Promise(resolve=>setImmediate(resolve))}
it('真实Cordis分组保留原id／配置，总开关卸载全部且恢复子开关',async()=>{
 const ctx:any=new Context(),active=new Set<string>();await ctx.plugin(Loader)
 ctx.loader.builtins.group=Group
 ctx.loader.builtins.probe={name:'probe',apply(child:any,config:any){active.add(config.identity);child.effect(()=>()=>active.delete(config.identity),'probe cleanup')}}
 const rows=MEMBERS.map((id,index)=>({id,name:'cordis:probe',disabled:index===1,config:{identity:id,keep:'original'}}))
 const group={id:'dsh-office-bundle-members',name:'cordis:group',group:true,config:rows}
 try{
  // 官方recompose每次重新解析层；Loader拥有传入配置对象，不能把上次的可变对象当持久层。
  await ctx.loader.root.update([structuredClone(group)]);await settle(ctx)
  expect(active.size).toBe(3)
  const original=[...ctx.loader.entries()].find((entry:any)=>entry.options.id===MEMBERS[0]) as any
  expect(original.id).toBe(MEMBERS[0]);expect(original.options.config.keep).toBe('original')
  await ctx.loader.root.update([]);await settle(ctx);expect(active.size).toBe(0)
  await ctx.loader.root.update([structuredClone(group)]);await settle(ctx);expect(active.size).toBe(3);expect(active.has(MEMBERS[1])).toBe(false)
 }finally{await ctx.fiber.dispose()}
 expect(active.size).toBe(0)
})
