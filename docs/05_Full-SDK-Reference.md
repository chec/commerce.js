---
title: Full SDK reference
description: 'The full SDK reference of Commerce.js.'
position: 5
category: Full SDK reference
---

**Commerce.js** is a JavaScript SDK built on top of the **Chec Platform** to allow for easy interfacing with the **Chec
API**. The Commerce.js SDK provides all the features you need to build a custom commerce web experience that works on any
modern domain. The SDK comes packed with helper functions that are essential to manage complexity in the commerce logic
of an application. Here you will find the full Commerce.js SDK reference. All features are accessible from your Commerce
object instance.

---

## Products

`products`: Methods for getting product data, including variant information, shipping settings, assets, etc.

| Method | Description |
| -------------------- | ----------- |
| `list(params)`       | List products. You may also provide `{ category_slug: '...' }`, or `{ category_id: '...' }` to list products by category. |
| `retrieve(id, data = {})`  | Get a specific product |

## Categories

`categories`: Manage product categories in order to group your products.

| Method | Description |
| -------------------- | ----------- |
| `list(params)`       | List all categories, either by filtered params or unfiltered |
| `retrieve(id, data = {})`  |  Get a specific category by its ID. You may also provide `{ type: 'slug'}` as data and use a category slug instead of an ID.  |

## Cart

`cart`: All aspects of managing a cart for your customer.

| Method | Description |
| -------------------- | ----------- |
| `id()`       | Get the current cart ID, generating a new one if necessary |
| `refresh()`  | Request a new cart ID |
| `add(productId, quantity)`  | Add an item to the cart |
| `retrieve()` | Get the cart object, including contents |
| `contents()` | Get the contents of the cart |
| `update(lineItemId, data)` | Update an existing item in the cart |
| `remove(lineItemId)` | Remove a line item from the cart |
| `empty()` | Clear the cart contents but cart is not deleted |
| `delete()` | Delete the entire cart |

## Checkout

`checkout`: All aspects of managing your checkout, including helper functions.

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
| `checkPayWhatYouWant(token, data)`  | Checks whether a checkout has "pay what you want" enabled  |
| `checkShippingOption(token, data)`  | Checks whether a shipping method is valid  |
| `checkVariant(token, lineItemId, data)`  | Checks whether the specified line item ID is still valid/available  |
| `checkQuantity(token, lineItemId, data)`  | Checks whether the requested quantity is available for a line item  |
| `helperValidation(token)`  | Gets any applicable validation rules  |

## Services

`services`: Additional checkout helper service methods.

| Method | Description |
| -------------------- | ----------- |
| `services`  | Additional checkout helper service methods |
| `localeListCountries()` | List all countries |
| `localeListShippingCountries(token)` | List all countries that can be shipped to for a checkout token |
| `localeListSubdivisions(countryCode)` | List all subdivisions/regions/states for a country |
| `localeListShippingSubdivisions(token, countryCode)` | List all subdivisions/regions/states for a country that can be shipped to for a checkout token |

## Merchants

`merchant`: Access information about your merchant account, e.g. business name, etc.

| Method | Description |
| -------------------- | ----------- |
| `about()`       | Gets information about the merchant |


---
