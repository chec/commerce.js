var Commerce,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Commerce = (function() {
  "use strict";
  Commerce.prototype.options = {
    publicKey: '',
    auth: {},
    version: 'v1',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    debug: false,
    config: {}
  };

  function Commerce(publicKey, debug, config) {
    if (debug == null) {
      debug = false;
    }
    if (config == null) {
      config = {};
    }
    this.options = this.Merge(this.options, {
      publicKey: publicKey,
      debug: debug,
      config: config
    });
    this.Storage = new Commerce.Storage(this);
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
    this.Cart = new Commerce.Cart(this);
    this.Checkout = new Commerce.Checkout(this);
    this.Products = new Commerce.Products(this);
    this.Services = new Commerce.Services(this);
    this.Categories = new Commerce.Categories(this);
    this.Merchants = new Commerce.Merchants(this);
    if (debug) {
      this.Request('tools/console_debugger', 'GET', null, function(data) {
        return eval(data["eval"]);
      });
    }
  }

  Commerce.prototype.Merge = function(o1, o2) {
    var k, o3, v;
    o3 = {};
    for (k in o1) {
      v = o1[k];
      o3[k] = v;
    }
    for (k in o2) {
      v = o2[k];
      o3[k] = v;
    }
    return o3;
  };

  Commerce.prototype.Event = function(e) {
    var _e;
    _e = document.createEvent('CustomEvent');
    _e.initCustomEvent("Commercejs." + e, false, false, this);
    return window.dispatchEvent(_e);
  };

  Commerce.prototype.InArray = function(key, arr) {
    if (!arr || indexOf.call(arr, key) < 0) {
      return false;
    }
    return true;
  };

  Commerce.prototype.Serialize = function(obj, prefix) {
    var k, str, v;
    if (prefix == null) {
      prefix = null;
    }
    str = [];
    for (k in obj) {
      v = obj[k];
      k = prefix !== null ? prefix + '[' + k + ']' : k;
      str.push(typeof v === 'object' ? this.Serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
    return str.join('&');
  };

  Commerce.prototype.Error = function(response) {
    var msg, type;
    type = "[" + response.status_code + "] Type: " + response.error.type;
    msg = "" + response.error.message;
    return ChecConsoleHelper('error', type, msg, response);
  };

  Commerce.prototype.Ajax = function(options) {
    var args, e, error1, error2, k, ref, request, timeout, v;
    args = {
      method: 'GET',
      async: true,
      data: null,
      timeout: 60000,
      headers: {},
      host: this.options.url,
      port: this.options.url === "api.chec.io" ? 443 : 80,
      path: '/',
      success: function(response, status, request) {},
      error: function(response, status, request) {}
    };
    args = this.Merge(args, options);
    args.method = args.method.toUpperCase();
    try {
      request = new XMLHttpRequest();
    } catch (error1) {
      e = error1;
      try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (error2) {
        e = error2;
        return false;
      }
    }
    args.url = (args.port === 443 ? 'https://' : 'http://') + args.host + (args.path.substr(0, 1) !== '/' ? '/' + this.options.version + '/' + args.path : args.path);
    if (args.method === 'GET') {
      args.url += '?' + this.Serialize(args.data);
      args.data = null;
    } else {
      args.data = this.Serialize(args.data);
    }
    request.open(args.method, args.url, args.async);
    timeout = setTimeout((function(_this) {
      return function() {
        request.abort();
        return args.error(request, 408, 'Your request timed out');
      };
    })(this), args.timeout);
    ref = args.headers;
    for (k in ref) {
      v = ref[k];
      request.setRequestHeader(k, v);
    }
    request.onreadystatechange = function() {
      var response;
      if (request.readyState !== 4) {
        return null;
      }
      clearTimeout(timeout);
      response = JSON.parse(request.responseText);
      if (request.status.toString().charAt(0) !== '2') {
        return args.error(response, request.status, request);
      } else {
        return args.success(response, request.status, request);
      }
    };
    return request.send(args.data);
  };

  Commerce.prototype.Request = function(uri, method, data, callback, error) {
    var _data, _headers;
    if (method == null) {
      method = 'GET';
    }
    if (data == null) {
      data = null;
    }
    _data = {};
    _headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'X-Authorization': this.options.publicKey,
      'X-Chec-Agent': 'commerce.js/v1'
    };
    if (this.options.publicKey === null) {
      alert('Please enter your public api key');
    }
    if (!this.InArray(method, this.options.methods)) {
      if (typeof error === 'function') {
        error('error', 'Invalid request method (' + method + ')', 400);
      }
    }
    this.Ajax({
      method: method,
      path: uri,
      data: data,
      async: true,
      headers: _headers,
      success: (function(_this) {
        return function(r, c, e) {
          if (_this.options.debug === true && typeof r._console === 'object') {
            ChecConsoleHelper(r._console[0], r._console[1], r._console[2]);
          }
          if (typeof r._event === 'string') {
            _this.Event(r._event);
          }
          if (typeof callback === 'function') {
            return callback(r, typeof r.pagination !== 'undefined' ? r.pagination : null);
          } else {
            return r;
          }
        };
      })(this),
      error: (function(_this) {
        return function(r, c, e) {
          if (typeof error === 'function') {
            error(r);
          } else {
            if (_this.options.debug === true) {
              _this.Error(r);
            }
            if (typeof callback === 'function') {
              callback(r, typeof r.pagination !== 'undefined' ? r.pagination : null);
            } else {
              return r;
            }
          }
          return _data = r;
        };
      })(this)
    });
    if (typeof callback === 'undefined') {
      return _data.r;
    }
  };

  return Commerce;

})();

Commerce.Storage = (function() {
  function Storage(c1) {
    this.c = c1;
  }

  Storage.prototype.set = function(key, value, days) {
    var date, expires, path;
    date = void 0;
    expires = void 0;
    expires = '';
    if (typeof this.c.options.config.cookie_path === 'undefined') {
      path = '/';
    } else {
      path = this.c.options.config.cookie_path;
    }
    if (days) {
      date = new Date;
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    }
    return document.cookie = key + '=' + value + expires + '; path=' + path;
  };

  Storage.prototype.get = function(key) {
    var c, i, len, ref;
    key = key + "=";
    ref = document.cookie.split(';');
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(key) === 0) {
        return c.substring(key.length, c.length);
      }
    }
    return null;
  };

  Storage.prototype.remove = function(key) {
    return this.set(key, '', -1);
  };

  return Storage;

})();

