---
title: Concepts
description: 'Concepts in Commerce.js.'
category: Concepts
position: 7
---

**Commerce.js** is a JavaScript SDK built on top of the **Chec Platform** to allow for easy interfacing with the **Chec
API**. The Commerce.js SDK provides all the features you need to build a custom commerce experience that works on
any modern frontend systems such as web, mobile, or any IoT devices. The SDK comes packed with helper functions that are essential to manage complexity in the commerce
logic of an application. You will find some Commerce.js concepts outlined below such as what checkout tokens are or what
access public or secret keys provide you.

## Authentication

When you [create a Chec account](https://dashboard.chec.io/signup), two sets of API authentication keys are generated, a
**public key** and a **secret key**. The public key is used with Commerce.js to access all core resource endpoints. You
can manage your API keys from your dashboard under the developer section.

<div class="highlight highlight--note">
    <span>Note</span>
    <p>To obtain your API keys, navigate to the developer section from your Chec Dashboard (<a href="https://dashboard.chec.io/settings/developer">Settings > Developer</a>).</p>
</div>

While using Commerce.js, the Chec API is limited to [public key scoped](#public-keys) requests. We developed Commerce.js
to work alongside future server-side SDKs. Commerce.js utilizes your public API key which is required to retrieve
non-sensitive data such from [products](/docs/sdk/products), [cart](/docs/sdk/cart), and [checkout](/docs/sdk/checkout)
endpoints. It can also be used to capture orders although you will be unable to access the order resource for security
reasons.

<div class="highlight highlight--warn">
    <span>Important</span>
    <p>All API requests must be made over HTTPS, calls made over plain HTTP will fail. For more information, refer to our <a href="https://commercejs.com/docs/api/#authentication">authentication methods</a> in our API source.</p>
</div>

---

## Scope

Scope defines the varying levels of access a client has to a set of Chec API resources or operations performed on the
resources. Scope provides a way to constrain and consider the granular access a client might need. We define our scope
using public and secret keys.

### Public keys

To be used with Commerce.js's JavaScript SDK & any client-side code. Public APIs are limited by scope for this reason.
Authenticating with the public key, you will have read and write access to the below resources.

| Read | Write |
| -------------------- | ----------- |
| Products       | Carts  |
| Carts               | Checkout   |
| Checkout            | Checkout helpers  |
| Checkout helpers |  |
| Spaces |  |
| Settings |  |
| Categories |  |
| Fulfillment |  |

#### Client side

The public key is to be used with requests that don't require any sensitive actions or data to be retrieved. The
Commerce.js SDK includes all client side endpoints, so you can use them quickly and easily in your client-facing
projects. An example would be to list your products from the `product` endpoint.

### Secret keys

To be used with server side code. These API keys have the power to access sensitive data such as receipts and order
data. Authenticating with the secret key will give you read and write access to the below resources.

| Read & write |
| -------------|
| Products |
| Carts |
| Checkout
| Checkout helpers |
| Spaces |
| Settings |
| Categories |
| Fulfillment |

#### Server side

The secret key can be used with requests that require sensitive actions or data to be retrieved as well as all client
side requests. You'll use your secret key for these requests. The Commerce.js SDK does not include any of these
endpoints for security reasons, so you'll need to write custom backend logic for handling these. An example of a
sensitive request would be to make a call to [refund an order](/docs/api/?shell#refund-an-order).

<div class="highlight highlight--warn">
    <span>Important</span>
    <p>The Commerce.js SDK does not include any of these endpoints for security reasons, so you'll need to write custom backend logic for handling these.</p>
</div>

When you register for a Chec account, you'll be assigned two sets of these keys: live and sandbox. We highly recommend
using your sandbox key until you're ready to deploy your new project live. Orders created with sandbox keys can easily
be cleared from the Chec Dashboard, and will automatically use the "Test Gateway" for payment processing.

---

## Checkout tokens

Checkout tokens need to be generated before you are able to **capture an order**. A [checkout
token](/docs/api/?javascript--cjs#generate-token) contains everything you would need to implement a checkout process and
a unique purchasing experience for your users. For example, the returned object will contain properties such as shipping
options, discount codes available, or other fields that are needed to be collected.

To generate a checkout token, all you need to provide is the permalink or ID of the product, or the cart ID you'd like
to generate a checkout for. See [here](/docs/api/#generate-token) for the required parameters.

---

## Checkout helpers

Commerce.js [checkout helper functions](/docs/api/?shell#checkout-helpers) are provided to help create custom checkout
flows and handle all common commerce logic that would otherwise be complex. Below are some examples of various
checkpoints during the checkout process:

* Check if a requested variant, quantity, or shipping option is available
* Check if an entered *"Pay What You Want"* amount or discount code is valid
* Retrieve running totals for a checkout (i.e. subtotals, shipping totals, and grand totals) - [the live
  object](#the-live-object)
* Generate client side validation rules
* Get a full list of states/provinces for a country to populate a select field
* Get the buyer's location from an IP address
* Set a new tax zone for the checkout when the customer changes their shipping address

All helper endpoints on the [Checkout](/docs/api/?shell#checkout) resource update the live object. E.g. If you select a
variant that is available, or a quantity that is available, the live object will be adjusted to reflect this. Most
responses contain a [live object](#the-live-object) which gives you the live running totals and other information
relevant to the current checkout session so you can update displayed totals (and more) straight away.

<div class="highlight highlight--warn">
    <span>Important</span>
    <p>Helper functions are not required. All totals are recalculated during capture using the checkout data sent.</p>
</div>

---

## The live object

The [live object](/docs/api/?shell#get-the-live-object) is a living object which adjusts to show the live tax rates,
prices, and totals for a checkout token. Every time a checkout helper endpoint is called, this object will be updated.
The returned data can be used to display information back to the customer on the checkout. All checkout helpers that
affect price (e.g. check quantity, check variant, check discount, etc) will return the live object in its payload.

We create the live object to help you (and us!) display up-to-date totals, tax prices, and other dynamic variables which
change during the checkout process and need to displayed back to the customer. You should use the data in the live
object to update the displayed totals on your checkout pages when the customer selects a new variant, enters a discount,
or selects a different shipping option.

At Chec we do this on our own checkouts by feeding the live object returned from each helper function into a JavaScript
function which then associates the data with the correct element.

---

## Tax support

Tax support with Chec/Commerce.js is automatic. We calculate the tax based on the shipping address submitted. If you're
not submitting an address for the customer, you can supply the tax region with these arguments:

| Parameter | Status | Description |
| -------------------- | ----------- | ----------- |
| `tax[ip_address]`  | required | If only using an IP address to set the tax location. Chec will set the tax location to the estimated location of this IP address. |
| `tax[country]`  | required | If *not* using an IP address to set the tax location. If provided, this must be a valid ISO 3166-1 alpha-2 country code (e.g. `GB` for the United Kingdom). |
| `tax[region]`  | required | If in Canada or the USA. Must be a valid shortcode for the region, e.g. `CA` for California, or `QB` for Quebec. |
| `tax[postal_zip_code]`  | required | If "Auto US Sales Tax" is enabled for your account. |

### EU VAT MOSS

If you have EU VAT MOSS enabled for your account, you can use the helper function "Get buyer's location from IP" (see
the full API reference), and use this value to set `tax[ip_address]`.

<div class="highlight highlight--warn">
    <span>Important</span>
    <p>If you're working with PayPal, you should send both <code>tax[ip_address]</code> and <code>tax[country]</code> (by asking the customer to select their tax country from a dropdown). You can also set tax information for your checkout before you capture it using the <code>setTaxZone()</code>.</p>
</div>

---

## Multiple price formats

Every price attribute (subtotals, pay what you want minimums, tax totals, etc) returned from Chec will be an array with
four formats:

- `raw` - No formatting *e.g. 49 or 1234.56*
- `formatted` - Formatted with no currency symbol or code *e.g. 49.00 or 1,234.56*
- `formatted_with_symbol` - Formatted with its symbol only *e.g. $49.00 or£1,234.56*
- `formatted_with_code` -  Formatted with its currency code only *e.g. 49.00 USD or 1,234.56 GBP*

Example of a `price` endpoint response:

```json
{
  "price": {
    "raw": 49,
    "formatted": "49.00",
    "formatted_with_symbol": "$49.00",
    "formatted_with_code": "49.00 USD"
  }
}
```

---

## Verb conditionals

We return all conditionals in the `conditionals` array in most objects. We also return conditionals with their verb as
the array key name e.g. `is.cart_free` or `has.physical_delivery` or `collects.shipping_address`.

Example of a `conditionals` array:

```json
{
  "conditionals": {
    "collects_fullname": true,
    "collects_shipping_address": false,
    "collects_billing_address": false,
    "has_physical_delivery": false,
    "has_digital_delivery": true,
    "has_available_discounts": false,
    "has_pay_what_you_want": false,
    "collects_extrafields": true,
    "is_cart_free": false
  },
  "collects": {
    "fullname": true,
    "shipping_address": false,
    "billing_address": false,
    "extrafields": true
  },
  "has": {
    "physical_delivery": false,
    "digital_delivery": true,
    "available_discounts": false,
    "pay_what_you_want": false
  },
  "is": {
    "cart_free": false
  }
}
```

We created this `conditionals` property to hopefully provide more legibility and maintainability of your code. By
nesting variables under their *"verb key"* your code reads better. E.g. `checkout.conditionals.is_cart_free` vs
`checkout.is.cart_free`. This is particularly nicer to work with for developers who are primarily working with
JavaScript.

---
