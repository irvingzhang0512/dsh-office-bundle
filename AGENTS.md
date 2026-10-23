# 办公套件维护约定

先读 [根约定](../AGENTS.md)、[维护规范](../docs/MAINTENANCE.md) 与根开发 Skill。本库唯一需求入口为 [OpenSpec 迁移索引](openspec/MIGRATION.md)：已落地契约在 openspec/specs，新增需求先写所属 change 的 proposal、specs、design、tasks 与 review，用户确认具体版后才实施，同版确认不重复。旧 docs/SPEC.md、原始需求和历史证据冻结；技术契约 docs/ARCHITECTURE.md 保持原职责，后续已确认实现仍须同步。

保留用户改动和个人项目／会议／计划／业务资料，不因需求迁移移动、改写或复制到公共规格。OpenSpec 校验通过、artifacts ready 或任务勾选不代表批准、实现或产品验证；预期不变的 Bug 直接修复，不强制新提案，不改规格掩盖错误。运行代码修改执行 typecheck、test、build；纯文档仅严格校验 OpenSpec、编号、状态与链接，不提高包版本或重装。套件不持有业务数据，不复制组件工具与 Skill，不修改官方宿主。

用户于 2026-10-24 选择与其他插件相同的公开 GitHub 仓库，实际 origin 为 https://github.com/irvingzhang0512/dsh-office-bundle.git 。仓库创建、源码推送、预构建 Release 可下载和公网安装分别核实；仓库存在不表示安装包已经发布。分发准备按根 docs/PLUGIN-MARKET.md 核对完整产物与真实元信息，推送与发布按会话具体授权处理。
