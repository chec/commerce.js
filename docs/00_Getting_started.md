---
title: "Getting Started"
---

**Commerce.js** is a JavaScript SDK built on top of the **Chec API**. The Commerce.js SDK provide helper functions for each core endpoint such as [products](/docs/sdk/products), [cart](/docs/sdk/cart), and [checkout](/docs/sdk/checkout) to cater for common checks you’d normally have to create manually, for example *“is this variant available for this order”* or *“what’s the list of provinces in Canada or regions in New Zealand?”.* \
\
Commerce.js is designed to work alongside future server-side SDKs, making the API limited to [public key](/docs/sdk/getting-started#scope) scoped requests. Commerce.js utilizes your public API key which is required to retrieve non-sensitive data such as the products, cart, and checkout resources. It can also be used to capture orders although you will be unable to access the order resource for security reasons. We dive a bit deeper into the authentication of our API keys below. Note that examples provided using the Commerce.js SDK are utilizing the latest version - available on [npm](https://www.npmjs.com/package/@chec/commerce.js).

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Success(note) highight block] Note that examples provided using the Commerce.js SDK are utilizing the latest version - available on [npm](https://www.npmjs.com/package/@chec/commerce.js). We are also working on releasing additional server-side SDKs in other languages (PHP, Ruby, Python, etc).-->

---

## Authentication

When you [create a Chec account](https://dashboard.chec.io/signup), two sets of API authentication keys are generated, a public key and a secret key. The public key is used with Commerce.js to access all core resource endpoints. You can manage your API keys from your dashboard under the developer section.\

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Success(note) highight block] To obtain your API keys, navigate to the developer section from your Chec dashboard (Settings > Developer). -->

\
All API requests using live API keys must be made over HTTPS, calls made over plain HTTP will fail. Requests must be authenticated with your [secret key](/docs/sdk/getting-started#scope) by including it in the X-Authorization header when making the requests to sensitive endpoints. However, all API requests made using your sandbox secret key can be made over both HTTP or HTTPS.

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Warning highlight block] All API requests using live API keys must be made over HTTPS, calls made over plain HTTP will fail. Read more on authentication methods [here](https://commercejs.com/docs/api/#authentication) in our API source. -->

---

## Scope

Scope defines the varying levels of access a client has to a set of Chec API resources or operations performed on the resources. Scope provides a way to constrain and consider the granular access clients might need. We define our scope using public and secret keys.

#### Public keys

##### To be used with Commerce.js's JavaScript SDK & any client-side code. Public APIs are limited by scope for this reason.

| Read | Write |
| -------------------- | ----------- |
| Products       | Carts  |
| Carts               | Checkout   |
| Checkout            | Checkout helpers  |
| Checkout helpers    |
| Spaces    |
| Settings    |
| Categories    |
| Fulfillment    |

##### Client side

The public key is to be used with requests that don't require any sensitive actions or data to be retrieved. The Commerce.js SDK includes all client side endpoints, so you can use them quickly and easily in your client-facing projects. An example would be to list your products from `product` endpoint.

#### Secret keys

##### To be used with server side code. These API keys have the power to access sensitive data such as receipts and order data.

| Read & write |  |
| -------------------- | ----------- |
| Products       |
| Carts               |
| Checkout            |
| Checkout helpers    |
| Spaces    |
| Settings    |
| Categories    |
| Fulfillment    |

##### Server side

The secret key can be used with requests that require sensitive actions or data to be retrieved as well as all client side requests. You'll use your _secret key_ for these requests. The Commerce.js SDK does not include any of these endpoints for security reasons, so you'll need to write custom backend logic for handling these. You can find some examples in the [full API reference](/docs/api).\
\
When you register for a Chec account, you'll be assigned two sets of these keys: live and sandbox. We highly recommend using your sandbox key until you're ready to deploy your new project live. Orders created with sandbox keys can easily be cleared from the Chec Dashboard, and will automatically use the "Test Gateway" for payment processing.

---

## Installation

#### Install the SDK via a package manager

If you're using npm or yarn, then adding the Commerce.js SDK to your project is real simple. Navigate into your project's root folder in your terminal, and type the following:

```bash
npm install @chec/commerce.js
# or
yarn add @chec/commerce.js
```

#### Installing the SDK via our CDN

```js
<script type="text/javascript" src="https://assets.chec-cdn.com/v2/commerce.js"></script>
```

We're almost ready to go! We just need to create a new Commerce instance and give it our public key (you can get your API keys from the [Chec Dashboard](https://dashboard.chec.io).

```js
// Import the Commerce module
import Commerce from '@chec/commerce.js';

// Create a Commerce instance
const commerce = new Commerce('public_api_key');
```

---

## Console Debugger

We've built in a console debugger into our client-side JavaScript SDK to help out during development.\
\
You can also optionally add `true` as the second constructor argument to enable debug mode, which will enable the Commerce.js console debugger.

```javascript
const commerce = new Commerce('public_api_key', true);
```

The console debugger only works when you are using a test API key, messages will not be shown if you are using a live API key.

![Console debugger image](https://i.ibb.co/QQDGRkT/console-debugger.png)

>[!WARNING]
>This is a warning
