---
title: "Commerce.js"
---

## Introduction

**Commerce.js** is a JavaScript SDK built on top of the **Chec platform** to allow for easy interfacing with the **Chec API**. The Commerce.js SDK provides all the [features](/docs/sdk/concepts/#features) you need to build a custom commerce web experience that work on any modern domain. The SDK comes packed with helper functions that are essential to manage complexity in the commerce logic of an application, as well as a built-in [console debugger](#console-debugger) that enables a seamless development process.\
\
Responses are returned asynchronously in a Promise when making requests using the Commerce.js SDK.
\
**Chec** is the name of the eCommerce Infrastructure we have built to support a broad spectrum of merchants and use-cases. [Chec Dashboard](http://dashboard.chec.io/) is the prebuilt dashboard that is used to manage your eCommerce store and account.

---

## Features

All features are accessible from your Commerce object instance and requests to these endpoints are received as JSON objects.

#### Products `products`

**Methods for getting product data, including variant information, shipping settings, assets, etc.**

| Method | Description |
| -------------------- | ----------- |
| `list(params)`       | List products |
| `retrieve(id, data = {})`  | Get a specific product |

#### Categories `categories`
**Manage product categories in order to group your products.
| Method | Description |
| -------------------- | ----------- |
| `list(params)`       | List all categories, either by filtered params or unfiltered |
| `retrieve(id, data = {})`  |  Get a specific category by its ID. You may also provide `{ type: 'slug'}` as data and use a category slug instead of an ID.  |

#### Cart `cart`

**All aspects of managing a cart for your customer.**

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

**All aspects of managing your checkout, including helper functions.**

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

#### Services `services`

**Additional checkout helper service methods.**

| Method | Description |
| -------------------- | ----------- |
| `services`  | Additional checkout helper service methods |
| `localeListCountries()` | List all countries |
| `localeListShippingCountries(token)` | List all countries that can be shipped to for a checkout token |
| `localeListSubdivisions(countryCode)` | List all subdivisions/regions/states for a country |
| `localeListShippingSubdivisions(token, countryCode)` | List all subdivisions/regions/states for a country that can be shipped to for a checkout token |

#### Merchants

**Access information about your merchant account, e.g. business name, etc.**

| Method | Description |
| -------------------- | ----------- |
| `about()`       | Gets information about the merchant |


---

## Contributing

At Chec/Commerce.js, we believe open source developer tools documentation is a collaborative effort to be continuously improved on. We welcome and encourage all contributions to the Commerce.js documentation from the community, be it small or big. Contributing to the documentation source will require basic knowledge of Markdown formatting and styling.\
\
The SDK documentation module source code resides in `commerce.js/docs`. The docs source is fetched and added to a root directory in our the [Commerce.js website](https://commercejs.com/).

#### What can you contribute?

- Errors, typos, or any other improvements to current documentation
- A full-page new documentation to highlight a feature or resource

##### Here are some basic guidelines to start making contributions to the SDK documentation:

  - [Edit online](#edit-online)
  - [Commit messages and branch name](#commit-messages-and-branch-name)
  - [Edit locally](#edit-locally)
  - [Contributing to Chec open source](#contributing-to-other-chec-open-source-projects)

#### Edit online

The simplest way to edit the documentation is to do it on GitHub's interface. All documentation source is located in `commerce.js/docs`, so all you'll need to do is locate the appropriate `.md` file in [chec/commerce.js/docs](https://github.com/chec/commerce.js/tree/master/docs) and edit.

1. Navigate to the file in GitHub in [chec/commerce.js/docs](https://github.com/chec/commerce.js/tree/master/docs)
2. Click the **pencil** icon in the top right corner and it will switch the document to an edit mode
3. Type a [commit message](#commit-messages-and-branch-name) and any necessary description after making your edit
4. Select **Create a new branch for this commit and start a pull request**
5. Give your branch name a prefix and a description. See [here](#commit-messages-and-branch-name).
6. Click **Propose file change**
7. Give the pull request a descriptive title similar to your branch name and a description
8. Click **Create pull request** to submit

#### Commit messages and branch name

- Commit messages should be in the imperative tense ie. *Edit the intro section of cart* vs. *Edited the intro section of cart*
- Your branch should be prefixed with either **Feature** for new documentation content or **Bugfix** for typos and other small changes. Ie. Feature/new-cart-content

#### Edit locally

For more complex changes, you'll want to fork the repo and edit locally:

1. Fork `chec/commerce.js`
2. `git clone` the fork to your local machine
3. Make edits in your favorite code editor on a new branch
4. Commit and push changes to your remote repo
5. Create a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to `chec/commerce.js/master`


#### Contributing to other Chec open source projects
To contribute to other Chec open source projects, see a full list [here]().

---

## Console Debugger

We've built in a console debugger in Commerce.js to help you out with debugging during development. To enable the console debugger, add `true` as the second constructor argument when you create your Commerce instance.

```js
const commerce = new Commerce('public_api_key', true);
```

<div class="highlight highlight--warn">
  The console debugger only works when you are using a test API key, messages will not be shown if you are using a live API key.
</div>


![Console debugger image](https://i.ibb.co/QQDGRkT/console-debugger.png)
