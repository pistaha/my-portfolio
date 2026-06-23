---
title: "Spotifaychik — 音乐平台与生产级基础设施"
date: 2026-05-29
weight: -460
summary: "大型 ASP.NET Core 音乐后端：目录、用户、播放列表、搜索、安全、PostgreSQL、测试，以及带负载均衡和可观测性的生产环境。"
tags: ["c-sharp", "aspnet-core", "postgresql", "docker", "nginx", "observability", "ci-cd"]
---

## 像真实系统一样构建的音乐服务

**Spotifaychik** 是这个作品集中最重要的后端项目。它不是简单的 CRUD 示例，而是一个可以继续扩展为完整流媒体产品的音乐平台基础。

系统管理艺术家、专辑、曲目、用户和播放列表，支持搜索和个性化场景，控制数据访问，并运行在容器化的生产环境中。从 HTTP 请求到 Grafana 指标，整个链路都作为一个整体设计。

[GitHub 源代码](https://github.com/pistaha/spotifaychik)

## 用户场景

- 浏览艺术家、专辑和曲目；
- 使用全局搜索和高级搜索查找音乐；
- 创建、编辑和发布播放列表；
- 查看热门曲目、艺术家和新发行内容；
- 根据播放历史生成个性化播放列表；
- 管理个人资料、好友和用户统计；
- 上传封面和媒体文件，并进行验证和图像处理。

这些场景背后是一套完整的领域模型：艺术家、发行、曲目、播放列表、收听历史、角色、权限、会话和安全审计事件。

## 项目规模

| 范围 | 实现 |
| --- | --- |
| API | 11 个控制器，覆盖音乐、用户、认证、文件、搜索、审计和诊断 |
| 领域模型 | 18 个实体，包括 `Track`、`Playlist`、`UserSession`、`Permission` 和 `SecurityAuditLog` |
| 应用层 | 命令、查询、DTO、验证器、映射和 pipeline behaviors |
| 质量 | 50 多个测试文件，覆盖领域、处理器、API、基础设施和验证 |
| 生产环境 | PostgreSQL、Docker、Nginx、TLS、API 副本、CI/CD、Prometheus、Grafana 和 Loki |

## 架构

```text
MusicService.API
  ├─ controllers, authentication, authorization
  ├─ files, diagnostics, Swagger
  └─ HTTP boundary
        ↓
MusicService.Application
  ├─ CQRS commands and queries
  ├─ handlers, validators, DTOs and mapping
  └─ logging / validation pipeline
        ↓
MusicService.Domain
  └─ music, users, permissions, sessions and audit
        ↓
MusicService.Infrastructure
  ├─ EF Core, PostgreSQL and migrations
  ├─ password hashing and security services
  └─ file storage and background processes
```

分层架构让业务逻辑不依赖 HTTP 和数据库细节。CQRS 将读写场景拆开，日志和验证通过统一 pipeline 处理。

## 安全与运维

认证基于 JWT。授权不仅是角色判断，还包括 permissions、角色管理、资源所有者检查和独立的 authorization handlers。密码使用 BCrypt 哈希，用户会话单独记录，敏感操作进入异步安全审计日志。

生产环境使用 Nginx 处理 TLS 和负载均衡，多副本 ASP.NET Core API 处理请求，PostgreSQL 使用持久化存储，Prometheus 收集指标，Grafana 展示看板，Loki 收集日志。每个后端实例返回 `X-Instance-Id`，可以直接验证轮询负载均衡。

## 运行

```bash
git clone https://github.com/pistaha/spotifaychik.git
cd spotifaychik
cp .env.example .env
./start.sh
```

启动后可以通过准备好的基础设施访问 API、Swagger、Prometheus 指标和 Grafana 看板。

## 结果

Spotifaychik 展示了系统级后端开发能力：领域设计、安全、媒体处理、测试、CI/CD、监控和可扩展部署都在同一个完整项目中实现。
