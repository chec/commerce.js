---
title: "Concepts"
---

## Features

The Commerce.js SDK supports all of the frontend oriented functionality you'll need to get a customer-facing store up and running. All features are accessible from your Commerce object instance, for example from the cart endpoint `commerce.cart.retrieve()` would retrieve your cart data.

#### Products `products`
###### Methods for getting product data, including variant information, shipping settings, assets, etc.
| Method | Description |
| -------------------- | ----------- |
| `list(params)`       | List products |
| `retrieve(permalink, data)`  | Get a specific product |
| `services`  | Additional checkout helper service methods |
| `localeListCountries()` | List all countries |
| `localeListShippingCountries(token)` | List all countries that can be shipped to for a checkout token |
| `localeListSubdivisions(countryCode)` | List all subdivisions/regions/states for a country |
| `localeListShippingSubdivisions(token, countryCode)` | List all subdivisions/regions/states for a country that can be shipped to for a checkout token |

#### Categories `categories`
###### Manage product categories in order to group your products.
| Method | Description |
| -------------------- | ----------- |
| `list(params)`       | List all categories, either by filtered params or unfiltered |
| `retrieve(slug, data)`  | Get a specific category by its slug  |

#### Cart `cart`
###### All aspects of managing a cart for your customer.
| Method | Description |
| -------------------- | ----------- |
| `id()`       | Get the current cart ID, generating a new one if necessary |
| `refresh()`  | Request a new cart ID |
| `add(data)`  | Add an item to the cart |
| `retrieve()` | Get the cart object, including contents |
| `contents()` | Get the contents of the cart |
| `update(lineItemId, data)` | Update an existing item in the cart |
| `remove(lineItemId)` | Remove a line item from the cart |
| `empty()` | Clear the cart contents but cart is not deleted |
| `delete()` | Delete the entire cart |

#### Checkout `checkout`
###### All aspects of managing your checkout, including helper functions.
| Method | Description |
| -------------------- | ----------- |
| `generateToken(identifier, data)` | Gets a new checkout token |
| `protect(token)`  | Add fraud protection tracking to your checkout  |
| `capture(token, data)`  | Capture a checkout by its token ID  |
| `receipt(token)`  | Gets the receipt for the checkout (after it has been captured)  |
| `getLive(token)`  | Gets the current "live" object  |
| `getLocationFromIP(token, ipAddress)`  | Gets a location from the provided (or your own) IP address  |
| `getShippingOptions(token, data)`  | Gets the available shipping options  |
| `getToken(token)`  | Gets information about the checkout token  |
| `isFree(token)`  | Checks whether a checkout has a zero payable balance  |
| `setTaxZone(identifier, data)`  | Sets the geographic zone for tax calculation  |
| `checkDiscount(token, data)`  | Checks whether a discount code is valid  |
| `checkGiftcard(token, data)`  | Checks whether a gift card (code) is valid  |
| `checkPaypalStatus(token)`  | Checks the status of a PayPal payment  |
| `checkPaypalOrderCaptured(token)`  | Checks whether the status of a PayPal payment is captured  |
| `checkPayWhatYouWant(token, data)`  | Checks whether a checkout has "pay what you want" enabled  |
| `checkShippingOption(token, data)`  | Checks whether a shipping method is valid  |
| `checkVariant(token, lineItemId, data)`  | Checks whether the specified line item ID is still valid/available  |
| `checkQuantity(token, lineItemId, data)`  | Checks whether the requested quantity is available for a line item  |
| `helperValidation(token)`  | Gets any applicable validation rules  |

#### Merchants
###### Access information about your merchant account, e.g. business name, etc.
| Method | Description |
| -------------------- | ----------- |
| `about()`       | Gets information about the merchant |

---

## Checkout tokens

Checkout tokens need to be generated before you are able to **capture an order**. With a generated token, the [checkout token](https://commercejs.com/docs/api/?javascript--cjs#generate-token) object is returned which contains everything you would need to implement a checkout process and a unqiue purchasing experience for your users. For example, the returned object will contain properties such as shipping options, discount codes available, or other fields that are needed to be collected.\
\
To generate a checkout token, all you need to provide is the permalink or ID of the product, or the cart ID you'd like to generate a checkout for. See [here](https://commercejs.com/docs/api/#generate-token) for the required parameters. *Checkout tokens can only be used once and expire after 48 hours.*

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Warning highight block] Checkout tokens can only be used once and expire after 48 hours. -->

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Info highight block] Check out an example here on how to generate a checkout token. -->

##### Example request using cURL

