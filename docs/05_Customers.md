---
title: Customers
description: 'The Customers endpoints in Commerce.js.'
category: Customers
position: 5
---

This section of the documentation goes through the core [Customers](/docs/sdk/customers#send-login-token) endpoint. This
endpoint allows you to handle customer authentication as well as manage and update customers' information such as
contact name, email address and metadata.

A customer in **Chec** is anyone who makes a purchase and has the ability to create an account. Requests to the
customers endpoint will return the full customers object with data to create a customer's authorized view containing
information such as their contact name and list of orders.

---


## Send login token

This endpoint helps to authenticate and resolve a customer in the merchant account by accepting an email address as an
argument and sending a one-click login email. The email contains a short-lived magic link for the user to access a
protected route only permitted with the token. The `login()` method uses `POST v1/customers/email-token` to log a
customer in to an authorized route to access the customers resource. The [method
below](/docs/sdk/customers#get-access-token) will exchange the token for a JSON web token (JWT) which is scoped to that
particular customer granting access to that customer's orders, addresses, etc.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.customers.login('leslie.lawless@example.com', 'https://yourwebsite.com/login/callback').then((token) => console.log(token));
```

Example request using cURL:

```bash
curl -X POST \
    "https://api.chec.io/v1/customers/email-token" \
    -H "Content-Type: application/json" \
    -d '{"email":"leslie.lawless@example.com","base_url":"https://yourwebsite.com/login/callback"}'
```

| Method | Description |
| -------------------- | ----------- |
| `login(email, baseUrl)`       | Issue and send login token |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#issue-and-send-login-token">the full response for issuing and sending a login token</a>.</p>
</div>

When this endpoint is called in a login flow, the subsequent method below to call would exchange the token for a JSON
web token to log the customer in to a protected route.

---

## Get access token

Once a customer has entered their email address in the previous step and clicked on the one-time login link they
received in their email, the link will send them back to your server (see https://yourwebsite.com/login/callback in the
example above). In that callback handler, you can use the "get access token" method to exchange the token in the URL for
a JSON web token.

The `getToken()` method uses `POST /v1/customers/exchange-token` to obtain a JSON web token scoped to the customer the
provided token (returned from the `login()` method) belongs to. The returned JWT will be valid for 24 hours, and may be
used to authorize API calls to the [Customers](/docs/api/?shell#customers) API endpoints, such as [get
orders](/docs/sdk/customers#list-orders-for-a-customer), etc.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.customers.getToken('1ae420a5-2f43-426f-8a61-516eabb56d33').then((jwt) => console.log(jwt));
```

Example request using cURL:

```bash
curl -X POST \
    "https://api.chec.io/v1/customers/exchange-token" \
    -H "X-Authorization: {token}" \
    -H "Content-Type: application/json" \
    -d '{"token":"1ae420a5-2f43-426f-8a61-516eabb56d33"}'
```

| Method | Description |
| -------------------- | ----------- |
| `getToken(token, save = true)`  | Get access token |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>If you do not want to save the customer in local session storage, pass false for the second argument <code>save</code>.</p>
</div>

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#exchange-login-token-for-jwt">the full response for getting an access token</a>.</p>
</div>

---

## Update customer

The `update()` method uses `PUT /v1/customers/{customer_id}` to update an existing customer. All customer's data in this
method are optional. Email addresses must be unique for your merchant's list of customers.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.customers.update({
  email: 'leslie.lawless@example.com',
  firstname: 'Leslie',
  lastname: 'Lawless',
  external_id: 'MY_CRM_USER_123',
}, 'cstmr_K1YDR2qy29Qem6')
  .then((customer) => console.log(customer));
```

Example request using cURL:

```bash
curl -X PUT \
    "https://api.chec.io/v1/customers/cstmr_K1YDR2qy29Qem6" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"email":"leslie.lawless@example.com","firstname":"Leslie","lastname":"Lawless","external_id":"MY_CRM_USER_123"}'
