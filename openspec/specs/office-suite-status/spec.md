# 办公套件状态与展示

## Purpose

承接旧 F003、F004，提供能独立于成员故障显示的只读诊断界面，展示实际加载的宿主、套件、成员与外部依赖。该能力说明状态分类、鉴权和错误反馈，不以安装声明推测运行成功，也不复制成员的原生开关与配置界面。

## Requirements

### Requirement: F003 实际状态与分类

状态详情 SHALL 展示宿主、套件、四成员及外部依赖的实际版本、启用、运行和原因；独立状态能力不硬依赖成员正常运行。ready 为全部正常，partial 为主动停用或由此等待，blocked 为缺包、版本不符、重复来源或加载失败；MUST 基于实际来源及当前加载事实。

#### Scenario: 成员异常诊断
- **WHEN** 成员缺失、版本错误、重复加载、主动关闭或等待停用依赖
- **THEN** 详情仍能诊断且分别给出 blocked 或 partial 与完整原因，不从包声明推测已运行

### Requirement: F003 状态接口鉴权及方法

系统 SHALL 提供 GET /office-bundle/status，经宿主 Connection 鉴权；正常诊断包括 blocked/partial 均返回 200，无法探测为 503，其他方法 405 且 Allow: GET。响应 MUST 禁止缓存并不泄露本机路径、配置正文或凭据。

#### Scenario: 授权与错误请求
- **WHEN** 授权客户端 GET、匿名请求、POST 或探测失败
- **THEN** 分别得到真实状态、宿主鉴权拒绝、405 或 503，不因异常泄漏私人配置

### Requirement: F003 手动刷新及生命周期

详情 SHALL 在打开时读取状态，并提供原生刷新按钮重读实际状态；开关继续使用原生入口，不复制控制表单。界面卸载后 MUST 忽略迟到结果并释放所属请求及注册，窄窗口和中文显示不溢出。

#### Scenario: 刷新并关闭详情
- **WHEN** 状态变化后手动刷新，再在请求返回前关闭详情
- **THEN** 新状态按真实事实显示，关闭后的迟到结果不更新已卸载页面，资源清理正确

### Requirement: F004 双语名称与简介

系统 SHALL 提供中文名称“Irving · 办公套件”、英文“Irving · Office Suite”。中文简介为“组合结构化文档、文档视图、侧边栏控制工具和讨论工作台，统一安装与启停。”；英文简介为“Combine structured documents, document views, sidebar control tools, and the discussion workbench with unified installation and enablement.”。固定包 MUST 提供两语言 meta.title/meta.description，中文 package.description 兜底。

#### Scenario: 固定包原生元信息
- **WHEN** 宿主从固定 tgz 解析 locale 并显示列表与详情
- **THEN** 中英文名称和简介均正确，原生列表及详情一致
