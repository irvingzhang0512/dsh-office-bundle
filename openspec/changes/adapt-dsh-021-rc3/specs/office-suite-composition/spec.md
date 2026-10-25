# Spec Delta

## MODIFIED Requirements

### Requirement: F001 固定四成员与宿主组合

套件 SHALL 组合 dsh-structured-document、dsh-structured-document-view、dsh-discussion-workbench、dsh-better-sidebar-controller，保持原包名和条目 ID；本组合成员及套件版本为 0.2.1-rc.3+rev.1，宿主 0.2.1-rc.3，Better Sidebar 0.28.0。成员声明须来自真实固定提交与运行产物，MUST 避免独立与套件入口重复挂载。

#### Scenario: 独立及套件安装
- **WHEN** 安装四成员的独立来源或套件固定包
- **THEN** 真实成员声明一致，每个组件只挂载一次，版本与来源可核对


### Requirement: F005 固定包可安装性

套件 SHALL 以已核验完整 Git 提交或同提交的本地预构建 tgz 交付，携带四成员及实体生产依赖；官方宿主、React、Better Sidebar 仍由 peers 提供。完整包须包含运行代码、成员声明、锁、locale、说明及许可证；MUST 不虚构远程地址或把未公开版本说成已发布。

#### Scenario: 从固定包安装
- **WHEN** 环境只取得完整固定 tgz 和所需外部 peers
- **THEN** 套件及四成员可加载，来源与内容散列可核验，不请求不存在的同名公开包或内嵌另一份宿主