```sh
$ curl -X GET
    -G "https://api.chec.io/v1/checkouts/{identifier}?type={identifier_type}"
    -H "X-Authorization: {key}"
```

##### Example request using Commerce.js

```js
Commerce.checkout.generateToken('{identifier}', '{identifier_type}')
  .then(response => console.log(response.id))
});
```

---

## Checkout helpers

We created Commerce.js to handle all common commerce logic. Helper functions help you make common eCommerce calls during the checkout.

For example:

  * Checking if a requested variant, quantity, or shipping option is available
  * Checking if an entered "Pay What You Want" amount or discount code is valid
  * Retrieving running totals for a checkout (i.e. subtotals, shipping totals, and grand totals) - the live object
  * Generate client side validation rules for jQuery
  * Get a full list of states/provinces for a country to populate a `<select>`
  * Get the buyers location from an IP address
  * Set a new tax zone for the checkout when the customer changes their shipping address

All helper endpoints on the Checkout resource update the live object. e.g. If you select a variant that is available or a quantity that is available, the live object will be adjusted to reflect this. Most responses contain a "live" object which gives you the live running totals and other information relevant to the current checkout session so you can update displayed totals (and more) straight away.

Helper functions are not required. All totals are recalculated during capture using the checkout data sent.

##### cURL

```sh
# Get the buyers location from their IP (for preselecting address fields or EU VAT MOSS evidence)
$ curl https://api.chec.io/v1/checkouts/{checkout_token_id}/helper/location_from_ip \
    -H "X-Authorization: {key}"

# Example - Is the quantity selected valid?
$ curl https://api.chec.io/v1/checkouts/{checkout_token_id}/check/{line_item_id}/quantity?amount={amount} \
-H "X-Authorization: {key}"

# Example - Is this order now free? (i.e. after a discount code is entered)
$ curl https://api.chec.io/v1/checkouts/{checkout_token_id}/check/is_free \
-H "X-Authorization: {key}"

```

##### Commerce.js

```js
// Get the buyers location from their ip (for pre-selecting address fields or EU VAT MOSS evidence)
commerce.checkout.getLocationFromIP('{checkout_token_id}').then(response => {

});

// Example - Is the quantity selected valid?
commerce.checkout.checkQuantity('{checkout_token_id}', '{requested-quantity}').then(response => {

});

// Example - Is this order now free? (i.e. after a discount code is entered)
commerce.checkout.isFree('{checkout_token_id}').then(response => {

});
  ```

---

## The Live Object

The live object is a living object which adjusts to show the live tax rates, prices, and totals for a checkout token. Every time a checkout helper endpoint is called, this object will be updated. The returned data can be used to display information back to the customer on the checkout. All checkout helpers that affect price (e.g. check quantity, check variant, check discount etc) with return the live object in its payload.

We create the live object to help you (and us!) display up-to-date totals, tax prices, and other dynamic variables which change during the Checkout process and need to displayed back to the customer. You should use the data in the live object to update the displayed totals on your checkout pages when the customer selects a new variant, enters a discount, or selects a different shipping option.

At Chec we do this on our own checkouts by feeding the <span class="hl">live object</span> returned from each helper function into a JavaScript function which associates the data with the correct element.

---

## Multiple price formats

Every price attribute (subtotals, pay what you want minimums, tax totals, etc..) returned from Chec will be an array with four formats:

- `raw` - No formatting *e.g. 49 or 1234.56*
- `formatted` - Formatted with no currency symbol or code *e.g. 49.00 or 1,234.56*
- `formatted_with_symbol` - Formatted with its symbol only *e.g. $49.00 or £1,234.56*
- `formatted_with_code` -  Formatted with its currency code only *e.g. 49.00 USD or 1,234.56 GBP*

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

## Verb Conditionals

We return all conditionals in the `conditionals` array in most objects. We also return conditionals with their verb as the array key name e.g. `is.cart_free` or `has.physical_delivery` or `collects.shipping_address`.

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

Why? To (hopefully) make your code easier to write, read, and maintain, by nesting variables under their "verb key" your code reads better e.g. `checkout.conditionals.is_cart_free` vs `checkout.is.cart_free`. This is particularly nicer to work with for designers who are primarily working with JavaScript.

It works well for most verb conditionals.

```javascript

//Few more examples in different syntax
checkout.is.cart_free
$checkout['is']['preorder']
$checkout->is->sold_out

product.has.product_photos
$product['has']['physical_delivery']
$product->has->product_audio

checkout.collects.fullname
$checkout['collects']['billing_address']
$checkout->collects->extra_fields

```
