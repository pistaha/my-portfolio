---
title: "ElectoLibrary — 完整电子图书馆"
date: 2026-06-19
weight: -500
summary: "Vue 3 SPA + FastAPI + SQLite：目录、CRUD、收藏、预约、专题集合、封面上传、测试和 Docker。"
tags: ["vue", "fastapi", "python", "sqlite", "docker", "spa"]
---

## 项目概览

**ElectoLibrary** 是一个完整的客户端-服务器电子图书馆。前端通过 REST API 与后端交互，数据保存在 SQLite 中，项目可通过容器运行，并覆盖从搜索图书到预约图书的完整用户流程。

[GitHub 源代码](https://github.com/pistaha/electolibrary-exam)

![ElectoLibrary 首页](https://raw.githubusercontent.com/pistaha/electolibrary-exam/main/docs/imgs/home.png)

## 已实现功能

- 按书名、作者和出版社搜索目录；
- 按库存过滤，并按日期或字母排序；
- 创建、查看、编辑和删除图书；
- 上传 JPG 封面并校验大小；
- 收藏、预约和取消预约；
- 专题集合和独立用户页面；
- 响应式导航、通知和 404 页面；
- SQLite 持久化存储；
- API 测试和 Docker Compose 可复现启动。

## 架构

```text
Browser
  └─ Vue 3 + Vue Router
       ├─ views / components
       ├─ composable useBooks
       └─ API service
            └─ FastAPI
                 ├─ CRUD and business operations
                 ├─ cover uploads
                 └─ SQLite
```

前端拆分为视图、可复用组件和 API 访问层。目录逻辑放在 composable 中，后端负责业务操作和持久化状态。

## 运行

```bash
git clone https://github.com/pistaha/electolibrary-exam.git
cd electolibrary-exam
docker compose up --build
```

## 结果

这个项目把界面、API、数据库、文件上传、测试和容器化组合成一个可复现的全栈解决方案。
