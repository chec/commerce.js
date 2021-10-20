---
title: Cart
description: 'The Cart endpoint in Commerce.js.'
category: Cart
position: 3
---

The **Cart** resource can hold product data, product variants, quantity, price, and other metadata to be used to
[generate a checkout token](/docs/sdk/checkout#generate-token) and [capture an order](/docs/sdk/checkout#capture-order).
This feature comes equipped with multiple intuitive endpoints to help develop a seamless shopping cart experience.

---

## Retrieve cart

![Cart diagram](https://cdn.chec.io/chec-assets/Cart%20diagram.png)

In order to start adding products to your cart, you'll need to first create a cart. When you first call the method
`retrieve()` using `GET v1/carts`, it will automatically create a cart for you if a cart does not exist yet or a current
cart will be retrieved if the `cart_id` is passed in as an argument. Commerce.js tracks the current cart ID using a
cookie.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.retrieve().then((cart) => console.log(cart));
```

Example request using cURL:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/carts" \
    -H "X-Authorization: {key}"
```

| Method | Description |
| -------------------- | ----------- |
| `retrieve()` | Get the cart object, including contents |

<div class="highlight highlight--warn">
    <span>Important</span>
    <p>Cart has a lifetime of 30 days once they've been created. After that time they will automatically be cleared.</p>
</div>

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#carts">the full response of the cart object</a>.</p>
</div>

---

## Refresh cart

The `refresh()` method uses `GET v1/carts` to create a new cart and update the stored cart ID in Commerce.js.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.refresh().then((cart) => console.log(cart));
```

| Method | Description |
| -------------------- | ----------- |
| `refresh()`  | Request a new cart ID |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#carts">the full response for requesting a new cart</a>.</p>
</div>

---

## Add to cart

The `add()` method uses `POST v1/carts/{cart_id}` to add a product to cart. You will need the ID of the product you want
to add, e.g. `prod_05389st98t49h`.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.add('prod_R4OANwRqklvYL8', 5).then((response) => console.log(response));
```

Example request using cURL:

```bash
curl -X POST \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP" \
    -H "X-Authorization: {key}" \
    -H "Content-Type: application/json" \
    -d '{"id":"prod_R4OANwRqklvYL8","quantity":5}'
```

| Method | Description |
| -------------------- | ----------- |
| `add(productId, quantity, variantData)`  | Add an item to the cart |

If you'd like to specify variant information during this call, you can do so by providing a third argument which may be
one of the following:
1. A specific variant ID (string)
2. An object which maps variant group IDs to variant option IDs

Example request adding a variant to cart using a specific variant ID:

```js
commerce.cart.add('prod_R4OANwRqklvYL8', 5, 'vrnt_KE50NKbjqKNwdg');
```

Example request adding a variant to cart by specifying variant groups and options:

```js
commerce.cart.add('prod_R4OANwRqklvYL8', 5, {
  'vgrp_NqKE50ap1ldgBL': 'optn_NqKE50y601ldgB',
  // ... any other group -> options here
});
```

<div class="highlight highlight--note">
    <span>Note</span>
    <p>The structure of the variants request arguments in these examples were changed with our 2021-03-31 release. See our <a href="/docs/release-notes/">release notes</a> for more information, including backwards compatibility suggestions.</p>
</div>

<div class="highlight highlight--note">
    <span>Note</span>
    <p>When you add a product to cart, the response you get back contains the updated cart object, and each product in the cart has been assigned a "line item ID".</p>
</div>

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#add-item-to-cart">the full response for adding an item to the cart</a>.</p>
</div>

---

## Update cart

The `update()` method uses `PUT v1/carts/{cart_id}/items/{line_item_id}` to update the quantity or variant for the line
item ID in the cart.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.update('item_7RyWOwmK5nEa2V', { quantity: 5 }).then(response => console.log(response));
```

Example request using cURL:

```bash
curl -X PUT \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP/items/item_7RyWOwmK5nEa2V" \
    -H "X-Authorization: {key}" \
    -H "Content-Type: application/json" \
    -d '{"quantity": 5}'
```

| Method | Description |
| -------------------- | ----------- |
| `update(lineItemId, data)` | Update an existing item in the cart |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#update-item-in-cart">the full response for updating the cart line item</a>.</p>
</div>

---

## Get cart contents

The `contents()` method uses `GET v1/carts/{cart_id}/items` to return the contents and items of the cart.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.contents().then((items) => console.log(items));
```

Example request using cURL:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP/items" \
    -H "X-Authorization: {key}" \
```

| Method | Description |
| -------------------- | ----------- |
| `contents()` | Get the contents of the cart |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#get-cart-contents">the full response for getting the cart contents</a>.</p>
</div>

---

## Remove from cart

The `remove()` method uses `DELETE v1/carts/{cart_id}/items/{line_item_id}` to remove a specific line item from the
cart.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.remove('item_7RyWOwmK5nEa2V').then((response) => console.log(response));
```

Example request using cURL:

```bash
curl -X DELETE \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP/items/item_7RyWOwmK5nEa2V" \
    -H "X-Authorization: {key}" \
```

| Method | Description |
| -------------------- | ----------- |
| `remove(lineItemId)` | Remove a line item from the cart |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#remove-item-from-cart">the full response for removing items from the cart</a>.</p>
</div>

---

## Delete cart

The `delete()` method uses `DELETE v1/carts/{cart_id}` to delete a cart entirely.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.delete().then((response) => console.log(response));
```

Example request using cURL:

```bash
curl -X DELETE \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP" \
    -H "X-Authorization: {key}"
```

| Method | Description |
| -------------------- | ----------- |
| `delete()` | Delete the entire cart |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#delete-cart">the full response for deleting the cart</a>.</p>
</div>

---

## Empty cart

The `empty()` method uses `DELETE v1/carts/{cart_id}/items` to clear the contents of the current cart. This is different
from the `.refresh()` method in that it empties the current cart but does not create a new cart.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.empty().then((response) => console.log(response));
```

Example request using cURL:

```bash
curl -X DELETE \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP/items" \
    -H "X-Authorization: {token}" \
```

| Method | Description |
| -------------------- | ----------- |
| `empty()` | Clear the cart contents but cart is not deleted |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#empty-cart">the full response for emptying the cart's contents</a>.</p>
</div>

---

## Retrieve cart ID

The `id()` method returns the cart identifier being used in the current request, or null if there is no stored cart ID.

Example request:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.id().then((cartId) => console.log(cartId));
```
---
