# Irving · 办公套件规格

文档版：office-suite-implementation-20261018-v1。用户已完整引用并明确要求实施该版；本文件等义落实已确认方案，不扩展范围。实现状态：已实现；验证独立记录，隔离原生及固定安装通过，日常结果另记。

## F001 固定组合

四成员 structured-document、structured-document-view、discussion-workbench、better-sidebar-controller 均保持 dsh- 包名及原条目 id；套件包 dsh-office-bundle，全部版本 0.2.1-rc.2+rev.1，宿主 0.2.1-rc.2，外部 Better Sidebar 0.28.0。成员原 patch 固定来源生成 cordis:group，编号 dsh-office-bundle-members。
验收：单独／套件安装、真实 patch 生成及四组件唯一挂载。

## F002 启停与配置

总开关移除套件层，四成员和状态插件全部退出；重开沿用各条目原配置和子开关。原单独 Bundle 关闭选择转为相同成员 disabled，新增成员默认启用，已有显式停用优先。不新增业务配置或数据存储。卸载不恢复旧独立 Bundle 或删除业务资料。
验收：原 id 覆盖命中、依赖停用、关闭／重开／重启、服务／工具／客户端清理。

## F003 状态与界面

详情展示宿主／套件／成员／外部依赖实际版本、启用和运行状态；独立宿主条目不硬依赖成员，异常时仍可诊断。GET /office-bundle/status，Connection 鉴权，正常诊断200，无法探测503，其他方法405。ready 全部正常，partial 主动停用或因此等待，blocked 缺包／版本不符／重复／加载失败。打开读取及手动刷新，开关沿用原生入口。
验收：真实来源而非依赖声明推测；异常原因完整；本地化／窄窗口与生命周期通过。

## F004 展示元信息

中文 Irving · 办公套件；英文 Irving · Office Suite。中文简介：组合结构化文档、文档视图、侧边栏控制工具和讨论工作台，统一安装与启停。英文：Combine structured documents, document views, sidebar control tools, and the discussion workbench with unified installation and enablement. locale/en.json 与 zh.json 导出 meta.title／meta.description，package.description 中文兜底。
验收：固定包可解析两语言元信息，原生列表／详情正确。

## F005 安装与恢复

本地独立 Git，无虚构远程。预构建 tgz 携带四成员及生产依赖，官方宿主／React／Better Sidebar 保留 peers。原四成员顶层安装声明与 Bundle 选择由套件接管，业务数据原位保留。根工具执行停机检查、冷备份核验、CAS、幂等应用、固定来源校验和失败恢复；实装快照自动采集。
验收：全新、部分／全部旧安装、重复应用、关闭状态迁移、冲突、缺包、失败回滚。业务写入只在隔离环境测试，日常只读核验原数据。公开发布／工具重分类／新业务流程不在范围。
