# commerce.js

[![CircleCI](https://circleci.com/gh/chec/commerce.js/tree/master.svg?style=shield)](https://circleci.com/gh/chec/commerce.js/tree/master)
[![Codecov](https://codecov.io/gh/chec/commerce.js/branch/master/graph/badge.svg)](https://codecov.io/gh/chec/commerce.js)
[![Version](https://img.shields.io/npm/v/@chec.io/commerce.svg)](https://npmjs.org/package/@chec.io/commerce)
[![Downloads/week](https://img.shields.io/npm/dw/@chec.io/commerce.svg)](https://npmjs.org/package/@chec.io/commerce)
[![License](https://img.shields.io/npm/l/@chec.io/commerce.svg)](https://github.com/chec/commerce.js/blob/master/package.json)


## Not production ready!

---

Easy to use JavaScript SDK for managing carts and selling products from your chec.io store

https://commercejs.com

## Installation

### With NPM

`npm install @chec.io/commerce`

## Documentation

See the [documentation webpage](https://commercejs.com/docs).

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

## Contributing

### Running the tests

You can run the unit tests for this library from your command line using `npm run test`, or `npm run test:watch`
to watch for changed and re-run the tests automatically.

### Code style

We use the Airbnb JavaScript style guide, and Prettier as our linting tool. To lint your code, use `npm run lint`
or `npm run lint:fix` to automatically fix violations.