Commerce.Cart = (function() {
  function Cart(c) {
    this.c = c;
    this.init();
  }

  Cart.prototype.init = function(id) {
    var cjs;
    if (id == null) {
      id = false;
    }
    cjs = this.c;
    if (!id && this.c.Storage.get('commercejs_cart_id') !== null) {
      return this.c.Request('carts/' + this.c.Storage.get('commercejs_cart_id'), 'GET', null, function(data) {
        cjs.Cart.cart_id = data.id;
        return cjs.Event('Cart.Ready');
      }, function(error) {
        return cjs.Cart.refresh();
      });
    } else {
      if (id) {
        return this.c.Request('carts/' + id, 'GET', null, function(data) {
          cjs.Storage.set('commercejs_cart_id', data.id, 30);
          cjs.Cart.cart_id = data.id;
          return cjs.Event('Cart.Ready');
        }, function(error) {
          return cjs.Cart.refresh();
        });
      } else {
        return this.refresh();
      }
    }
  };

  Cart.prototype.refresh = function() {
    var cjs;
    cjs = this.c;
    return this.c.Request('carts', 'GET', null, function(data) {
      cjs.Storage.set('commercejs_cart_id', data.id, 30);
      cjs.Cart.cart_id = data.id;
      return cjs.Event('Cart.Ready');
    });
  };

  Cart.prototype.id = function() {
    return this.cart_id;
  };

  Cart.prototype.add = function(data, callback, error) {
    return this.c.Request('carts/' + this.cart_id, 'POST', data, callback, error);
  };

  Cart.prototype.retrieve = function(callback, error) {
    return this.c.Request('carts/' + this.cart_id, 'GET', null, callback, error);
  };

  Cart.prototype.remove = function(line_id, callback, error) {
    return this.c.Request('carts/' + this.cart_id + '/items/' + line_id, 'DELETE', null, callback, error);
  };

  Cart.prototype["delete"] = function(callback, error) {
    return this.c.Request('carts/' + this.cart_id, 'DELETE', null, callback, error);
  };

  Cart.prototype.update = function(line_id, data, callback, error) {
    return this.c.Request('carts/' + this.cart_id + '/items/' + line_id, 'PUT', data, callback, error);
  };

  Cart.prototype.contents = function(callback, error) {
    return this.c.Request('carts/' + this.cart_id + '/items', 'GET', null, callback, error);
  };

  Cart.prototype.empty = function(callback, error) {
    return this.c.Request('carts/' + this.cart_id + '/items', 'DELETE', null, callback, error);
  };

  return Cart;

})();

Commerce.Categories = (function() {
  function Categories(c) {
    this.c = c;
  }

  Categories.prototype.list = function(params, callback, error) {
    if (typeof params === 'function') {
      return this.c.Request('categories', 'GET', null, params, callback);
    } else {
      return this.c.Request('categories', 'GET', params, callback, error);
    }
  };

  Categories.prototype.retrieve = function(slug, data, callback, error) {
    return this.c.Request('categories/' + slug, 'GET', data, callback, error);
  };

  return Categories;

})();

