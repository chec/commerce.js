---
title: "Products"
---

# Example: List your products
---------------------------

One of the first things you will want to do when using Commerce.js, whether in a new or an existing project, is to list your products in order to make a catalog page.

You can use the Commerce.js SDK to this. Here's an example that will log your product names to the console:
```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('your_public_key');

commerce.products.list().then((result) => {
  console.log(result.data.map(product => product.name));
});
```
As with all calls using the Commerce.js SDK, the responses are returned asynchronously in a Promise. See ["Getting started"](/docs/overview/getting-started) for more information.

Once you've got your product data you can populate your product catalog templates with product data. The response here will include everything you need to build this view, such as metadata, assets, variants and options, conditionals, and prices.
