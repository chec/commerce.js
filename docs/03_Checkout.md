---
title: "Checkout"
---

You've created your storefront, listed your products, built your cart and enabled your "add to cart" functionality, and now you need to capture an order. For this, you'll need to create a checkout page to allow your customers to enter their personal information, shipping details, and payment information.

By default when you create an account with Chec, we'll enable the "Test Gateway" for payments. This is the gateway we'll use in these examples.

### Background

By now we assume you're reasonably familiar with creating a new Commerce instance. Just in case, here's a refresher. You'll want to put this somewhere you can re-use it eventually.
```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('your_public_key', true);
```
### Create a checkout token

We've already created a test product with the permalink `commerce-js-example`, set up some variants for it and now we're ready to use it in our test store. Let's go ahead and create a "checkout token" for it. This token represents your customer's order before it has been placed/captured.
```js
commerce.checkout.generateToken('commerce-js-example', { type: 'permalink' })
  .then(response => {
    const checkoutTokenId = response.id; // e.g. chkt_959gvxcZ6lnJ7
    // Grab your order confirmation data from `response` and show your customer something nice!
  })
  .catch(error => console.error('Uh oh, something went wrong! Did you know you can use the Chec CLI to monitor your error logs?', error);
```
As you can see in the example above, we're generating a checkout token from a particular product permalink. Chec will add the product to the cart for the checkout token you are given in the response. You may also want to use `commerce.cart.*` methods to add a product, or multiple products, to the cart before you get to the checkout stage. If this is the case, you can pass your cart ID instead of the product permalink, and use `{ type: 'cart' }` as your options:
```js
commerce.checkout.generateToken(this.state.cart.id, { type: 'cart' })
  .then(...);
```
The response from this call will contain all the information you'll need to create your checkout page, such as the checkout token ID, conditionals (whether various pieces of information are required to be collected), the line items in the cart, the merchant information, the available payment gateways, shipping methods, etc.

### Capturing the order

Okay, you've created your checkout form, connected up the data you get from `commerce.checkout.generateToken()` (or `commerce.checkout.getToken()` if you created the token earlier), now you need to hook up your logic to capture the checkout!

Capturing the checkout validates the order: the product, selected variants, stock availability, shipping methods, customer information, and payment information. It then captures the payment, issues order confirmation emails and notifications, and returns you the receipt object.

We use key-value multi-dimensional arrays/objects/hashes to immediately associate values with their parent(s) ID when submitting data. For example with line items, the key would be the `line_item_id` and the related values would be nested under that key.

* Line item's quantity: `line_items[{line_item_id}][quantity]`
* Line item's variant and selected option: `line_items[{line_item_id}][variants][{variant_id}] = {option_id}`

#### Tax support

Tax support with Chec/Commerce.js is automatic. We calculate the tax based on the shipping address submitted. If you're not submitting an address for the customer, you can supply the tax region with these arguments:

* `tax[ip_address]` **Required** if only using an IP address to set the tax location. Chec will set the tax location to the estimated location of this IP address.
* `tax[country]` **Required** if _not_ using an IP address to set the tax location. If provided, this must be a valid ISO 3166-1 alpha-2 country code (e.g. `GB` for the United Kingdom).
* `tax[region]` **Required** if in Canada or the USA. Must be a valid short code for the region, e.g. `CA` for California, or `QB` for Quebec.
* `tax[postal_zip_code]` **Required** if "Auto US Sales Tax" is enabled for your account.

#### EU VAT MOSS

If you have EU VAT MOSS enabled for your account, you can use the helper function "Get buyer's location from IP" (see the full API reference), and use this value to set `tax[ip_address]`.

#### Important

If you're working with PayPal, you should sent both `tax[ip_address]` and `tax[country]` (by asking the customer to select their tax country from a dropdown).

You can also set tax information for your checkout before you capture it using the `commerce.checkout.setTaxZone()` helper function.

#### Make the request

Okay, we're ready to make the request. For this example we are simply going to use the shipping address to calculate tax for the order. We'll use the checkout token we generated earlier - let's dive in:
```js
commerce.checkout.capture('chkt_959gvxcZ6lnJ7', {
  line_items: {
    // Key is the line item ID for our test product
    item_7RyWOwmK5nEa2V: {
      quantity: 1
      variants: {
        // Key is the variant ID for "Color", value is the option ID for "Blue"
        vrnt_bO6J5apWnVoEjp: 'optn_Op1YoVppylXLv9',
        // Key is the variant ID for "Size", value is the option ID for "Small"
        vrnt_4WJvlKpg7pwbYV: 'optn_zkK6oL99G5Xn0Q',
      }
    }
  },
  customer: {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
  },
  shipping: {
    name: 'John Doe',
    street: '123 Fake St',
    town_city: 'San Francisco',
    county_state: 'CA',
    postal_zip_code: '94103',
    country: 'US',
  },
  fulfillment: {
    // The shipping method ID for "USPS Ground" (for example)
    // You can use commerce.checkout.getShippingOptions() to get a list
    shipping_method: 'ship_1ypbroE658n4ea',
  },
  payment: {
    // Test Gateway is enabled by default, and is used when you submit orders with
    // your sandbox API key
    gateway: 'test_gateway',
    card: {
      number: '4242 4242 4242 4242',
      expiry_month: '01',
      expiry_year': '2023',
      cvc: '123',
      postal_zip_code: '94103,
    },
  },
})
  .then(response => {
    console.log('Great, your checkout was captured successfully! Checkout the response object for receipt info.');
  })
  .catch(error => console.error(error));
```
In response to a successful checkout capture, you'll get all the information for the order you need to show a confirmation page to your customer, including the `id` (the order ID), the `customer_reference` (customer's order reference), and much more.

That's it! You've got a working checkout integration with Commerce.js! Play around, and when you're finished you can clear all your test orders from the Chec Dashboard if you want to.
