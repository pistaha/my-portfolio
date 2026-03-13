# Портфолио Pistaha (Hugo + Blowfish)

Аккуратное студенческое портфолио на Hugo с темой Blowfish. Сайт рассчитан на публикацию в GitHub Pages по адресу:

https://pistaha.github.io/my-portfolio/

## Технологии
- Hugo (extended)
- Blowfish theme (git submodule)
- Markdown-контент

## Локальная разработка
```bash
hugo server -s Projects/client-lab2
```

## Сборка
```bash
hugo -s Projects/client-lab2
```

Готовый статический сайт собирается в `Projects/client-lab2/public/`.

## Деплой
Репозиторий настроен под GitHub Pages. `baseURL` задан как:

```
https://pistaha.github.io/my-portfolio/
```

При деплое исходники из `Projects/client-lab2` собираются в корень `gh-pages`, чтобы GitHub Pages раздавал сайт напрямую.

## Структура проекта
- `Projects/client-lab2/config/_default/` — конфигурация Hugo и Blowfish
- `Projects/client-lab2/content/` — страницы и записи портфолио
- `Projects/client-lab2/themes/blowfish/` — сабмодуль темы Blowfish
- `Projects/client-lab2/static/` — статические ассеты (пустой placeholder)

## Редактирование контента
- Главная: `Projects/client-lab2/content/_index.md`
- Обо мне: `Projects/client-lab2/content/about/index.md`
- Список проектов: `Projects/client-lab2/content/portfolio/_index.md`
- Проекты: `Projects/client-lab2/content/portfolio/*.md`
- Контакты: `Projects/client-lab2/content/contact/index.md`

## Примечания по Blowfish
Дефолтные настройки темы скопированы в `Projects/client-lab2/config/_default/`, поэтому конфигурацию можно менять без правок сабмодуля. Типографику, цвета и макеты настраивайте в `Projects/client-lab2/config/_default/params.toml`.

## Контактный/CRM-блок
Страница контактов безопасна для статики. При необходимости замените блок на embed от Formspree, Basin или CRM.
