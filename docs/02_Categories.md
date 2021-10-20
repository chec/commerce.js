---
title: Categories
description: 'The Categories endpoint in Commerce.js.'
category: Categories
position: 2
---

This section of the documentation goes through the [categories](#list-categories) resource which can be associated with
products. The categories resource helps to organize products into groups. By creating categories and associating them to
your products, you can pass optional parameters to filter the products by the `category_slug` or `category_id` in the
products endpoint. Category data can also be accessed from the product object.

---

## List categories

The `list()` method uses `GET v1/categories` to return a list of all the merchant's product categories.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.categories.list().then((category) => console.log(category.name));
```

Example request using cURL:

```bash
$ curl -X GET \
    -G "https://api.chec.io/v1/categories" \
    -H "X-Authorization: {key}"
```

| Method | Description |
| -------------------- | ----------- |
| `list(params)`       | List all categories, either by filtered params or unfiltered |

<div class="highlight highlight--info">
<span>Info</span>
  <p>For more information, refer to <a href="/docs/api/?shell#categories">the full response for listing categories</a>.</p>
</div>

---

## Retrieve category

![Categories diagram](https://cdn.chec.io/chec-assets/Category%20diagram.png)

The `retrieve()` method uses the `GET /v1/categories/{id}` API endpoint to get a specific category by permalink or ID.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

// By passing category as param
commerce.categories.retrieve('cat_7RqEv5xKOoZz4j').then((category) => console.log(category.name));

// By passing slug/permalink as param
commerce.categories.retrieve('category', { type: 'slug' })
  .then((category) => console.log(category.name));
```

Example request using cURL:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/categories/cat_7RqEv5xKOoZz4j?type=slug" \
    -H "X-Authorization: {key}"
```

| Method | Description |
| -------------------- | ----------- |
| `retrieve(id, data = {})`  |  Get a specific category by its ID. You may also provide `{ type: 'slug'}` as data and use a category slug instead of an ID.  |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#retrieve-category">the full response for retrieving a category</a>.</p>
</div>

---
