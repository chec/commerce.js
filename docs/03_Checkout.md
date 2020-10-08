---
title: Checkout
description: 'The Checkout endpoint in Commerce.js.'
position: 3
category: Checkout
---

The checkout resource is used to navigate your customers through the transaction and shipping stage of a purchasing
flow. A checkout captures data sent from the cart along with the item information, line item IDs, any shipping or
billing information as well as tax and shipping rates. The checkout resource is a verbose endpoint that comes with
additional helpers eg. [Checkout helpers](#checkout-helpers) and [Services](#services) to fully manage your customer's
purchasing experience. See [here](/docs/sdk/concepts#checkout-tokens) for more high-level concepts on the Checkout
resource.

---

## Generate token

The `generateToken()` method uses `GET v1/checkouts/{id}` to generate a [checkout
token](/docs/sdk/concepts#checkout-tokens) which can be used to initiate the process of capturing an order from a cart.
`generateTokenFrom()` gets a new checkout token from a specific identifier type. See below for the example request.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.checkout.generateToken('permalink', 'white-shirt')
  .then((checkout) => console.log(checkout.id))

// Gets a new checkout token from a specific identifier type
commerce.checkout.generateTokenFrom('permalink', 'white-shirt')
  .then((checkout) => console.log(checkout.id))
```

| Method | Description |
| -------------------- | ----------- |
| `generateToken(identifier, data)` | Gets a new checkout token |

Upon a successful request, a checkout token object will be returned which contains everything you need to create your
checkout page.

<div class="highlight highlight--warn">
    <span>Important</span>
    <p>Checkout tokens can only be used once and expire after 7 days.</p>
</div>


<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for generating a checkout token <a href="/docs/api/?shell#checkout">here</a>.</p>
</div>

---

## Capture order

The `capture()` method uses `POST v1/checkouts/{checkout_token_id}` to capture an order and payment by providing the
checkout token and necessary data for the order to be completed. The resolved promise returns an order object which can
be used for receipt.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.checkout.capture('token', {
  "line_items": {
      "item_7RyWOwmK5nEa2V": {
          "quantity": 1,
          "variants": {
              "vrnt_p6dP5g0M4ln7kA": "optn_DeN1ql93doz3ym"
          }
      }
  },
  "customer": {
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
  },
  "shipping": {
      "name": "John Doe",
      "street": "123 Fake St",
      "town_city": "San Francisco",
      "county_state": "California",
      "postal_zip_code": "94103",
      "country": "US"
  },
  "fulfillment": {
      "shipping_method": "ship_7RyWOwmK5nEa2V"
  },
  "billing": {
      "name": "John Doe",
      "street": "234 Fake St",
      "town_city": "San Francisco",
      "county_state": "California",
      "postal_zip_code": "94103",
      "country": "US"
  },
  "payment": {
      "gateway": "stripe",
      "card": {
          "token": "irh98298g49"
      }
  },
  "pay_what_you_want": "149.99"
}).then((response) => console.log(response));
```

| Method | Description |
| -------------------- | ----------- |
| `capture(token, data)`  | Capture a checkout by its token ID  |

In response to a successful checkout capture, you'll get all the information for the order you need to show a
confirmation page to your customer, including the `id` (the order ID), the `customer_reference` (customer's order
reference), and much more. Note that you may want to store the response in local state since fetching the data again
would require a secret key.

Key-value multi-dimensional arrays/objects/hashes are used to immediately associate values with their parent(s) ID when
submitting data. For example with line items, the key would be the `line_item_id` and the related values would be nested
under that key.

* Line item's quantity: `line_items[{line_item_id}][quantity]`
* Line item's variant and selected option: `line_items[{line_item_id}][variants][{variant_id}] = {option_id}`

<div class="highlight highlight--warn">
    <span>Important</span>
    <p>When using PayPal, the response returned will contain the information required for you to redirect your customer to PayPal in order to complete their transaction. Read more <a href="/docs/sdk/concepts#tax-support">here</a> for required parameters to send when using PayPal, or <a href="https://developer.paypal.com/docs/archive/checkout/how-to/customize-flow/"> see here</a> for the PayPal documentation.</p>
</div>

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for capturing a checkout <a href="/docs/api/?shell#checkout">here</a>.</p>
</div>

---

## Get existing token

The `getToken()` method uses `GET v1/checkouts/tokens/{checkout_token_id}` to return an existing checkout token by it's
ID. The output from this request will be the same as that of `.generateToken()`.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.checkout.getToken('chkt_L5z3kmQpdpkGlA').then((token) => console.log(token));

```

| Method | Description |
| -------------------- | ----------- |
| `getToken(token)`  | Gets information about the checkout token  |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for getting an existing checkout token <a href="/docs/api/?shell#get-existing-token">here</a>.</p>
</div>

---

# Checkout helpers

[Checkout helper](/docs/sdk/concepts#checkout-helpers) functions are provided to help create custom checkout flows and
handle all common commerce logic that would otherwise be complex. Every time a checkout helper endpoint is called, an
object called the [live object](/docs/sdk/concepts#the-live-object) will be updated and the returned data is then
typically used to update the checkout UI. All checkout helpers that affect price (e.g. check quantity, check variant,
check discount, etc) will return the live object.

## Get the live object

The live object is a living object which updates to show the live tax rates, prices, and totals for a checkout token.
The `getLive()` method uses `GET v1/checkouts/{checkout_token_id}/live` to return the current checkout live object.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce({})

Commerce.checkout.getLive('chkt_L5z3kmQpdpkGlA').then((response) => console.log(response));

```

| Method | Description |
| -------------------- | ----------- |
| `getLive(token)`  | Gets the current "live" object  |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for the live object <a href="/docs/api/?shell#get-the-live-object">here</a>.</p>
</div>

---

## Check "Pay What You Want"

If you have enabled "Pay What You Want" pricing, your customers are able to choose the amount they pay. The
`checkPayWhatYouWant()` method uses `GET v1/checkouts/{checkout_token_id}/check/pay_what_you_want` to validate and saves
the desired "Pay What You Want" amount for the provided checkout token, if enabled. If the amount is too low, an invalid
response will be returned with the minimum amount required.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.checkout.checkPayWhatYouWant('chkt_L5z3kmQpdpkGlA', {
  customer_set_price: '100.00',
}).then((response) => console.log(response));

```

| Method | Description |
| -------------------- | ----------- |
| `checkPayWhatYouWant(token, data)`  | Checks whether a checkout has "pay what you want" enabled  |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for the "Check Pay What You Want" request <a href="/docs/api/?shell#check-quot-pay-what-you-want-quot-amount">here</a>.</p>
</div>

---

## Check discount code

The `checkDiscount()` method uses `GET v1/checkouts/{checkout_token_id}/check/pay_what_you_want` to validate a discount
code for the provided checkout token, and applies it to the order if it is valid.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.checkout.checkPayWhatYouWant('chkt_L5z3kmQpdpkGlA', {
  customer_set_price: '100.00',
}).then((response) => console.log(response));

```

| Method | Description |
| -------------------- | ----------- |
| `checkDiscount(token, data)`  | Checks whether a discount code is valid  |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for the "Check discount code" <a href="/docs/api/?shell#check-discount-code">here</a>.</p>
</div>

---

## Check shipping method

The `checkShippingOption()` method uses `GET v1/checkouts/{checkout_token_id}/check/shipping` to validate a shipping
method for the provided checkout token, and applies it to the order.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.checkout.checkShippingOption('chkt_L5z3kmQpdpkGlA', {
  shipping_option_id: 'ship_31q0o3e21lDdjR',
  country: 'US',
  region: 'CA',
}).then((response) => console.log(response));

```

| Method | Description |
| -------------------- | ----------- |
| `checkShippingOption(token, data)`  | Checks whether a shipping method is valid  |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for the "Check Shipping Method <a href="/docs/api/?shell#check-shipping-method">here</a>.</p>
</div>


---

## Get shipping methods

The `getShippingOptions()` method uses `GET v1/checkouts/{checkout_token_id}/helper/shipping_options` to return a list of available shipping methods for the provided checkout token.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.checkout.getShippingOptions('chkt_L5z3kmQpdpkGlA', {
  country: 'US',
  region: 'CA',
}).then((response) => console.log(response));
```

| Method | Description |
| -------------------- | ----------- |
| `getShippingOptions(token, data)`  | Gets the available shipping options |

## Set tax zone

The `setTaxZone()` method uses `GET v1/checkouts/{checkout_token_id}/helper/set_tax_zone` to set the tax zone for the
provided checkout token's order, either automatically from a provided IP address, or by the geographic data provided in
the request arguments.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.checkout.setTaxZone('chkt_L5z3kmQpdpkGlA', {
  country: 'US',
  region: 'CA',
  postal_zip_code: '94107',
}).then((response) => console.log(response));

```

| Method | Description |
| -------------------- | ----------- |
| `setTaxZone(identifier, data)`  | Sets the geographic zone for tax calculation  |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for setting the tax zone <a href="/docs/api/?shell#set-tax-zone">here</a>.</p>
</div>

### Checkout SDK reference

Refer to the full list of all the available checkout methods [here](/docs/sdk/full-sdk-reference#checkout).

---

# Services

The **Services** endpoint are additional checkout helpers service methods.

## List all countries

The `localeListCountries()` method uses `GET v1/services/locale/countries` to return a list of all countries registered
in the platform. See [List available shipping countries](#list-available-shipping-countries) for an equivalent list of
countries that can be shipped to your account.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.services.localeListCountries().then((response) => console.log(response));
```

| Method | Description |
| -------------------- | ----------- |
| `localeListCountries()` | List all countries |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for the "List all countries" request <a href="/docs/api/?shell#list-all-countries">here</a>.</p>
</div>

---

## List all subdivisions for a country

The `localeListSubdivisions()` method uses `GET v1/services/locale/{country_code}/subdivisions` to return a list of all
subdivisions (states, provinces, or regions) for that country, given a valid country code is provided. See [List
available shipping subdivisions for country](#list-available-shipping-subdivisions) for an equivalent list of
subdivisions that can be shipped to for your account.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.services.localeListSubdivisions('US').then((response) => console.log(response));
```

| Method | Description |
| -------------------- | ----------- |
| `localeListSubdivisions()` | List all subdivisions (states, provinces, or regions) |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for "List all Subdivisions for a Country" request <a href="/docs/api/?shell#list-all-subdivisions-for-a-country">here</a>.</p>
</div>

---

## List available shipping countries

The `localeListShippingCountries()` method at `GET v1/services/locale/{checkout_token_id}/countries` returns only the
countries which can be shipped to the current checkout.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

Commerce.services.localeListShippingCountries('chkt_L5z3kmQpdpkGlA').then((response) => console.log(response));
```

| Method | Description |
| -------------------- | ----------- |
| `localeListShippingCountries(token)` | List all countries that can be shipped to for a checkout token |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for the "List available shipping countries" request <a href="/docs/api/?shell#list-available-shipping-countries">here</a>.</p>
</div>

## List available shipping subdivisions

The `localeListShippingSubdivisions()` method at `GET
v1/services/locale/{checkout_token_id}/countries/{country_code}/subdivisions` returns only the subdivisions (states,
provinces, or regions) in a country which can be shipped to for the current checkout.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

Commerce.services.localeListShippingSubdivisions('chkt_L5z3kmQpdpkGlA', 'US').then((response) => console.log(response));
```

| Method | Description |
| -------------------- | ----------- |
| `localeListShippingSubdivisions(token, countryCode)` | List all subdivisions/regions/states in a country which can be shipped to for the current checkout. |

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Refer to the full response for the "List available shipping subdivisions" request <a href="/docs/api/#list-available-shipping-subdivisions-for-country">here</a>.</p>
</div>

### Services SDK reference

Refer to the full list of all the available services methods [here](/docs/sdk/full-sdk-reference#services).

---
