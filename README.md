# Pistaha Portfolio

<p align="center">
  <strong>Статическое портфолио на Hugo + Blowfish</strong><br>
  спокойная визуальная подача, русскоязычный контент, публикация через GitHub Pages
</p>

<p align="center">
  <a href="https://github.com/pistaha/my-portfolio">Repo</a> •
  <a href="https://pistaha.github.io/my-portfolio/">Live</a>
</p>

## Что это

`my-portfolio` — личный сайт-портфолио с работами по дизайну, текстам, Python, C# и статическим сайтам.  
В этом репозитории:

- в корне лежит уже собранная GitHub Pages-версия сайта;
- исходники Hugo находятся в `Projects/client-lab2/`;
- контент оформлен как набор Markdown-страниц и карточек проектов.

## Стек

- Hugo
- тема Blowfish
- Markdown-контент
- GitHub Pages

## Локальный запуск

Из корня репозитория:

```bash
hugo server -s Projects/client-lab2
```

## Сборка

```bash
hugo -s Projects/client-lab2
```

После сборки статический сайт можно публиковать в ветку/директорию, которую использует GitHub Pages.

## GitHub Pages

Да, проект отлично подходит для GitHub Pages.  
Именно это его основной способ публикации.

Адрес сайта:

```text
https://pistaha.github.io/my-portfolio/
```

## Docker

Docker-конфигурации в проекте нет, и она здесь не обязательна: сайт статический, поэтому проще и правильнее собирать его напрямую через Hugo.

## Где лежит контент

- `Projects/client-lab2/content/_index.md` — главная;
- `Projects/client-lab2/content/about/index.md` — страница «Обо мне»;
- `Projects/client-lab2/content/contact/index.md` — контакты;
- `Projects/client-lab2/content/portfolio/*.md` — карточки проектов;
- `Projects/client-lab2/config/_default/` — основная конфигурация.
