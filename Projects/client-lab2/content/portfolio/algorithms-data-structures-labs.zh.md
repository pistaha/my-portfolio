---
title: "Algorithms & Data Structures Labs — 数据结构课程实验"
date: 2026-06-26
weight: -450
slug: "algorithms-data-structures-labs"
summary: "C#/.NET 控制台项目：自定义 ADT、列表、栈、队列、Map、字典、哈希、拓扑排序和 multilist。"
tags: ["c-sharp", "dotnet", "algorithms", "data-structures"]
---

## 项目概览

**Algorithms & Data Structures Labs** 是一个独立的算法与数据结构实验仓库。代码按 Git 分支组织：每个分支都包含一个独立的 C# 项目、README 和原始任务说明。

[GitHub 源代码](https://github.com/pistaha/algorithms-data-structures-labs/tree/main)

## 内容

- `lab1`：List ADT、双向链表、基于游标的列表和重复项删除；
- `lab2`：Stack、Queue 和 Map ADT，包括数组实现和链式实现；
- `lab3`：Dictionary ADT、开放哈希、闭合哈希和线性探测；
- `lab4`：拓扑排序、偏序关系校验和环检测；
- `lab5`：使用哈希和双环链式结构建模多对多关系的 multilist。

## 技术重点

项目展示了不依赖内置集合的经典数据结构手动实现。实验覆盖数组存储、链式结构、游标位置、冲突处理、哈希表、关系遍历，以及用于验证行为的确定性控制台输出。

## 技术栈

- C#；
- .NET 8 / .NET 10；
- 控制台应用；
- 使用 Git 分支保存不同实验项目的快照。

## 运行

```bash
git clone https://github.com/pistaha/algorithms-data-structures-labs.git
cd algorithms-data-structures-labs
git switch lab3
dotnet run --project "algo3/algo3.csproj"
```

## 结果

该仓库为作品集增加了一个独立的基础能力方向：从线性 ADT 到哈希、图依赖关系和多重链式关系建模。
