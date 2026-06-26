---
title: "Algorithms & Data Structures Labs — data structure coursework"
date: 2026-06-26
weight: -450
slug: "algorithms-data-structures-labs"
summary: "C#/.NET console projects: custom ADTs, lists, stack, queue, map, dictionary, hashing, topological sorting and multilist."
tags: ["c-sharp", "dotnet", "algorithms", "data-structures"]
---

## Overview

**Algorithms & Data Structures Labs** is a dedicated repository for algorithms and data structures coursework. The code is organized by branches: each branch contains an independent C# project, a README and the original assignment.

[Source code on GitHub](https://github.com/pistaha/algorithms-data-structures-labs/tree/main)

## Contents

- `lab1`: List ADT, doubly linked list, cursor-based list and duplicate removal;
- `lab2`: Stack, Queue and Map ADTs with array-backed and linked implementations;
- `lab3`: Dictionary ADT, open hashing, closed hashing and linear probing;
- `lab4`: topological sorting, partial order validation and cycle detection;
- `lab5`: multilist for many-to-many relationships using hashing and two-ring linked structure.

## Technical focus

The project demonstrates manual implementations of classic data structures without relying on built-in collections. The labs cover array storage, linked structures, cursor positions, collisions, hash tables, relation traversal and deterministic console output for behavior checks.

## Stack

- C#;
- .NET 8 / .NET 10;
- console applications;
- Git branches as separate lab snapshots.

## Run

```bash
git clone https://github.com/pistaha/algorithms-data-structures-labs.git
cd algorithms-data-structures-labs
git switch lab3
dotnet run --project "algo3/algo3.csproj"
```

## Result

The repository adds a separate fundamentals track to the portfolio: from linear ADTs to hashing, graph dependencies and multi-linked relations.
