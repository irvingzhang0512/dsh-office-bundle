# 办公套件技术契约

依据 office-suite-implementation-20261018-v1，用户在本会话完整引用并确认实施。

## 入口与组合

host 导出 name／inject／Config／apply。状态条目 id/name=dsh-office-bundle，inject=[loader,pluginPackages,profileContext,webServer,connection]；成员组 id=dsh-office-bundle-members，name=cordis:group，group=true。组内四行从固定包 cordis.patch.yml 中单条 insert 提取，严格验证 id/name、inject 数组及 config 对象，原值不改写。生成清单记版本／来源提交／产物散列，不能依赖可变工作树。客户端 loader id=dsh-office-bundle，plugins.detail.section 仅匹配 bundle subject.pkg.name。无新增业务服务、工具、Skill、用户配置与数据库。

## HTTP（按 path 唯一注册）

/office-bundle/status：GET，空请求体，返回 OfficeStatus；Connection.requestRejection 原生鉴权，失败使用宿主给定状态；unsupported method=405 Allow: GET；探测异常503，不泄露本地路径／配置正文。正常 blocked／partial 仍200，Cache-Control:no-store。

OfficeStatus={schemaVersion:1,dshVersion:string,suiteVersion:string,state:'ready'|'partial'|'blocked',members:MemberStatus[],externalDependencies:MemberStatus[],issues:string[]}。MemberStatus={packageName,entryId,expectedVersion,actualVersion:string|null,enabled:boolean,running:boolean,reason:string|null}。reason 稳定值 missing/version-mismatch/disabled/dependency-disabled/duplicate-source/load-error/waiting/null；issues 仅诊断短句，不包含凭据。

实际来源：ctx.loader.entries()、entry.parent.tree.ctx.baseUrl、ctx.pluginPackages.packageOf，Desktop版本读取profileContext.installAnchor。依据最终条目 disabled／fiber 状态区分启用与运行；依赖停用导致等待为partial，缺失／不匹配／失败为blocked。读取当前 Bundle 选择检查独立入口重复；每次请求重新读取，不在 apply 缓存。

## 客户端与释放

React 页面打开读取、刷新按钮重读；卸载 AbortController，迟到结果忽略。HTTP 使用 Desktop dsh-app://app/ 同源转发，不能用 streaming loopback URL替代。状态分区仅显示版本和诊断，不复制成员开关和配置表单。ctx.effect 包裹 host 路由及客户端注册清理。

## 构建与迁移

TypeScript + tsdown + vitest；浏览器禁止Node／官方宿主 value import。完整包包括lib、patch、locale、生成成员锁、说明文档、LICENSE。四成员作为精确dependencies与bundledDependencies；生产树实体化，关闭autoInstallPeers／脚本，官方peers不内嵌。npm11.6.2 pack --ignore-scripts保留完整版本。根工具只接受Desktop固定锁，支持pack/plan/apply/rollback/snapshot。旧独立disabled选择按原id最小写入；不覆盖未知字段或并发变化，不能无损表示时拒绝。回滚仅配置／安装组合，不覆盖业务数据。
