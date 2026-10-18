import type { IncomingMessage, ServerResponse } from 'node:http'
import z from '@deepseek-ai/schemastery'
import { collectStatus, type StatusContext } from './status.ts'
export const name = 'dsh-office-bundle'
export const inject = ['loader','pluginPackages','profileContext','webServer','connection']
export const Config = z.object({})
export interface HostContext extends StatusContext {
  connection: { requestRejection(request: IncomingMessage): number | undefined }
  webServer: { register(route: {kind:'exact';path:string;handler:(req:IncomingMessage,res:ServerResponse)=>void}):()=>void }
  effect(fn:()=>()=>void,label:string):void
}
export function statusHandler(ctx: HostContext, req: IncomingMessage, res: ServerResponse): void {
  const json=(code:number,value:unknown)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value))}
  const rejection=ctx.connection.requestRejection(req)
  if(rejection!==undefined){json(rejection,{error:'请求未获宿主授权'});return}
  if(req.method!=='GET'){res.setHeader('Allow','GET');json(405,{error:'仅支持读取状态'});return}
  try{json(200,collectStatus(ctx))}catch{json(503,{error:'暂时无法读取套件实际状态，请刷新或检查宿主日志。'})}
}
export function apply(ctx: HostContext): void {
  ctx.effect(()=>ctx.webServer.register({kind:'exact',path:'/office-bundle/status',handler:(req,res)=>statusHandler(ctx,req,res)}),'office-bundle: status route')
}
