---
title: "ElectoLibrary — full-featured digital library"
date: 2026-06-19
weight: -500
summary: "Vue 3 SPA + FastAPI + SQLite: catalog, CRUD, favorites, reservations, collections, cover uploads, tests and Docker."
tags: ["vue", "fastapi", "python", "sqlite", "docker", "spa"]
---

## Overview

**ElectoLibrary** is a complete client-server digital library. The frontend works with a REST API, data is stored in SQLite, the project runs in containers and covers the full user flow from book search to reservation.

[Source code on GitHub](https://github.com/pistaha/electolibrary-exam)

![ElectoLibrary home page](https://raw.githubusercontent.com/pistaha/electolibrary-exam/main/docs/imgs/home.png)

## What is implemented

- catalog search by title, author and publisher;
- filtering by availability and sorting by date or alphabet;
- create, view, edit and delete books;
- JPG cover upload with size validation;
- favorites, reservation and reservation cancellation;
- thematic collections and user sections;
- responsive navigation, notifications and a 404 page;
- SQLite persistence;
- API tests and reproducible Docker Compose launch.

## Architecture

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

The frontend is split into views, reusable components and an API access layer. Catalog logic is extracted into a composable, while the backend owns business operations and persistent state.

## Run

```bash
git clone https://github.com/pistaha/electolibrary-exam.git
cd electolibrary-exam
docker compose up --build
```

## Result

The project combines interface, API, database, file uploads, testing and containerization in one reproducible full-stack solution.