Commerce.Checkout = (function() {
  function Checkout(c) {
    this.c = c;
  }

  Checkout.prototype.protect = function(token) {
    return this.c.Request('checkouts/' + token + '/protect', 'GET', null, function(data) {
      return eval(data.sift_js);
    });
  };

  Checkout.prototype.generateToken = function(identifier, data, callback, error) {
    return this.c.Request('checkouts/' + identifier, 'GET', data, callback, error);
  };

  Checkout.prototype.capture = function(token, data, callback, error) {
    return this.c.Request('checkouts/' + token, 'POST', data, callback, error);
  };

  Checkout.prototype.checkPaypalStatus = function(token, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/paypal/payment', 'GET', null, callback, error);
  };

  Checkout.prototype.checkPaypalOrderCaptured = function(token, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/paypal/captured', 'GET', null, callback, error);
  };

  Checkout.prototype.receipt = function(token, callback, error) {
    return this.c.Request('checkouts/' + token + '/receipt', 'GET', null, callback, error);
  };

  Checkout.prototype.checkPayWhatYouWant = function(token, data, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/pay_what_you_want', 'GET', data, callback, error);
  };

  Checkout.prototype.fields = function(identifier, callback, error) {
    return this.c.Request('checkouts/' + identifier + '/fields', 'GET', null, callback, error);
  };

  Checkout.prototype.setTaxZone = function(identifier, data, callback, error) {
    return this.c.Request('checkouts/' + identifier + '/helper/set_tax_zone', 'GET', data, callback, error);
  };

  Checkout.prototype.getLocationFromIP = function(token, ip_address, callback, error) {
    if (ip_address === null) {
      ip_address = '';
    }
    if (typeof ip_address === 'function') {
      return this.c.Request('checkouts/' + token + '/helper/location_from_ip', 'GET', null, ip_address, error);
    } else {
      return this.c.Request('checkouts/' + token + '/helper/location_from_ip', 'GET', {
        'ip_address': ip_address
      }, callback, error);
    }
  };

  Checkout.prototype.isFree = function(token, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/is_free', 'GET', null, callback, error);
  };

  Checkout.prototype.checkVariant = function(token, line_item_id, data, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/' + line_item_id + '/variant', 'GET', data, callback, error);
  };

  Checkout.prototype.checkDiscount = function(token, data, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/discount', 'GET', data, callback, error);
  };

  Checkout.prototype.checkShippingOption = function(token, data, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/shipping', 'GET', data, callback, error);
  };

  Checkout.prototype.getShippingOptions = function(token, data, callback, error) {
    return this.c.Request('checkouts/' + token + '/helper/shipping_options', 'GET', data, callback, error);
  };

  Checkout.prototype.checkQuantity = function(token, line_item, data, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/' + line_item + '/quantity', 'GET', data, callback, error);
  };

  Checkout.prototype.helperValidation = function(token, callback, error) {
    return this.c.Request('checkouts/' + token + '/helper/validation', 'GET', null, callback, error);
  };

  Checkout.prototype.getLive = function(token, callback, error) {
    return this.c.Request('checkouts/' + token + '/live', 'GET', null, callback, error);
  };

  Checkout.prototype.getToken = function(token, callback, error) {
    return this.c.Request('checkouts/tokens/' + token, 'GET', null, callback, error);
  };

  Checkout.prototype.checkGiftcard = function(token, data, callback, error) {
    return this.c.Request('checkouts/' + token + '/check/giftcard', 'GET', data, callback, error);
  };

  return Checkout;

})();

Commerce.Merchants = (function() {
  function Merchants(c) {
    this.c = c;
  }

  Merchants.prototype.about = function(callback, error) {
    return this.c.Request('merchants', 'GET', null, callback, error);
  };

  return Merchants;

})();

Commerce.Products = (function() {
  function Products(c) {
    this.c = c;
  }

  Products.prototype.list = function(params, callback, error) {
    if (typeof params === 'function') {
      return this.c.Request('products', 'GET', null, params, callback);
    } else {
      return this.c.Request('products', 'GET', params, callback, error);
    }
  };

  Products.prototype.retrieve = function(permalink, data, callback, error) {
    return this.c.Request('products/' + permalink, 'GET', data, callback, error);
  };

  return Products;

})();

Commerce.Services = (function() {
  function Services(c) {
    this.c = c;
  }

  Services.prototype.localeListCountries = function(callback, error) {
    return this.c.Request('services/locale/countries', 'GET', null, callback, error);
  };

  Services.prototype.localeListShippingCountries = function(token, callback, error) {
    return this.c.Request('services/locale/' + token + '/countries', 'GET', null, callback, error);
  };

  Services.prototype.localeListShippingSubdivisions = function(token, country_code, callback, error) {
    return this.c.Request('services/locale/' + token + '/countries/' + country_code + '/subdivisions', 'GET', null, callback, error);
  };

  Services.prototype.localeListSubdivisions = function(country_code, callback, error) {
    return this.c.Request('services/locale/' + country_code + '/subdivisions', 'GET', {}, callback, error);
  };

  return Services;

})();

module.exports = Commerce;
