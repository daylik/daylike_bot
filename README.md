# daylike_bot
## telegram @daylike_bot

Команда: `/wp_plugins` - показывает список плагинов для wordpress
Можно добавить в список хороший и нужный плагин для wordpress самому.

Сначала смотрим список категорий которые есть для wordpress плагинов

Команда: `/wp_category` - Список категорий

### Добавляем новую категорию (если надо): 
`/wp_category add cat:3, name:SEO`

`/wp_category add cat:[id], name:[текст режим Markdown]`

### Добавляем запись в категорию:

`/wp_add cat:3, txt:[Yoast SEO](https://wordpress.org/plugins/wordpress-seo/)  - Хороший плагин для SEO`

`/wp_add cat:[id категории], txt:[Название плагина](url обычно на офф сайте wordpress) - Описание если надо`
(разметка Markdown)

всё тоже самое можно делать и для javascript пагинов 

Команды: 
```/js_plugins``` - Весь список

```/js_category``` - Список категорий

```/js_category add cat:[id категории], name:[текст режим Markdown]``` - добавить категорию с уникальным id

```/wp_add cat:[id категории], txt:[Название плагина](url обычно на офф сайте wordpress) - Описание если надо``` - добавить плагин в категорию (разметка Markdown)
