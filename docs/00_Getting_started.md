---
title: Getting Started
description: ''
position: 1
category: Getting started
---

**Commerce.js** is a JavaScript SDK built on top of the **Chec platform** to allow for easy interfacing with the **Chec API**. The Commerce.js SDK provides all the features you need to build a custom commerce web experience that work on any modern domain. The SDK comes packed with helper functions that are essential to manage complexity in the commerce logic of an application, as well as a built-in [console debugger]() that enables a seamless development process.

Here, you will find information on setting up and integrating Chec/Commerce.js into your application.

##### Before installing Commerce.js, you'll first need to create an account to get your API credentials.
1. Sign up for a Chec account [here](https://dashboard.chec.io/signup).
2. Navigate to the developer section under settings [here](https://dashboard.chec.io/settings/developer).
3. Obtain your generated public and secret keys.

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Success(note) highight block] Note that examples provided using the Commerce.js SDK are utilizing the latest version - available on [npm](https://www.npmjs.com/package/@chec/commerce.js). We are also working on releasing additional server-side SDKs in other languages (PHP, Ruby, Python, etc).-->

<chec-alert variant="success" inline="true">

Test

</chec-alert>

---

## Authentication

When you [create a Chec account](https://dashboard.chec.io/signup), two sets of API authentication keys are generated, a **public key** and a **secret key**. The public key is used with Commerce.js to access all core resource endpoints. You can manage your API keys from your dashboard under the developer section.

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Success(note) highight block] To obtain your API keys, navigate to the developer section from your Chec dashboard (Settings > Developer). -->
\
While using Commerce.js, the Chec API is limited to [public key scoped]() requests. We developed Commerce.js to to work alongside future server-side SDKs. Commerce.js utilizes your public API key which is required to retrieve non-sensitive data such from [products](), [cart](), and [checkout]() endpoints. It can also be used to capture orders although you will be unable to access the order resource for security reasons.\
\
All API requests using live API keys must be made over HTTPS, calls made over plain HTTP will fail. Requests must be authenticated with your [secret key](/docs/sdk/getting-started#scope) by including it in the X-Authorization header when making the requests to sensitive endpoints. However, all API requests made using your sandbox secret key can be made over both HTTP or HTTPS.

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Warning highlight block] All API requests using live API keys must be made over HTTPS, calls made over plain HTTP will fail. Read more on authentication methods [here](https://commercejs.com/docs/api/#authentication) in our API source. -->

---

## Scope

Scope defines the varying levels of access a client has to a set of Chec API resources or operations performed on the resources. Scope provides a way to constrain and consider the granular access a client might need. We define our scope using public and secret keys.

#### Public keys

###### To be used with Commerce.js's JavaScript SDK & any client-side code. Public APIs are limited by scope for this reason. Authenticating with the public key, you will have read and write access to the below resources.

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

The public key is to be used with requests that don't require any sensitive actions or data to be retrieved. The Commerce.js SDK includes all client side endpoints, so you can use them quickly and easily in your client-facing projects. An example would be to list your products from the `product` endpoint.

#### Secret keys

###### To be used with server side code. These API keys have the power to access sensitive data such as receipts and order data. Authenticating with the secret key will give you read and write access to the below resources.

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

The secret key can be used with requests that require sensitive actions or data to be retrieved as well as all client side requests. You'll use your secret key for these requests. The Commerce.js SDK does not include any of these endpoints for security reasons, so you'll need to write custom backend logic for handling these. An example of a sensitive request would be to make a call to [refund an order](https://commercejs.com/docs/api/?shell#refund-an-order).
<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Warning highlight block] The Commerce.js SDK does not include any of these endpoints for security reasons, so you'll need to write custom backend logic for handling these. -->
\
When you register for a Chec account, you'll be assigned two sets of these keys: live and sandbox. We highly recommend using your sandbox key until you're ready to deploy your new project live. Orders created with sandbox keys can easily be cleared from the Chec Dashboard, and will automatically use the "Test Gateway" for payment processing.

---

## Installation

#### Install the SDK with a package manager

If you're using npm or yarn, then adding the Commerce.js SDK to your project is real simple. Once you've created a directory for your project, navigate into your project's root folder in your terminal `cd your-project-folder`, and type the following:

```bash
npm install @chec/commerce.js
# or
yarn add @chec/commerce.js
```

#### Installing the SDK via our CDN

Another option would be to install the SDK via our CDN, you'll want to include this script tag in your point of entry file, for instance in your `index.html`.

```js
<script type="text/javascript" src="https://assets.chec-cdn.com/v2/commerce.js"></script>
```

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Info highlight block] We recommend installing Commerce.js as a package to reap the benefits of all the features included -->

We're almost ready to go! We just need to create a new Commerce instance and give it our public key (you can get your API keys from [Chec Dashboard > Settings > Developer](https://dashboard.chec.io/settings/developer).

```js
// Import the Commerce module
import Commerce from '@chec/commerce.js';

// Create a Commerce instance
const commerce = new Commerce('public_api_key');
```

Once your Commerce instance is created, you are now able to access the `commerce` object in your application.

---

## Console Debugger

We've built in a console debugger in Commerce.js to help you out with debugging during development. To enable the console debugger, add `true` as the second constructor argument when you create your Commerce instance.

```javascript
const commerce = new Commerce('public_api_key', true);
```
The console debugger only works when you are using a test API key, messages will not be shown if you are using a live API key.

<!-- TO-ADD WHEN HIGHLIGHT BLOCKS ARE AVAILABLE [CHEC-834]:
[Warning highlight block] The console debugger only works when you are using a test API key, messages will not be shown if you are using a live API key. -->

![Console debugger image](https://i.ibb.co/QQDGRkT/console-debugger.png)

---
