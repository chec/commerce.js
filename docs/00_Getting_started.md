---
title: Getting started
description: Get started with the Commerce.js SDK with a step-by-step guide
category: Getting started
position: 0
---

This documentation will walk you through how to:
- Set up a Chec account.
- Install Commerce.js into your project.
- Create a Commerce instance to use through your project.

---

## Account setup

Before installing Commerce.js, you will first need to create a Chec account to get your API credentials.
1. Sign up for a Chec account [here](https://dashboard.chec.io/signup).
2. Navigate to the developer section under settings [here](https://dashboard.chec.io/settings/developer).
3. Obtain your generated [public](/docs/sdk/concepts#public-keys) and [secret keys](/docs/sdk/concepts#secret-keys).

---

## Installation

### Prerequisites

The only requirement for using Commerce.js is to have Node.js (version 10 or higher) installed on your machine.

### Install the SDK with a package manager

If you're using npm or yarn, then adding the Commerce.js SDK to your project is really simple. Once you've created a
directory for your project, navigate into your project's root folder in your terminal `cd your-project-folder`, and type
the following:

```bash
npm install @chec/commerce.js
# or
yarn add @chec/commerce.js
```

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Note that examples provided using the Commerce.js SDK are using the latest version - available on <a href="https://www.npmjs.com/package/@chec/commerce.js">npm</a>.</p>
</div>


### Install Commerce.js with TypeScript definitions

If you're using TypeScript for your application, Commerce.js has public typings added which you can easily install with
the Commerce.js library.

```bash
npm install @chec/commerce.js @types/chec__commerce.js
# or
yarn add @chec/commerce.js @types/chec__commerce.js
```

<div class="highlight highlight--note">
    <span>Note</span>
    <p>Note that when using TypeScript, the definitions are always compliant with our latest version of the API. If you specify a custom API version, or your API
key uses an older version, you may get type errors.</p>
</div>

### Instantiate Commerce with your API key

We're almost ready to go! We need to create a new Commerce instance and give it our [public
key](/docs/sdk/concepts#scope) (you can get your API keys from [Chec Dashboard > Settings >
Developer](https://dashboard.chec.io/settings/developer)).

<div class="highlight highlight--info">
    <span>Tip</span>
    <p>For more information on API keys authentication, read more on <a href="/docs/sdk/concepts#authentication">how we authenticate Chec's core endpoints</a>.</p>
</div>

```js
// Import the Commerce module
import Commerce from '@chec/commerce.js';

// Create a Commerce instance
const commerce = new Commerce('{public_api_key}');
```

<div class="highlight highlight--note">
    <span>Note</span>
    <p>We've built in a console debugger into the Commerce.js SDK to help with debugging during development. To enable the debugger you can include the second argument <code>true</code> when you create your Commerce instance like so: <code>const commerce = new Commerce('{public_api_key}', true);</code>. Note that a test API key has to be provided as the first argument for the console to show messages - it won't work with a live key.</p>
</div>

Awesome, you have set up your Chec account, installed the Commerce.js SDK and created your first Commerce instance! You
now have access to the `Commerce` object in your application to build out a truly unique frontend presentation layer!

---

### Next steps

Browse through the rest of our documentation to explore all the features of Commerce.js - [listing
products](/docs/sdk/products#list-products), [add products to cart](/docs/sdk/cart#add-to-cart), or [capture an
order](/docs/sdk/checkout#capture-order). Note that all requests made using the Commerce.js SDK will have responses that
are returned asynchronously in a promise. Alternatively, if you want to dive more into reading a high-level overview of
Commerce.js and its features, read more [here](/product/features).


<div class="highlight highlight--warn">
    <span>Important</span>
    <p>Please note that for all the following SDK documentation on  <b>Products</b>, <b>Cart</b>, and <b>Checkout</b>, we import <code>Commerce</code> in every example using Commerce.js for the sake of brevity. In practice, you would follow the example of creating and exporting out your Commerce client in a file such as <code>/lib/commerce.js</code>.</p>
</div>

---
