/* global window */
import Storage from './storage';
import Features from './features';
import { consoleHelper, debuggerOnNotice } from './console';
import axios from 'axios';

class Commerce {
  constructor(publicKey, debug = false, config = {}) {
    this.options = {
      version: 'v1',
      url: 'https://api.chec.io/',
      ...config,
      publicKey: publicKey,
      debug: debug,
    };

    if (typeof publicKey !== 'string' || publicKey.length === 0) {
      console.warn('⚠️ Invalid public key given to Commerce.js client');
    }

    this.storage = new Storage(this);
    this.cart = new Features.Cart(this);
    this.checkout = new Features.Checkout(this);
    this.products = new Features.Products(this);
    this.services = new Features.Services(this);
    this.categories = new Features.Categories(this);
    this.merchants = new Features.Merchants(this);

    if (debug) {
      this.consoleHelper = consoleHelper;
      debuggerOnNotice();
    }
  }

  event(e) {
    const _e = document.createEvent('CustomEvent');
    _e.initCustomEvent(`Commercejs.${e}`, false, false, this);
    return window.dispatchEvent(_e);
  }

  error(response) {
    if (!this.consoleHelper) {
      return;
    }
    const type = `[${response.status_code}] Type: ${response.error.type}`;
    const msg = `${response.error.message}`;
    return this.consoleHelper('error', type, msg, response);
  }

  request(endpoint, method = 'get', data = null, returnFullResponse = false) {
    const headers = {
      'X-Authorization': this.options.publicKey,
      'X-Chec-Agent': 'commerce.js/v2',
    };

    const params =
      method === 'get' && data !== null && Object.entries(data).length
        ? data
        : null;
    const parsedData = method !== 'get' ? data : null;
    const timeout = this.options.timeoutMs || 60000;
    const axiosConfig = this.options.axiosConfig || {};

    const promise = axios({
      url: endpoint,
      method,
      baseURL: `${this.options.url}${this.options.version}/`,
      headers,
      params,
      data: parsedData,
      timeout,
      ...axiosConfig,
    });

    if (returnFullResponse) {
      return promise;
    }

    return promise.then(response => {
      if (response.status >= 200 && response.status < 300) {
        const { _event, ...otherData } = response.data;

        if (typeof _event === 'string') {
          this.event(_event);
        }
        return otherData;
      }

      // Reject the promise by throwing an error
      throw new Error(
        `Unsuccessful response (${response.status}: ${response.statusText}) received`,
      );
    });
  }
}

export default Commerce;
