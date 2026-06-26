---
title: "Algorithms & Data Structures Labs — data structure coursework"
date: 2026-06-26
weight: -450
slug: "algorithms-data-structures-labs"
summary: "A C#/.NET algorithms and data structures repository covering List, Stack, Queue, Map, Dictionary, hashing, topological sorting and multilist."
tags: ["c-sharp", "dotnet", "algorithms", "data-structures"]
---

## Overview

**Algorithms & Data Structures Labs** is a public repository with algorithms and data structures coursework. It is not a single small exercise: it is a set of independent C#/.NET console projects where foundational ADTs are implemented manually, without `List<T>`, `Dictionary<TKey,TValue>`, `Stack<T>`, `Queue<T>` or other built-in collections.

**Repository:** [github.com/pistaha/algorithms-data-structures-labs](https://github.com/pistaha/algorithms-data-structures-labs)

The `main` branch works as a navigation page, while individual labs live in separate branches. Each lab has its own project, README, source code and `docs/task.txt` with the original assignment.

## What it demonstrates

- ADT design through a public interface and multiple internal representations;
- array storage, linked structures, cursor positions and manual relation management;
- manual implementations of stacks, queues, lists, map/dictionary and hash tables;
- collision handling through separate chaining, closed hashing and linear probing;
- topological sorting with impossible-order detection;
- many-to-many modeling through a multilist and two linked rings;
- deterministic console demos for checking algorithm behavior locally.

## Labs

| Branch | Topic | Implementation | Link |
| --- | --- | --- | --- |
| `lab1` | List ADT | Doubly linked list, cursor-based list, duplicate removal for address book records | [Open branch](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab1) |
| `lab2` | Stack / Queue / Map ADT | Array stack, linked stack, list-backed stack, array and circular queues, linked-list map | [Open branch](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab2) |
| `lab3` | Dictionary ADT | Open hashing, closed hashing and linear probing | [Open branch](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab3) |
| `lab4` | Partial Order / Topological Sort | Dependency storage, topological sorting and impossible ordering detection | [Open branch](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab4) |
| `lab5` | Student-Course Multilist | Student/course hash tables and bidirectional many-to-many registration nodes | [Open branch](https://github.com/pistaha/algorithms-data-structures-labs/tree/lab5) |

## Branch breakdown

### `lab1`: List ADT

The first lab compares two implementations of the same abstract list: a doubly linked list and a cursor model over an array. The demo removes duplicate address book entries, while records store fields as fixed-size `char[]` values.

Key files:

- `algo 1/dvus.cs`;
- `algo 1/curs.cs`;
- `algo 1/AddressBookEntry.cs`;
- `algo 1/Program.cs`.

### `lab2`: Stack, Queue, List and Map

The second lab expands the ADT set and shows the same behavior through different storage strategies. The stack is implemented through an array, linked nodes and a custom list. The queue is implemented through an array, a circular linked structure and a list. The branch also includes a linked-list map with assignment, lookup and printing.

### `lab3`: Dictionary ADT and hashing

The third lab focuses on dictionary/set behavior through hash tables. It includes open hashing with collision chains and closed hashing with linear probing. The demo uses two sets, `goodguys` and `badguys`, with commands that update and check the status of a name.

Demo commands:

- `F name` moves a name to the positive set;
- `U name` moves a name to the negative set;
- `? name` checks status;
- `P` prints both sets;
- `E` exits.

### `lab4`: partial order and topological sorting

The fourth lab converts a partially ordered set into a linear order when possible. Constraints like `x < y` are stored as integer pairs and then transformed into an internal dependency structure. The algorithm selects valid next elements and detects cases where no linear order can be produced.

### `lab5`: student-course multilist

The fifth lab models a many-to-many relationship without a database or collection framework. Students and courses are stored in separate closed-hashing tables, while each registration is a node that belongs to two rings at once: courses of a student and students of a course.

Supported operations:

- add a student to a course;
- remove a student from a specific course;
- remove a student from all courses;
- remove all students from a course;
- print all students of a course;
- print all courses of a student.

## Engineering notes

The main value of the repository is that the data structures are implemented at a low level. The code makes array bounds, `Full` / `Empty` states, node deletion, pointer-like traversal, collision handling and bidirectional multilist consistency explicit. It complements the portfolio's full-stack and backend projects by showing the algorithmic foundation underneath.

## Stack

- C#;
- .NET 8 / .NET 10;
- console applications;
- manual ADTs without built-in collections;
- Git branches as separate lab snapshots.

## Run

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

## Result

The repository adds a dedicated algorithms and data structures track to the portfolio. It shows competence beyond application development: ADTs, hashing, graph-like dependencies and manual in-memory relationship modeling.
