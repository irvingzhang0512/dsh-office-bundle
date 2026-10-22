# 办公套件现状技术契约

本轮技术文档保持字节；后续已确认实现仍维护 [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)。现行功能权威为主规格，原 SPEC 与需求仅作历史追溯。

## 入口与组成

host 导出 name/inject/Config/apply；状态条目 id/name=dsh-office-bundle，inject=[loader,pluginPackages,profileContext,webServer,connection]。成员组 id=dsh-office-bundle-members、name=cordis:group、group=true。从固定包 patch 单条 insert 提取四成员，校验 id/name、inject 数组、config 对象，保留原值。生成清单记录完整版本、来源提交、产物散列，不读取可变工作树为分发依据。客户端 loader id 同包名，plugins.detail.section 仅匹配本 bundle subject.pkg.name。

## 状态接口

GET /office-bundle/status，Connection.requestRejection 原生鉴权；拒绝沿用宿主状态。未支持方法 405 与 Allow: GET；探测失败 503。正常 ready/partial/blocked 均 200，Cache-Control:no-store。

OfficeStatus={schemaVersion:1,dshVersion,suiteVersion,state,members,externalDependencies,issues}。MemberStatus={packageName,entryId,expectedVersion,actualVersion:string|null,enabled:boolean,running:boolean,reason:string|null}。reason 稳定值 missing/version-mismatch/disabled/dependency-disabled/duplicate-source/load-error/waiting/null；issues 不含凭据、本地路径或配置正文。

按 loader.entries、entry.parent.tree.ctx.baseUrl、pluginPackages.packageOf 与 profileContext.installAnchor 读取实际来源／版本，最终 disabled/fiber 分别表达启用／运行；主动停用及依赖等待 partial，缺失、错版、重复、失败 blocked。每请求重新读取，不在 apply 缓存；Bundle 选择用于重复独立入口检测。

## 客户端、分发和恢复

Desktop dsh-app://app/ 同源转发，不替换成 streaming loopback URL；打开读取与手动刷新，AbortController 清理、迟到结果忽略，ctx.effect 释放自有注册。使用原生 primitives，精确 peer 与 client external，不复制宿主 UI 或成员配置表单。

完整 tgz 含 lib、patch、locale、成员锁、说明和 LICENSE；四成员精确 dependencies+bundledDependencies，生产树实体化、关闭自动 peer 安装和脚本，官方宿主／React／Better Sidebar 保留 peer。npm 11.6.2 pack --ignore-scripts 保留完整 +rev 修订。接管按原 ID 最小写入 disabled，未知字段保留，CAS 拒绝并发和不可无损表示状态，回滚限安装与配置而不覆盖业务数据。原生 setBundleEnabled 返回 pending 时分别核对实际保存和 partial，不篡改官方行为。
