---
title: Products
description: 'The Products endpoint in Commerce.js.'
category: Products
position: 1
---

This section of the documentation goes through the core [products](#list-products) resource. Anytime we indicate
**product catalog**, we are referring to entities that you would work with when developing your product listing or
product detail pages.

[Products](/docs/api/?shell#products) in **Chec** are one of the core resources with all the data properties to out your
frontend. A product is something you sell eg. physical items, services or digital goods and downloads. Requests to the
products endpoint will return the full product data object with properties such as the name, description, price,
variants of the product and more. With this verbose returned data, you are able to build a truly unique front-facing
layer for your customers and users.

---

## List products

One of the first things you will want to do when using Commerce.js is list your products in order to make a product
catalog page. The `list()` method uses `GET v1/products` to return a list of product details for the current merchant.
You may filter this by the optional query parameters listed in the [API](/docs/api/?shell#list-all-products).

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

You can filter your products list by passing these optional parameters below:

| Parameter | Description |
| -------------------- | ----------- |
| `active` | Filter products by their active status (either 1 or 0) |
| `category_slug` | Filter by an array of category slugs, where all categories apply to the product |
| `category_id` | Filter by an array of category IDs, where all categories apply to the product |
| `limit` | The maximum number of products that will be returned (default: 25, maximum: 200) |
| `query` | Filter by a term that will be matched against the product's ID (exactly), permalink, and name |


Example request listing products filtered by the category slug:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

// Fetch products specifying a category slug
commerce.products.list({
  category_slug: 'shoes',
}).then(response => response.data);

// Fetch products specifying multiple category slugs
commerce.products.list({
  category_slug: ['shoes', 'black'],
}).then(response => response.data);
```

Example request listing products filtered by a products list limit:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.products.list({
  limit: 100,
}).then((response) => console.log(response.data));
```

Example request listing products with the active parameter:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.products.list({
  active: 1,
}).then(response => response.data);
```

Example request listing products with a query parameter:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.products.list({
  query: 'bag',
}).then(response => response.data); // Returns all products that contains the string in either the product name or permalink
```

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for listing products <a href="/docs/api/?shell#products">here</a>.</p>
</div>

Once you've got your product data you can populate your product listing view. The response here will include everything
you need to build this view, such as metadata, assets, variants and options, conditionals, and prices.

---

## Retrieve product

The `retrieve()` method uses `GET v1/products/{product_id}` to retrieve a specific product from the merchant account.

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

Example request retrieving the product using the type parameter:

```js
// By passing the product permalink as param.
// `id`, `sku`, or  `permalink` are optional `type` values to pass in (default is `id`).
commerce.products.retrieve('ABC123', { type: 'permalink' })
  .then((product) => console.log(product.name));
```

---
