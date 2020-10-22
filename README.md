<p align="center">
  <img src="https://raw.githubusercontent.com/chec/commercejs-examples/master/assets/logo.svg" width="380" height="100" />
</p>
<p align="center">
An easy to use JavaScript SDK for building and managing carts, checkouts and receipts. 
Build custom eCommerce experiences to sell physical and digital products from the Chec API.
</p>

<p align="center">
  <a href="https://circleci.com/gh/chec/commerce.js/tree/master">
    <img src="https://circleci.com/gh/chec/commerce.js/tree/master.svg?style=shield" alt="CircleCI" />
  </a>
  <a href="https://codecov.io/gh/chec/commerce.js">
    <img src="https://codecov.io/gh/chec/commerce.js/branch/master/graph/badge.svg" alt="Codecov" />
  </a>
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
Contributions are always welcome! Please check out the [contributing guide](CONTRIBUTING.md)

### Get Help

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

## License
```groovy
Copyright (c) 2020 Chec Platform LLC, All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```
