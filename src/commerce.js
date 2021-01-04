/* global window */
import Storage from './storage';
import Features from './features';
import { consoleHelper, debuggerOnNotice } from './console';
import axios from 'axios';

const defaultEventCallback = e => {
  const _e = new CustomEvent(`Commercejs.${e}`, {
    bubbles: false,
    cancelable: false,
  });
  return window.dispatchEvent(_e);
};

class Commerce {
  constructor(publicKey, debug = false, config = {}) {
    this.options = {
      version: 'v1',
      url: 'https://api.chec.io/',
      eventCallback: defaultEventCallback,
      ...config,
      publicKey: publicKey,
      debug: debug,
    };

    if (typeof publicKey !== 'string' || publicKey.length === 0) {
      throw new Error('⚠️ Invalid public key given to Commerce.js client');
    }

    if (publicKey.toLowerCase().substring(0, 3) === 'sk_') {
      throw new Error(
        'Secret key provided. You must use a public key with Commerce.js!',
      );
    }

    this.storage = new Storage(this);
    this.cart = new Features.Cart(this);
    this.checkout = new Features.Checkout(this);
    this.customer = new Features.Customer(this);
    this.products = new Features.Products(this);
    this.services = new Features.Services(this);
    this.categories = new Features.Categories(this);
    this.merchants = new Features.Merchants(this);

    if (debug) {
      this.consoleHelper = consoleHelper;
      debuggerOnNotice();
    }
  }

  error(response) {
    if (!this.consoleHelper || !this.options.debug) {
      return;
    }
    const innerResponse = response.response;
    const type = `[${innerResponse.status}] Type: ${innerResponse.statusText}`;
    const msg =
      typeof innerResponse.data === 'string'
        ? innerResponse.data
        : innerResponse.statusText;
    return this.consoleHelper('error', type, msg, innerResponse.data);
  }

  request(
    endpoint,
    method = 'get',
    data = null,
    extraHeaders = {},
    returnFullResponse = false,
  ) {
    const headers = {
      'X-Authorization': this.options.publicKey,
      'X-Chec-Agent': 'commerce.js/v2',
      'Content-Type': 'application/json',
    };

    // Let axios serialize get request payloads as JSON
    const params = method === 'get' ? data : null;
    const requestBody = method === 'get' ? null : data;

    const timeout = this.options.timeoutMs || 60000;
    const axiosConfig = this.options.axiosConfig || {};

    let baseUrl = this.options.url;

    if (baseUrl.substring(baseUrl.length - 1) !== '/') {
      baseUrl += '/';
    }

    const promise = axios({
      url: endpoint,
      method,
      baseURL: `${baseUrl}${this.options.version}/`,
      params,
      data: requestBody,
      timeout,
      ...axiosConfig,
      headers: { ...headers, ...axiosConfig.headers, ...extraHeaders },
    });

    if (returnFullResponse) {
      return promise;
    }

    const { eventCallback } = this.options;
    return (
      promise
        .then(response => {
          // Feed the console debugger
          if (
            this.consoleHelper &&
            this.options.debug &&
            typeof response.data._console === 'object'
          ) {
            this.consoleHelper(...response.data._console);
          }

          // Handle the response
          if (
            typeof response.data !== 'object' ||
            Array.isArray(response.data)
          ) {
            return response.data;
          }
          const { _event, ...otherData } = response.data;

          if (
            typeof _event === 'string' &&
            typeof eventCallback === 'function'
          ) {
            eventCallback(_event);
          }

          return otherData;
        })
        // Run our own error handler, then wrap the promise rejection in our own error object
        .catch(error => {
          this.error(error);
          throw {
            message: `Unsuccessful response (${error.response.status}: ${error.response.statusText}) received`,
            statusCode: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            originalError: error,
          };
        })
    );
  }
}

export default Commerce;
