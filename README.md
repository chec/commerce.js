# commerce.js

[![CircleCI](https://circleci.com/gh/chec/commerce.js/tree/master.svg?style=shield)](https://circleci.com/gh/chec/commerce.js/tree/master)
[![Codecov](https://codecov.io/gh/chec/commerce.js/branch/master/graph/badge.svg)](https://codecov.io/gh/chec/commerce.js)
[![Version](https://img.shields.io/npm/v/@chec/commerce.js.svg)](https://npmjs.org/package/@chec/commerce.js)
[![Downloads/week](https://img.shields.io/npm/dw/@chec/commerce.js.svg)](https://npmjs.org/package/@chec/commerce.js)
[![License](https://img.shields.io/npm/l/@chec/commerce.js.svg)](https://github.com/chec/commerce.js/blob/master/package.json)

An easy to use JavaScript SDK for building and managing carts, checkouts and receipts. Build custom eCommerce experiences to sell physical and digital products from the Chec API.

https://commercejs.com

## Installation

### With NPM

`npm install @chec/commerce.js`

## Documentation

See the [documentation webpage](https://commercejs.com/docs).

Our documentation module source code resides in `commerce.js/docs`

If you would like to make contributions to the Commerce.js documentation source, here is a [guide](https://github.com/chec/commerce.js/blob/master/CONTRIBUTING.md) in doing so.

## Upgrading

The major change in Commerce.js v2 is that most methods now return a
[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that is fulfilled
when the HTTP request is completed. Instead of providing callbacks to the methods in this module, you will have to use
promise syntax instead.

```diff
- Commerce.Cart.retrieve(function (data) {
+ Commerce.cart.retrieve().then(function (data) {
  // ...
});
```

Additionally, the API for the various features are now lower-cased.

The `cart.add()` method now separates its arguments:

```diff
- Commerce.Cart.add({ productId: 1, quantity: 2, variant: { foo: 'bar'} })
+ Commerce.cart.add(1, 2, {foo: 'bar'})
```

## Contributing

### Compilation

The lib files are automatically compiled by our continuous integration pipeline. You only need to commit changes
to the `src` files.

### Running the tests

You can run the unit tests for this library from your command line using `npm run test`, or `npm run test:watch`
To watch for changed and re-run the tests automatically.

### Code style

We use the Airbnb JavaScript style guide, and Prettier as our linting tool. To lint your code, use `npm run lint`
or `npm run lint:fix` to automatically fix violations.

