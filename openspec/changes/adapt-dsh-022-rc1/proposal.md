# Proposal

文档版：v1（2026-11-04）。实现状态：待实现；具体文档确认：待确认。

## Why

办公套件需跟随官方宿主 API 和运行依赖变化，以保持已有能力并形成可恢复的精确组合。当前源码绑定 rc5，不能仅修改版本声明后作为兼容交付。

## What Changes

- 固定本插件 0.2.2-rc.1+rev.1、宿主 0.2.2-rc.1，并按目标真实 peers 更新完整产物。
- 保持四个成员唯一来源、总／子开关、原条目配置和状态接口；成员提交及完整产物可追溯。
- 配置、存储与回退采用下述领域契约，保留原身份及业务资料。

## Capabilities

### New Capabilities

无新增业务能力。

### Modified Capabilities

- `office-suite-composition`：增加本次固定基线的运行、迁移和验收约束；历史组合仍由原锁及证据追溯。

## Impact

本独立插件的包声明、依赖锁、运行适配、测试及技术说明。既有行为依据 [office-suite-composition](../../specs/office-suite-composition/spec.md) 与 [迁移索引](../../MIGRATION.md)；原稳定 F 编号及原始需求保持，不建立第二份规格。跨库安装和远程交付由维护仓库协调，公开插件文档不复制本机路径、个人数据或凭据。
