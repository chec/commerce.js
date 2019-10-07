/* global window */
import Storage from './storage';
import Features from './features';
import { consoleHelper, debuggerOnNotice } from './console';

class Commerce {
  constructor(publicKey, debug = false, config = {}) {
    if (debug == null) {
      debug = false;
    }

    if (config == null) {
      config = {};
    }

    this.options = this.merge(
      {
        publicKey: '',
        auth: {},
        version: 'v1',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        debug: false,
        config: {}
      },
      { publicKey, debug, config }
    );
    this.storage = new Storage(this);

    switch (window.location.hostname) {
      case 'checkout.chec.local':
        this.options.url = 'api.chec.local';
        break;
      case 'spaces.chec.local':
        this.options.url = 'api.chec.local';
        break;
      case 'stage.checkout.chec.io':
        this.options.url = 'stage.api.chec.io';
        break;
      case 'checkout.chec.io':
        this.options.url = 'api.chec.io';
        break;
      default:
        this.options.url = 'api.chec.io';
    }

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

  merge(o1, o2) {
    let k, v;
    const o3 = {};
    for (k in o1) {
      v = o1[k];
      o3[k] = v;
    }
    for (k in o2) {
      v = o2[k];
      o3[k] = v;
    }
    return o3;
  }

  event(e) {
    const _e = document.createEvent('CustomEvent');
    _e.initCustomEvent(`Commercejs.${e}`, false, false, this);
    return window.dispatchEvent(_e);
  }

  inArray(key, arr) {
    if (!arr || !Array.from(arr).includes(key)) {
      return false;
    }
    return true;
  }

  serialize(obj, prefix = null) {
    const str = [];

    for (let k in obj) {
      const v = obj[k];
      k = prefix !== null ? prefix + '[' + k + ']' : k;
      str.push(
        typeof v === 'object'
          ? this.serialize(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      );
    }

    return str.join('&');
  }

  error(response) {
    const type = `[${response.status_code}] Type: ${response.error.type}`;
    const msg = `${response.error.message}`;
    return this.consoleHelper('error', type, msg, response);
  }

  ajax(options) {
    let request;
    let args = {
      method: 'GET',
      async: true,
      data: null,
      timeout: 60000,
      headers: {},
      host: this.options.url,
      port: this.options.url === 'api.chec.io' ? 443 : 80,
      path: '/',
      success(response, status, request) {},
      error(response, status, request) {}
    };

    args = this.merge(args, options);
    args.method = args.method.toUpperCase();

    try {
      request = new XMLHttpRequest();
    } catch (e) {
      try {
        request = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (error) {
        e = error;
        return false;
      }
    }

    args.url =
      (args.port === 443 ? 'https://' : 'http://') +
      args.host +
      (args.path.substr(0, 1) !== '/'
        ? '/' + this.options.version + '/' + args.path
        : args.path);

    if (args.method === 'GET') {
      args.url += '?' + this.serialize(args.data);
      args.data = null;
    } else {
      args.data = this.serialize(args.data);
    }

    request.open(args.method, args.url, args.async);

    const timeout = setTimeout(() => {
      request.abort();
      return args.error(request, 408, 'Your request timed out');
    }, args.timeout);

    for (let k in args.headers) {
      const v = args.headers[k];
      request.setRequestHeader(k, v);
    }

    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return null;
      }

      clearTimeout(timeout);

      const response = JSON.parse(request.responseText);

      if (request.status.toString().charAt(0) !== '2') {
        return args.error(response, request.status, request);
      } else {
        return args.success(response, request.status, request);
      }
    };

    return request.send(args.data);
  }

  request(uri, method, data = null, callback, error) {
    if (method == null) {
      method = 'GET';
    }
    let _data = {};
    const _headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      'X-Authorization': this.options.publicKey,
      'X-Chec-Agent': 'commerce.js/v2'
    };

    if (this.options.publicKey === null) {
      alert('Please enter your public api key');
    }

    if (!this.inArray(method, this.options.methods)) {
      if (typeof error === 'function') {
        error('error', 'Invalid request method (' + method + ')', 400);
      }
    }

    this.ajax({
      method,
      path: uri,
      data,
      async: true,
      headers: _headers,
      success: (r, c, e) => {
        if (this.options.debug === true && typeof r._console === 'object') {
          return this.consoleHelper(
            r._console[0],
            r._console[1],
            r._console[2]
          );
        }

        if (typeof r._event === 'string') {
          this.event(r._event);
        }

        if (typeof callback === 'function') {
          return callback(
            r,
            typeof r.pagination !== 'undefined' ? r.pagination : null
          );
        }

        return r;
      },
      error: (r, c, e) => {
        if (typeof error === 'function') {
          error(r);
        } else {
          if (this.options.debug === true) {
            this.error(r);
          }

          if (typeof callback === 'function') {
            callback(
              r,
              typeof r.pagination !== 'undefined' ? r.pagination : null
            );
          } else {
            return r;
          }
        }
        return (_data = r);
      }
    });

    if (typeof callback === 'undefined') {
      return _data.r;
    }
  }
}

export default Commerce;
