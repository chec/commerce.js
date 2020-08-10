---
title: Cart
description: ''
position: 2
category: Cart
---

The **Cart** resource can hold product data, product variants, quantity, price, and other meta data to be used to [generate a checkout token](/docs/sdk/checkout#generate-token) and [capture an order](/docs/sdk/checkout#capture-order). This feature comes equipped with multiple intuitive endpoints to help develop a seamless shopping cart experience.

---

## Retrieve cart

In order to start adding products to your cart, you'll need to first create a cart. When you first call the method `retrieve()` using `GET v1/carts`, it will automatically create a cart for you if a cart does not exist yet or a current cart will be retrieved if the `cart_id` is passed in as an argument. Commerce.js tracks the current cart ID using a cookie.\
\
**Example request using Commerce.js**:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.retrieve().then((cart) => console.log(cart));
```

**Example request using cURL**:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/carts" \
    -H "X-Authorization: {key}"
```

| Method | Description |
| -------------------- | ----------- |
| `retrieve()` | Get the cart object, including contents |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response and response of the cart object <a href="/docs/api/?shell#carts">here</a>.</p>
</div>

<div class="highlight highlight--warn">
    <span>Important</span>
    <p>Cart has a lifetime 30 days once they've been created. After that time they will automatically be cleared.</p>
</div>

---

## Refresh cart

The `refresh()` method uses `GET v1/carts` to create a new cart and update the stored cart ID in Commerce.js.

##### Example request using Commerce.js

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.refresh().then((cart) => console.log(cart));
```

| Method | Description |
| -------------------- | ----------- |
| `refresh()`  | Request a new cart ID |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response and response of the cart object <a href="/docs/api/?shell#carts">here</a>.</p>
</div>

---

## Add to cart

The `add()` method uses `POST v1/carts/{cart_id}` to add a product to cart. You will need the ID of the product you want to add e.g. `prod_05389st98t49h`.\
\
**Example request using Commerce.js**:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.add('prod_R4OANwRqklvYL8', 5).then((response) => console.log(response));
```

**Example request using cURL**:

```bash
curl -X POST \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP" \
    -H "X-Authorization: {key}" \
    -H "Content-Type: application/json" \
    -d '{"id":"prod_R4OANwRqklvYL8","quantity":5}'
```

| Method | Description |
| -------------------- | ----------- |
| `add(data)`  | Add an item to the cart |

<div class="highlight highlight--info">
    <span>Tip</span>
    <p>When you add a product to cart, the response you get back contains the updated cart object, and each product in the cart has been assigned a "line item ID".</p>
</div>

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for adding item to cart <a href="/docs/api/?shell#add-item-to-cart">here</a>.</p>
</div>

---

## Update cart

The `.update()` method uses `PUT v1/carts/{cart_id}/items/{line_item_id}` to update the quantity or variant for the line item ID in the cart.\
\
**Example request using Commerce.js**:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.update('item_7RyWOwmK5nEa2V', { quantity: 5 }).then(response => console.log(response));
```

**Example request using cURL**:

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

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for update the cart <a href="/docs/api/?shell#update-item-in-cart">here</a>.</p>
</div>

---

## Get cart contents

The `contents()` method uses `GET v1/carts/{cart_id}/items` to return the contents and items of the cart.\
\
**Example request using Commerce.js**:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.contents().then((items) => console.log(items));
```

**Example request using cURL**:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP/items" \
    -H "X-Authorization: {key}" \
```

| Method | Description |
| -------------------- | ----------- |
| `contents()` | Get the contents of the cart |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for getting the cart contents <a href="/docs/api/?shell#get-cart-contents">here</a>.</p>
</div>

---

## Remove from cart

The `.remove()` method uses `DELETE v1/carts/{cart_id}/items/{line_item_id}` to remove a specific line item from the cart.\
\
**Example request using Commerce.js**:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.remove('item_7RyWOwmK5nEa2V').then((response) => console.log(response));
```

**Example request using cURL**:

```bash
curl -X DELETE \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP/items/item_7RyWOwmK5nEa2V" \
    -H "X-Authorization: {key}" \
```

| Method | Description |
| -------------------- | ----------- |
| `remove(lineItemId)` | Remove a line item from the cart |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for removing items from cart <a href="/docs/api/?shell#remove-item-from-cart">here</a>.</p>
</div>

---

## Delete cart

The `.delete()` method uses `DELETE v1/carts/{cart_id}` to delete a cart entirely.\
\
**Example request using Commerce.js**:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.delete().then((response) => console.log(response));
```

**Example request using cURL**:

```bash
curl -X DELETE \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP" \
    -H "X-Authorization: {key}"
```

| Method | Description |
| -------------------- | ----------- |
| `remove(lineItemId)` | Remove a line item from the cart |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for deleting a cart <a href="/docs/api/?shell#delete-cart">here</a>.</p>
</div>

---

## Empty cart

The `.empty()` method uses `DELETE v1/carts/{cart_id}/items` to clear the contents of the current cart. This is different from the `.refresh()` method in that it empties the current cart but not create a new cart.\
\
**Example request using Commerce.js**:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.cart.empty().then((response) => console.log(response));
```

**Example request using cURL**:

```bash
curl -X DELETE \
    "https://api.chec.io/v1/carts/cart_2Jwr9yJAeN4VlP/items" \
    -H "X-Authorization: {token}" \
```

| Method | Description |
| -------------------- | ----------- |
| `empty()` | Clear the cart contents but cart is not deleted |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for emptying a cart's contents <a href="/docs/api/?shell#empty-cart">here</a>.</p>
</div>

<div class="highlight highlight--info">
    <span>Tip</span>
    <p>Want to see an real-world implementation of cart functionalities? Check out a step-by-step guide <a href="">here</a>.</p>
</div>

### Cart features

Refer to the full list of cart features [here](/docs/sdk/commerce/#cart-cart).

---
