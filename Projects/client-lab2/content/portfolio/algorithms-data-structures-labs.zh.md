---
title: "Algorithms & Data Structures Labs — 数据结构课程实验"
date: 2026-06-26
weight: -450
slug: "algorithms-data-structures-labs"
summary: "C#/.NET 算法与数据结构仓库：List、Stack、Queue、Map、Dictionary、哈希、拓扑排序和 multilist。"
tags: ["c-sharp", "dotnet", "algorithms", "data-structures"]
---

## 项目概览

**Algorithms & Data Structures Labs** 是一个公开的算法与数据结构实验仓库。它不是一个小练习，而是一组独立的 C#/.NET 控制台项目。项目中的基础 ADT 都是手动实现的，不依赖 `List<T>`、`Dictionary<TKey,TValue>`、`Stack<T>`、`Queue<T>` 或其他内置集合。

**具体仓库：** [github.com/pistaha/algorithms-data-structures-labs](https://github.com/pistaha/algorithms-data-structures-labs)

`main` 分支作为导航页使用，每个实验保存在独立分支中。每个实验都有自己的项目、README、源代码和包含原始任务的 `docs/task.txt`。

## 项目展示的能力

- 通过公共接口和不同内部表示设计 ADT；
- 数组存储、链式结构、游标位置和手动关系管理；
- 手动实现栈、队列、列表、map/dictionary 和哈希表；
- 使用 separate chaining、closed hashing 和 linear probing 处理冲突；
- 带有失败情况检测的拓扑排序；
- 使用 multilist 和两个环形链表建模多对多关系；
- 通过确定性的控制台演示在本地验证算法行为。

## 实验列表

| 分支 | 主题 | 实现内容 | 链接 |
| --- | --- | --- | --- |
| `lab1` | List ADT | 双向链表、基于游标的列表、通讯录记录去重 | [打开分支](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab1) |
| `lab2` | Stack / Queue / Map ADT | 数组栈、链式栈、基于列表的栈、数组队列、环形队列、linked-list map | [打开分支](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab2) |
| `lab3` | Dictionary ADT | 开放哈希、闭合哈希和线性探测 | [打开分支](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab3) |
| `lab4` | Partial Order / Topological Sort | 依赖关系存储、拓扑排序和无法排序情况检测 | [打开分支](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab4) |
| `lab5` | Student-Course Multilist | 学生/课程哈希表，以及双向多对多注册节点 | [打开分支](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab5) |

## 分支说明

### `lab1`：List ADT

第一个实验比较同一个抽象列表的两种实现：双向链表和基于数组的游标模型。演示任务用于删除通讯录中的重复记录，记录字段以固定长度 `char[]` 保存。

关键文件：

- `algo 1/dvus.cs`；
- `algo 1/curs.cs`；
- `algo 1/AddressBookEntry.cs`；
- `algo 1/Program.cs`。

### `lab2`：Stack、Queue、List 和 Map

第二个实验扩展了 ADT 集合，并用不同存储策略实现相同行为。栈通过数组、链式节点和自定义列表实现；队列通过数组、环形链式结构和列表实现；同时还包含支持赋值、查找和打印的 linked-list map。

### `lab3`：Dictionary ADT 和哈希

第三个实验关注基于哈希表的 dictionary/set 行为。项目包含带冲突链的开放哈希，以及带线性探测的闭合哈希。演示使用 `goodguys` 和 `badguys` 两个集合，通过命令修改和查询姓名状态。

演示命令：

- `F name`：把姓名移动到正向集合；
- `U name`：把姓名移动到负向集合；
- `? name`：查询状态；
- `P`：打印两个集合；
- `E`：退出。

### `lab4`：偏序关系和拓扑排序

第四个实验在可能的情况下把偏序集合转换成线性顺序。`x < y` 这样的约束以整数对保存，然后转换成内部依赖结构。算法逐步选择可以放入结果的元素，并检测无法构造线性顺序的情况。

### `lab5`：学生-课程 multilist

第五个实验在没有数据库和集合框架的情况下建模多对多关系。学生和课程分别存储在闭合哈希表中，每个注册记录都是一个节点，同时存在于两个环中：某个学生的课程环，以及某门课程的学生环。

支持的操作：

- 添加学生到课程；
- 从某门课程移除学生；
- 从所有课程移除学生；
- 从课程中移除所有学生；
- 输出某门课程的所有学生；
- 输出某个学生的所有课程。

## 工程细节

这个仓库的价值在于数据结构是低层级手动实现的。代码中可以直接看到数组边界、`Full` / `Empty` 状态、节点删除、类似指针的遍历、冲突处理，以及 multilist 中两个方向关系的一致性维护。它补充了作品集中 full-stack 和 backend 项目之外的算法基础。

## 技术栈

- C#；
- .NET 8 / .NET 10；
- 控制台应用；
- 不使用内置集合的手动 ADT；
- 使用 Git 分支保存不同实验项目。

## 运行

```bash
git clone https://github.com/pistaha/algorithms-data-structures-labs.git
cd algorithms-data-structures-labs

git switch lab1
dotnet run --project "algo 1/algo 1.csproj"

git switch lab3
dotnet run --project "algo3/algo3.csproj"

git switch lab5
dotnet run --project "algo 5/algo 5.csproj"
```

## 结果

该仓库为作品集增加了独立的算法与数据结构方向。它展示的不只是应用开发能力，还包括 ADT、哈希、图式依赖关系，以及内存中关系建模的基础能力。
