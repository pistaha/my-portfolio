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

Использован образ `node:24-alpine`, так как в задании рекомендовано применять alpine-версию образа.

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

На втором этапе приложение с `Luxon` было встроено в шаблон на `Bootstrap 5`.

В работе были выполнены следующие шаги:

- подготовлена Bootstrap-разметка страницы с колонками в соотношении `2-8-2`;
- в центральной колонке размещена большая красная кнопка `Показать время`;
- реализовано модальное окно Bootstrap;
- в заголовке модального окна выведена строка `Выполнил: Рыбаков Ярослав`;
- в теле модального окна через `Luxon` выводится текущая дата и время в формате `dd.MM.yyyy HH:mm:ss`;
- добавлены два способа закрытия окна: крестик в заголовке и кнопка `Закрыть` внизу справа;
- подготовлен итоговый экран для скриншота с HTML-кодом и открытым модальным окном.

## Структура проекта

Основные файлы второго этапа:

- `labs/webpack2025/index.html`

## Подключение библиотек

Для выполнения второго этапа были подключены `Bootstrap 5` и `Luxon`.

Скриншот подключения и установки библиотек:

![Подключение Bootstrap 5 и Luxon для второго этапа](https://pistaha.github.io/my-portfolio/portfolio/webpack2025-report/images/npm-install-bootstrap-luxon.png)

## Подключение `Luxon`

Библиотека `Luxon` используется для получения текущей даты и времени. В коде страницы она подключается отдельно, а значение даты и времени формируется в формате:

```js
luxon.DateTime.local().setLocale("ru").toFormat("dd.LL.yyyy HH:mm:ss");
```

Пример результата:

```text
25.10.2025 18:06:07
```

## Подключение Bootstrap 5

Для оформления страницы использованы классы `Bootstrap 5`, а для всплывающего окна задействован стандартный компонент `Modal`.

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

После нажатия на кнопку открывается всплывающее окно Bootstrap.

В заголовке указано имя исполнителя:

```text
Выполнил: Рыбаков Ярослав
```

В теле модального окна крупным шрифтом выводится текущее время, полученное через `Luxon`.

Окно можно закрыть двумя способами:

- крестиком в правом верхнем углу;
- кнопкой `Закрыть` в правом нижнем углу.

## Проверка результата

После подготовки страницы была выполнена проверка результата в браузере.

Скриншот запуска и проверки страницы:

![Проверка страницы второго этапа](https://pistaha.github.io/my-portfolio/portfolio/webpack2025-report/images/npm-run-dev.png)

## Итоговый скриншот

Скриншот страницы:

![Страница второго этапа с открытым модальным окном](https://pistaha.github.io/my-portfolio/portfolio/webpack2025-report/images/bootstrap-luxon-modal.png)

## Последовательность выполненных действий

Последовательность работы над вторым этапом была следующей:

1. Создание HTML-страницы с Bootstrap-разметкой.
2. Размещение трёх колонок по схеме `2-8-2`.
3. Добавление большой красной кнопки `Показать время` в центральную колонку.
4. Подключение `Luxon` для вывода текущей даты и времени.
5. Подключение `Bootstrap 5` для сетки, кнопки и модального окна.
6. Реализация всплывающего окна с ФИО исполнителя.
7. Настройка закрытия окна крестиком и кнопкой `Закрыть`.
8. Проверка итогового интерфейса в браузере.
9. Подготовка скриншота с HTML-кодом и внешним видом приложения.

## Вывод

Таким образом, была выполнена базовая сборка JavaScript-приложения через Webpack, проверен вывод времени с помощью библиотеки Luxon, добавлено оформление Bootstrap 5 через CDN, подготовлен альтернативный вариант сборки через Vite, а также выполнен запуск приложения в Docker-контейнере на базе alpine-образа. На втором этапе приложение было встроено в Bootstrap-шаблон с сеткой 2-8-2, большой красной кнопкой и модальным окном.

---

## Этап 3

## Тема

Сборка Bootstrap-приложения с `Luxon` через `Vite` без использования стороннего CDN.

## Что было сделано

На третьем этапе был создан отдельный проект `labs/stage3-vite-bootstrap`, в котором вся страница собирается локально через `Vite`.

В работе были выполнены следующие шаги:

- создана новая папка проекта `labs/stage3-vite-bootstrap`;
- настроен `Vite` для локальной разработки и production-сборки;
- установлены зависимости `bootstrap`, `luxon`, `vite` и `sass`;
- перенесён интерфейс второго этапа с колонками `2-8-2`, большой красной кнопкой и модальным окном;
- подключен `Luxon` через npm и встроен вывод текущей даты и времени;
- для уменьшения размера бандла подключены только нужные SCSS-модули Bootstrap и только JS-модуль `Modal`;
- выполнена production-сборка и зафиксирован размер итогового бандла;
- собранная страница опубликована внутри статического сайта.

## Структура проекта

Основные файлы третьего этапа:

- `labs/stage3-vite-bootstrap/package.json`
- `labs/stage3-vite-bootstrap/vite.config.js`
- `labs/stage3-vite-bootstrap/index.html`
- `labs/stage3-vite-bootstrap/src/main.js`
- `labs/stage3-vite-bootstrap/src/style.scss`

## Команды проекта

Основные команды для запуска и сборки:

```bash
npm install
npm run dev
npm run build
```

Скрипты в `package.json`:

```json
"scripts": {
  "dev": "vite --host 0.0.0.0 --port 3002 --open /",
  "build": "vite build",
  "preview": "vite preview --host 0.0.0.0 --port 4173"
}
```

## Подключение `Luxon`

В `src/main.js` используется импорт библиотеки:

```js
import { DateTime } from "luxon";
```

Текущее время формируется так:

```js
DateTime.local().setLocale("ru").toFormat("dd.MM.yyyy HH:mm:ss");
```

## Подключение Bootstrap 5

Bootstrap в третьем этапе подключается не через CDN, а как зависимость проекта. Для уменьшения размера бандла в `src/style.scss` импортированы только нужные части Bootstrap:

- сетка;
- контейнеры;
- кнопки;
- модальное окно;
- утилиты и базовые стили.

В JavaScript подключён только модуль:

```js
import Modal from "bootstrap/js/dist/modal";
```

## Размер полученного бандла

Результат команды `npm run build`:

```text
dist/index.html                   2.02 kB │ gzip:  0.79 kB
dist/assets/index-WBhvOPX7.css  116.67 kB │ gzip: 16.86 kB
dist/assets/index-C0IWZC7y.js    93.95 kB │ gzip: 29.40 kB
```

Итоговый production-бандл состоит из CSS-файла размером `116.67 kB` и JavaScript-файла размером `93.95 kB`. В gzip-сжатии это `16.86 kB` для CSS и `29.40 kB` для JavaScript.

## Скриншот интерфейса

Скриншот UI-страницы:

![Скриншот интерфейса третьего этапа](https://pistaha.github.io/my-portfolio/portfolio/webpack2025-report/images/bootstrap-luxon-modal.png)

## Ссылка на репозиторий

Исходные файлы проекта размещены в репозитории:

```text
https://github.com/pistaha/my-portfolio
```

## Ссылка на опубликованную страницу

Собранное приложение опубликовано на статическом сайте:

```text
https://pistaha.github.io/my-portfolio/stage3-vite-bootstrap/
```

## Последовательность выполненных действий

1. Создание новой папки проекта для третьего этапа.
2. Настройка `Vite` и `package.json`.
3. Установка зависимостей `bootstrap`, `luxon`, `vite` и `sass`.
4. Перенос интерфейса второго этапа в новый Vite-проект.
5. Подключение `Luxon` через npm для обновления времени.
6. Подключение Bootstrap 5 без CDN, с выборочным импортом модулей.
7. Сборка проекта через `npm run build`.
8. Фиксация размера полученного бандла.
9. Публикация собранной страницы на статическом сайте.

## Вывод

На третьем этапе Bootstrap-приложение с `Luxon` было полностью переведено на сборку через `Vite`. Bootstrap больше не подключается через сторонний CDN: интерфейс собирается локально из зависимостей проекта. Для уменьшения размера бандла были импортированы только необходимые части Bootstrap, после чего собранная страница была опубликована как отдельное статическое приложение.
