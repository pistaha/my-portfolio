---
title: "Spotifaychik — music platform and production infrastructure"
date: 2026-05-29
weight: -460
summary: "A large ASP.NET Core music backend: catalog, users, playlists, search, security, PostgreSQL, tests and production infrastructure with load balancing and observability."
tags: ["c-sharp", "aspnet-core", "postgresql", "docker", "nginx", "observability", "ci-cd"]
---

## A music service built like a real system

**Spotifaychik** is the flagship backend project in this portfolio. It is not a demo CRUD app: the repository contains the foundation of a music platform that can grow into a full streaming product.

The system manages artists, albums, tracks, users and playlists, supports search and personal scenarios, controls data access and runs in a containerized production environment. The path from HTTP request to Grafana metrics is designed as one connected application.

[Source code on GitHub](https://github.com/pistaha/spotifaychik)

## Product scenarios

- explore artists, albums and tracks;
- search music globally and with advanced filters;
- create, edit and publish playlists;
- view popular tracks, artists and new releases;
- generate personal playlists from listening history;
- manage profile, friends and user statistics;
- upload covers and media with validation and image processing.

Behind these scenarios is a full domain model: artists, releases, tracks, playlists, listening history, roles, permissions, sessions and security audit events.

## Scale in numbers

| Area | Implementation |
| --- | --- |
| API | 11 controllers for music, users, auth, files, search, audit and diagnostics |
| Domain | 18 entities, including `Track`, `Playlist`, `UserSession`, `Permission` and `SecurityAuditLog` |
| Application layer | Commands, queries, DTOs, validators, mapping and pipeline behaviors |
| Quality | 50+ test files for domain, handlers, API, infrastructure and validation |
| Production | PostgreSQL, Docker, Nginx, TLS, API replicas, CI/CD, Prometheus, Grafana and Loki |

## Architecture

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

The layers keep business logic independent from HTTP and database details. CQRS separates reads from writes, while logging and validation are handled through shared pipeline behaviors.

## Security and operations

Authentication is based on JWT. Authorization goes beyond simple roles: the project includes permissions, role management, resource ownership checks and dedicated authorization handlers. Passwords are hashed with BCrypt, sessions are tracked separately, and sensitive actions are written to an asynchronous security audit log.

The production setup uses Nginx for TLS termination and load balancing, several ASP.NET Core API replicas, PostgreSQL with persistent storage, Prometheus metrics, Grafana dashboards, Loki logs and Docker event monitoring. Each backend instance returns `X-Instance-Id`, so round-robin balancing can be verified directly.

## Run

```bash
git clone https://github.com/pistaha/spotifaychik.git
cd spotifaychik
cp .env.example .env
./start.sh
```

After startup, the API, Swagger, Prometheus metrics and Grafana dashboards are available through the prepared infrastructure.

## Result

Spotifaychik demonstrates system-level backend development: domain design, security, media handling, tests, CI/CD, monitoring and scalable deployment in one coherent project.
