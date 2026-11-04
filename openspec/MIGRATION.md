# dsh-office-bundle 需求迁移索引

迁移日期：2026-10-22。本轮仅把既有开发需求整理为 OpenSpec，未授权待定功能实施。当前功能契约在 `openspec/specs/`；待定增量在 `openspec/changes/`，批准和完成前不合入主规格。原始需求、旧 `docs/SPEC.md` 和历史证据全文保留并冻结，不再双写活动需求。

本轮其他技术／使用文档、运行 Skill、源码、测试、配置、构建产物和个人资料全部保持原字节；它们并非永久冻结，未来已确认实现后仍应同步实际技术和使用说明。个人项目、会议、周报和业务样本不因软件规格转换而移动、重写或复制到新公共规格。

OpenSpec 校验只证明文档结构，不等于用户批准、产品实现或运行验证。新功能先维护 proposal／specs／design／tasks 和具体版 review，获确认后才改实现；已有预期不变的 Bug 可直接修复，不强制新提案，也不得改预期掩盖 Bug。纯文档不改包版本、依赖、运行锁或实装快照，不提交／推送。

## 当前能力

主规格：[固定组合与恢复](specs/office-suite-composition/spec.md)、[状态与展示](specs/office-suite-status/spec.md)。实际技术契约见 [CONTRACTS](CONTRACTS.md) 及原架构。没有发现应新增的待定业务 change；工具重分类和新会议／项目流程明确不在套件当次范围。

## 状态、确认和证据

F001–F005 按 office-suite-implementation-20261018-v1 已获用户完整引用并明确要求实施；旧 SPEC 标记已实现。版本 0.2.1-rc.2+rev.1，宿主 0.2.1-rc.2、Better Sidebar 0.28.0。四个成员身份、配置、业务数据保持；没有远程或公开发布事实，不添加虚构地址。

历史 2026-10-18 记录含套件 typecheck／build 和 5 项测试，固定包、原生状态与总子开关、唯一组件及基本办公链路验证；跨库汇总的根 40 项／全插件 1422 项属于当时记录，不是本轮复跑。原生开关可能保存但返回 pending，独立核对保存与 partial，不能写成失败或隐藏该行为。日常和隔离、只读与业务写入、公开安装分别记账。

本轮只做文档结构与保护检查，不启动／安装环境，不刷新版本锁、快照或兼容标记。原 SPEC 验收的全新／部分旧安装、重复应用、关闭选择、冲突、缺包和恢复边界全部保留于主规格场景。

## 全部原文档分类

| 原文件 | 职责、迁移去向与状态 |
|---|---|
| [AGENTS.md](../AGENTS.md) | 维护路由与套件边界，仅更新 OpenSpec 入口。 |
| [CHANGELOG.md](../CHANGELOG.md) | 既有本地交付历史，冻结证据。 |
| [README.md](../README.md) | 产品入口，仅更新现行规格路由。 |
| [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) | 实际入口、状态 API、客户端和固定包迁移技术契约；本轮保持，后续真实实现继续维护。 |
| [docs/REQUIREMENTS.md](../docs/REQUIREMENTS.md) | 2026-10-18 用户原始确认来源，全文冻结；末尾旧 SPEC 路由只作历史文本。 |
| [docs/SPEC.md](../docs/SPEC.md) | 已确认并实现的 F001–F005，冻结并映射两个主规格。 |
| [docs/VERIFICATION-OFFICE-20261018.md](../docs/VERIFICATION-OFFICE-20261018.md) | 套件 5 项测试、原生与安装事实及跨库历史验证；不是本轮执行记录。 |

## 原 F 编号到 Requirement 与验收场景

下面使用精确 Requirement 标题和场景名；主规格为已落地行为契约，changes 仍待定。条目存在不等于本轮运行通过。

| 原编号／来源 | 规格与 Requirement | 验收场景 | 实现／验证归属 |
|---|---|---|---|
| F001 | [F001 固定四成员与宿主组合](specs/office-suite-composition/spec.md) | 独立及套件安装 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F002 | [F002 总子开关及继承选择](specs/office-suite-composition/spec.md) | 关闭重开与重启；依赖成员关闭 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F002 | [F002 不接管业务数据](specs/office-suite-composition/spec.md) | 卸载套件 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F005 | [F005 固定包可安装性](specs/office-suite-composition/spec.md) | 从固定包安装 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F005 | [F005 无损接管与失败恢复](specs/office-suite-composition/spec.md) | 重复应用与关闭迁移；失败回滚 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F005 | [F005 验证与非目标](specs/office-suite-composition/spec.md) | 读取交付结果 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F003 | [F003 实际状态与分类](specs/office-suite-status/spec.md) | 成员异常诊断 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F003 | [F003 状态接口鉴权及方法](specs/office-suite-status/spec.md) | 授权与错误请求 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F003 | [F003 手动刷新及生命周期](specs/office-suite-status/spec.md) | 刷新并关闭详情 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |
| F004 | [F004 双语名称与简介](specs/office-suite-status/spec.md) | 固定包原生元信息 | 已有行为；原范围与证据见上方状态说明及原 SPEC，不新增验证声明 |

## 本轮检查

新增内容仅在 openspec 内，允许的既有修改仅 AGENTS／README 文档路由。严格 CLI 校验与逐文件前置哈希核对另在迁移交付记录汇总；源码、运行 Skill、技术说明、原始需求、旧 SPEC、历史证据及个人资料不得变化。本轮不运行 typecheck／产品测试／构建，不执行安装、迁移、提交或推送。


## 2026-11-04 rc5升级增量

[adapt-dsh-021-rc5 v1](changes/adapt-dsh-021-rc5/proposal.md) 承接本次固定组合适配；具体文档待确认、实现待实施、验证另记。既有编号及历史证据保持，未确认前不合入主规格。


## 2026-11-04 DSH 0.2.2-rc.1 升级增量

[adapt-dsh-022-rc1 v1](changes/adapt-dsh-022-rc1/proposal.md) 记录新目标的适配、迁移与验收；具体文件待确认、实现待实施，验证另记。旧编号及历史来源保持，未提前同步主规格。
