<p align="center">
  <img src="https://raw.githubusercontent.com/chec/commercejs-examples/master/assets/logo.svg" width="380" height="100" />
</p>
<p align="center">
Fast, powerful, and easy to use JavaScript SDK for building and managing carts, checkouts and receipts.
Build custom eCommerce experiences to sell physical and digital products from the Chec API.
</p>

<p align="center">
  <img src="https://github.com/chec/commerce.js/actions/workflows/test.yml/badge.svg" />
  <a href="https://npmjs.org/package/@chec/commerce.js">
    <img src="https://img.shields.io/npm/v/@chec/commerce.js.svg" alt="Version" />
  </a>
  <a href="https://npmjs.org/package/@chec/commerce.js">
    <img src="https://img.shields.io/npm/dw/@chec/commerce.js.svg" alt="Downloads/week" />
  </a>
    <a href="https://github.com/chec/commerce.js/blob/master/package.json">
    <img src="https://img.shields.io/npm/l/@chec/commerce.js.svg" alt="License" />
  </a>
  <br>
  <a href="https://commercejs.com">commercejs.com</a> | <a href="https://twitter.com/commercejs">@commercejs</a> | <a href="http://slack.commercejs.com">Slack</a>
</p>


## Installation

### With NPM

`npm install @chec/commerce.js` or `yarn add @chec/commerce.js`

### TypeScript

You may also install our TypeScript definitions:

`npm install @types/chec__commerce.js` or `yarn add @types/chec__commerce.js`

Note that when using TypeScript, the definitions are always compliant with our latest version of the API. If you specify a custom API version, or your API
key uses an older version, you may get type errors.

## Documentation

See the [documentation webpage](https://commercejs.com/docs).

Our documentation module source code resides in `commerce.js/docs`

If you would like to make contributions to the Commerce.js documentation source, here is a [guide](https://github.com/chec/commerce.js/blob/master/CONTRIBUTING.md) in doing so.

## Configuration

The following configuration options are available to be defined as the third argument in the Commerce constructor:

* `disableStorage`: Whether to disable persistent storage (e.g. cookies). Enable for use in server-side environments. Default: false.
* `cartLifetime`: Number of days that a cart should be stored for (between 1 and 30). Default: 30.
* `timeoutMs`: The number of milliseconds before a request will time out. Default: 60000.
* `axiosConfig`: An optional object containing configuration options for axios, if used.
  * `headers`: A list of request headers. Defining headers here will override the defaults.
* `allowSecretKey`: Commerce.js will prevent you from using a secret API key for authorization. Use this option to override. Default: false.

## Upgrading

### Upgrading to 2.4.0

Commerce.js 2.4.0 only supports API version 2021-03-31 when adding products to a cart with variants. Please consider
updating your API version, using the changes listed in the [API docs](https://commercejs.com/docs/api/#versioning) as
a guide.

### Upgrading to 2.0.0

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
Check out the [contributing guide](CONTRIBUTING.md)

### Get help

Commerce.js is a project by [many contributors](https://github.com/chec/commerce.js/graphs/contributors). Reach us on [Slack](http://slack.commercejs.com) and [Twitter](https://twitter.com/commercejs).

### Compilation

The lib files are automatically compiled by our continuous integration pipeline. You only need to commit changes
to the `src` files.

### Running the tests

You can run the unit tests for this library from your command line using `npm run test`, or `npm run test:watch`
to watch for changed and re-run the tests automatically.

### Code style

We use the Airbnb JavaScript style guide, and Prettier as our linting tool. To lint your code, use `npm run lint`
or `npm run lint:fix` to automatically fix violations.
