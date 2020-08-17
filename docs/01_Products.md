---
title: Products
description: ''
position: 1
category: Products
---

This section of the documentation goes through the core [products](#list-products) resource and [categories](#categories) which can be associated with products. Anytime we indicate **product catalog**, we are referring to entities that you would work with when developing your product listing or product details pages.\
\
[Products](/docs/api/?shell#products) in **Chec** are one of the core resources with all the data properties to out your frontend. A product is something you sell eg. physical items, services or digital goods and downloads. Requests to the products endpoint will return the full product data object with properties such as the name, description, price, variants of the product and more. With this verbose returned data, you are able to build a truly unique front-facing layer for your customers and users.

---

## List products

One of the first things you will want to do when using Commerce.js is list your products in order to make a product catalog page. The `list()` method uses `GET v1/products` to return a list of product details for the current merchant. You may filter this by the optional query parameters listed in the [API](/docs/api/?shell#list-all-products).\
\
Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.products.list().then((product) => console.log(product));
```

Example request using cURL:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/products?limit=25" \
    -H "X-Authorization: {key}"
```

| Method | Description |
| -------------------- | ----------- |
| `list(params)`       | List products |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for listing products <a href="/docs/api/?shell#products">here</a>.</p>
</div>

Once you've got your product data you can populate your product listing view. The response here will include everything you need to build this view, such as metadata, assets, variants and options, conditionals, and prices.

---

## Retrieve product

The `retrieve()` method uses `GET v1/products/{product_id}` to retrieve a specific product from the merchant account.\
\
Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.products.retrieve('prod_7RqEv5xKOoZz4j').then((product) => console.log(product.name));
```

Example request using cURL:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/products/prod_7RqEv5xKOoZz4j" \
    -H "X-Authorization: {key}"
```

| Method | Description |
| -------------------- | ----------- |
| `retrieve(id, data = {})`  | Get a specific product |

---

# Categories

The categories resource helps to organize products into groups using the `GET v1/categories` API endpoint. Categories can be associated to products and also accessed from the products object.

## List categories

The `list()` method uses `GET v1/categories` to return a list of all the merchant's product categories.\
\
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

<div class="highlight highlight--note">
<span>Note</span>
  <p>Refer to the full response for listing categories <a href="/docs/api/?shell#categories">here</a>.</p>
</div>

---

## Retrieve category

The `retrieve()` method at the `GET v1/categories` API endpoint gets a specific category by permalink or ID.\
\
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

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for retrieving a category <a href="/docs/api/?shell#retrieve-category">here</a>.</p>
</div>

### Products and Categories SDK reference

Refer to the full list of all the available products and categories methods [here](/docs/sdk/full-sdk-reference#products).

---