```

| Method | Description |
| -------------------- | ----------- |
| `update(data = {}, customerId = null, token = null)`  | Update customer |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>The <code>customerId</code> is optional - the customer's ID e.g. cstmr_ABC123, or <code>null</code> to use session. The <code>token</code> is also optional - access token for the customer, or <code>null</code> to use session.</p>
</div>

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#update-customer">the full response for updating a customer</a>.</p>
</div>

---

## List orders for a customer

The `getOrders()` method uses `GET /v1/customers/{customer_id}/orders` to return a list of orders that belong to the
provided customer ID. The response from this API is the same as [List orders](/docs/api/?shell#list-orders).

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.customers.getOrders('cstmr_K1YDR2qy29Qem6').then((orders) => console.log(orders));
```

Example request using cURL:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/customers/cstmr_f89398fs489g/orders" \
    -H "Authorization: Bearer {token}"
```

| Method | Description |
| -------------------- | ----------- |
| `getOrders(customerId = null, token = null, params = {})`  | List orders for a customer |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>The <code>customerId</code> is optional - the customer's ID e.g. cstmr_ABC123, or <code>null</code> to use session. The <code>token</code> is also optional - access token for the customer, or <code>null</code> to use session</p>. The <code>params</code> object is also optional.
</div>

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#list-orders-for-customer">the full response for listing orders for a customer</a>.</p>
</div>

---

## Get order for customer

The `getOrder()` method uses `GET /v1/customers/{customer_id}/orders/{order_id}` and returns a single order by its ID
which belongs to the customer ID provided. The response from this API is the same as [Retrieve
order](/docs/api/?shell#retrieve-order).

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.customers.getOrder('ord_Kvg9l6zvnl1bB7').then((order) => console.log(order));
```

Example request using cURL:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/customers/cstmr_f89398fs489g/orders/ord_Kvg9l6zvnl1bB7" \
    -H "Authorization: Bearer {token}"
```

| Method | Description |
| -------------------- | ----------- |
| `getOrder(orderId, customerId = null, token = null)`  | Get order for customer |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>The <code>customerId</code> is optional - the customer's ID e.g. cstmr_ABC123, or <code>null</code> to use session. The <code>token</code> is also optional - access token for the customer, or <code>null</code> to use session.</p>
</div>

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#get-order-for-customer">the full response for retrieving an order for a customer</a>.</p>
</div>

---

## Get customer

The `about()` method uses `GET /v1/customers/{customer_id}` to return information about the currently authorized
customer by its ID.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.customers.about().then((customer) => console.log(customer));
```

Example request using cURL:

```bash
curl -X GET \
    -G "https://api.chec.io/v1/customers/cstmr_K1YDR2qy29Qem6" \
    -H "Authorization: Bearer {token}"
```

| Method | Description |
| -------------------- | ----------- |
| `about()`  | Gets information about the currently authorized customer |

<div class="highlight highlight--info">
    <span>Info</span>
    <p>For more information, refer to <a href="/docs/api/?shell#get-customer">the full response for retrieving a customer by its ID</a>.</p>
</div>

---

## Get customer ID

The `id()` method returns the customer ID used during a successful login from local storage.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

console.log(commerce.customers.id());
```

| Method | Description |
| -------------------- | ----------- |
| `id()`  | Gets the customer ID used during a successful login |

---

## Get customer token

The `token()` method returns the customer's JSON web token from local storage, if logged in.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

console.log(commerce.customers.token());
```

| Method | Description |
| -------------------- | ----------- |
| `token()`  | Gets the customer's JSON web token, if logged in |

---

## Check if customer is logged in

The `isLoggedIn()` method checks if a customer is logged in the current session and returns either `true` or `false`.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

console.log(commerce.customers.isLoggedIn());
```

| Method | Description |
| -------------------- | ----------- |
| `isLoggedIn()`  | Checks whether a customer is logged in in the current session |

---

## Logout customer

The `logout()` method logs the customer out by clearing the customer state from the current session.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.customers.logout();
```

| Method | Description |
| -------------------- | ----------- |
| `logout()`  | Logs out current customer in session |

---
