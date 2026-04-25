---
title: "Создание проекта с использованием Webpack, Vite и Docker"
date: 2026-04-24
slug: "webpack"
summary: "Продолжение отчета по лабораторной работе: этап 1 с webpack, vite и Docker, затем этап 2 с Bootstrap 5 и Luxon."
tags: ["веб", "javascript", "webpack", "vite", "bootstrap", "luxon", "docker"]
---

## Этап 1

## Тема

Создание проекта с использованием `webpack`, `vite`, `luxon`, Bootstrap CDN и Docker.

## Что было сделано

В рамках задания был подготовлен отдельный проект `labs/webpack2025` внутри репозитория с такими шагами:

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

## Структура проекта

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

![Скриншот результата команды npx webpack](https://pistaha.github.io/my-portfolio/portfolio/webpack/images/webpack-build-output-user.png)

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

![Страница с Bootstrap CDN и крупным выводом Luxon](https://pistaha.github.io/my-portfolio/portfolio/webpack/images/page-webpack-v2.png)

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

![Скриншот вывода docker ps с запущенным контейнером](https://pistaha.github.io/my-portfolio/portfolio/webpack/images/docker-ps-output-user.png)

Скриншот запуска контейнера через `docker run`:

![Скриншот терминала с запуском docker run](https://pistaha.github.io/my-portfolio/portfolio/webpack/images/docker-run-user.png)

Скриншот страницы, запущенной из Docker-контейнера:

![Страница приложения, открытая из Docker-контейнера](https://pistaha.github.io/my-portfolio/portfolio/webpack/images/page-docker-v2.png)

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

Был создан рабочий проект с базовой сборкой через `webpack`, отображением времени через `luxon`, адаптивной страницей на Bootstrap CDN, а также с альтернативной сборкой через `vite`. Дополнительно проект был упакован в Docker-контейнер на базе `node:24-alpine` и успешно запущен локально.

---

## Этап 2

## Тема

Интеграция `Bootstrap 5` в приложение с использованием библиотеки `Luxon`.

## Что было сделано

На втором этапе был доработан тот же проект `labs/webpack2025`. Приложение было встроено в шаблон на `Bootstrap 5` с использованием библиотеки `Luxon`.

В работе были выполнены следующие шаги:

- подготовлена Bootstrap-разметка страницы с колонками в соотношении `2-8-2`;
- в центральной колонке размещена большая красная кнопка `Показать время`;
- реализовано модальное окно Bootstrap;
- в заголовке модального окна выведена строка `Выполнил: Рыбаков Ярослав`;
- в теле модального окна через `Luxon` выводится текущая дата и время в формате `dd.MM.yyyy HH:mm:ss`;
- добавлены два способа закрытия окна: крестик в заголовке и кнопка `Закрыть` внизу справа;
- подготовлен итоговый экран для скриншота с HTML-кодом и открытым модальным окном.

Локальная среда:

- `node v24.15.0`
- `npm 11.12.1`

## Структура проекта

Основные файлы второго этапа:

- `labs/webpack2025/package.json`
- `labs/webpack2025/src/index.js`
- `labs/webpack2025/src/vite.js`
- `labs/webpack2025/src/renderClock.js`
- `labs/webpack2025/index.html`
- `labs/webpack2025/vite.html`
- `labs/webpack2025/vite.config.js`

## Создание проекта и установка зависимостей

После перехода в каталог проекта использовались команды инициализации и установки зависимостей:

```bash
npm init -y
npm install luxon bootstrap
npm install -D vite webpack webpack-cli serve
```

Скриншот установки зависимостей:

![Установка зависимостей для второго этапа](https://pistaha.github.io/my-portfolio/portfolio/webpack2025-report/images/npm-install-bootstrap-luxon.png)

Для локальной проверки приложение запускалось в браузере, после чего подготавливался итоговый скриншот с открытым модальным окном.

Скриншот запуска приложения:

![Запуск Vite для второго этапа](https://pistaha.github.io/my-portfolio/portfolio/webpack2025-report/images/npm-run-dev.png)

## Подключение `Luxon`

Библиотека `Luxon` используется для получения текущей даты и времени. Формирование значения выполняется в формате:

```js
DateTime.local().setLocale("ru").toFormat("dd.MM.yyyy HH:mm:ss");
```

Пример результата:

```text
25.10.2025 18:06:07
```

## Подключение Bootstrap 5

Для оформления страницы использованы классы `Bootstrap 5`, а для открытия модального окна задействован компонент `Modal`.

На странице реализована сетка с тремя колонками по схеме `2-8-2`. Центральная колонка является основной рабочей областью приложения.

В ней размещена большая красная кнопка:

```text
Показать время
```

Кнопка занимает всю ширину центральной колонки благодаря классам Bootstrap:

```html
<button id="showTimeButton" type="button" class="btn btn-danger btn-lg w-100 h-100 py-3">
  Показать время
</button>
```

## Модальное окно

После нажатия на кнопку открывается модальное окно Bootstrap с затемнением фона.

В заголовке указано имя исполнителя:

```text
Выполнил: Рыбаков Ярослав
```

В теле модального окна крупным шрифтом выводится текущее время, полученное через `Luxon`.

Окно можно закрыть двумя способами:

- крестиком в правом верхнем углу;
- кнопкой `Закрыть` в правом нижнем углу.

Скриншот итогового интерфейса:

![Страница второго этапа с открытым модальным окном](https://pistaha.github.io/my-portfolio/portfolio/webpack2025-report/images/bootstrap-luxon-modal.png)

## Последовательность выполненных действий

Последовательность работы над вторым этапом была следующей:

1. Создание проекта как npm-приложения.
2. Установка зависимостей `Luxon`, `Bootstrap 5` и `Vite`.
3. Подключение `Luxon` для вывода текущей даты и времени.
4. Подключение `Bootstrap 5` для сетки, кнопки и модального окна.
5. Написание HTML-разметки страницы с колонками `2-8-2`.
6. Настройка большой красной кнопки `Показать время`.
7. Реализация модального окна с именем исполнителя и временем.
8. Проверка результата в браузере.
9. Подготовка итогового скриншота с HTML-кодом и открытым модальным окном.

## Вывод

В результате на втором этапе приложение с `Luxon` было встроено в шаблон на `Bootstrap 5`. На странице реализована структура `2-8-2`, большая красная кнопка `Показать время`, модальное окно с ФИО исполнителя и текущими датой и временем, а также два способа закрытия окна. Проект оформлен как продолжение первого этапа лабораторной работы.
