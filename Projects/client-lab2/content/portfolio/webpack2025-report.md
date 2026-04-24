---
title: "Создание проекта с использованием Webpack, Vite и Docker"
date: 2026-04-24
slug: "webpack"
summary: "Отчет по лабораторной работе: webpack-сборка, Bootstrap CDN, Luxon, переход на Vite и запуск в Docker."
tags: ["веб", "javascript", "webpack", "docker"]
---

## Тема

Создание проекта с использованием `webpack`, `vite`, `luxon`, Bootstrap CDN и Docker.

## Что было сделано

В рамках задания был подготовлен отдельный учебный проект `labs/webpack2025` внутри репозитория с такими шагами:

- инициализирован npm-проект;
- установлены `luxon`, `webpack`, `webpack-cli`, `serve` и `vite`;
- создан исходный файл `src/index.js` для сборки через `webpack`;
- создан отдельный вход `src/vite.js` и страница `vite.html` для варианта на `vite`;
- добавлена веб-страница `index.html` с подключением Bootstrap по CDN;
- реализован крупный вывод даты и времени через `luxon`;
- создан `Dockerfile` на базе `node:24-alpine`;
- выполнены локальная сборка, запуск проекта и запуск в Docker-контейнере.

Локальная среда:

- `node v24.15.0`
- `npm 11.12.1`
- `Docker 29.3.1`

## Структура учебного проекта

Основные файлы лабораторной:

- `labs/webpack2025/src/index.js`
- `labs/webpack2025/src/vite.js`
- `labs/webpack2025/src/renderClock.js`
- `labs/webpack2025/index.html`
- `labs/webpack2025/vite.html`
- `labs/webpack2025/webpack.config.js`
- `labs/webpack2025/vite.config.js`
- `labs/webpack2025/Dockerfile`

## Результат команды `npx webpack`

Команда сборки:

```bash
npx webpack
```

Результат сборки:

```text
asset main.js 69.1 KiB [emitted] [minimized] (name: main)
orphan modules 256 KiB [orphan] 2 modules
./src/index.js + 2 modules 256 KiB [built] [code generated]
webpack 5.106.2 compiled successfully in 404 ms
```

Скриншот вывода команды:

![Скриншот результата команды npx webpack](images/webpack-build-output-user.png)

## Веб-страница с Bootstrap CDN и Luxon

В `index.html` подключен Bootstrap через CDN:

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
  crossorigin="anonymous"
/>
```

Время выводится через `luxon` крупным шрифтом и обновляется каждую секунду:

```js
import { DateTime } from "luxon";

setInterval(() => {
  hh.textContent = DateTime.local()
    .setLocale("ru")
    .toFormat("dd.LL.y HH:mm:ss");
}, 1000);
```

Скриншот внешнего вида страницы:

![Страница с Bootstrap CDN и крупным выводом Luxon](images/page-webpack-v2.png)

## Переход на `vite`

Дополнительно был создан вариант проекта на `vite`.

Команда сборки:

```bash
npm run build:vite
```

Результат:

```text
vite v8.0.10 building client environment for production...
transforming...✓ 7 modules transformed.
rendering chunks...
computing gzip size...
vite-dist/vite.html                 1.71 kB | gzip:  0.94 kB
vite-dist/assets/main-Clt1YauP.js  71.34 kB | gzip: 22.50 kB
✓ built in 33ms
```

Для этого был добавлен файл `vite.config.js`, чтобы сборка шла от `vite.html` в каталог `vite-dist`.

## Содержимое `Dockerfile`

Использован рекомендованный образ `node:24-alpine`.

```dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx webpack

EXPOSE 3000

CMD ["npx", "serve", ".", "-l", "3000"]
```

## Запуск приложения через Docker

Сборка образа:

```bash
docker build -t webpack2025-lab .
```

Запуск контейнера:

```bash
docker run --rm -p 3001:3000 --name webpack2025-lab-container webpack2025-lab
```

Проверка контейнера:

```bash
docker ps --filter name=webpack2025-lab-container
```

Результат проверки:

```text
CONTAINER ID   IMAGE             COMMAND                  CREATED              STATUS              PORTS                                         NAMES
7dc727533edf   webpack2025-lab   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:3001->3000/tcp, [::]:3001->3000/tcp   webpack2025-lab-container
```

Скриншот запущенного контейнера:

![Скриншот вывода docker ps с запущенным контейнером](images/docker-ps-output.png)

Скриншот запуска контейнера через `docker run`:

![Скриншот терминала с запуском docker run](images/docker-run-user.png)

Скриншот страницы, запущенной из Docker-контейнера:

![Страница приложения, открытая из Docker-контейнера](images/page-docker-v2.png)

## Последовательность действий для запуска

Если повторять запуск с нуля, достаточно выполнить:

```bash
cd labs/webpack2025
npm install
npx webpack
npx serve . -l 3000
```

Для запуска в Docker:

```bash
cd labs/webpack2025
docker build -t webpack2025-lab .
docker run --rm -p 3001:3000 --name webpack2025-lab-container webpack2025-lab
```

После этого приложение будет доступно по адресу:

```text
http://localhost:3000/
```

Для Docker-варианта:

```text
http://localhost:3001/
```

## Вывод

Был создан рабочий учебный проект с базовой сборкой через `webpack`, отображением времени через `luxon`, адаптивной страницей на Bootstrap CDN, а также с альтернативной сборкой через `vite`. Дополнительно проект был упакован в Docker-контейнер на базе `node:24-alpine` и успешно запущен локально.
