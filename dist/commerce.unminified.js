window.ChecConsoleHelper = function(color, a, b, c) {
  var bgc, emoji, i, is_error, len, messages, results;
  bgc = void 0;
  emoji = void 0;
  i = void 0;
  is_error = void 0;
  len = void 0;
  messages = void 0;
  results = void 0;
  color = color || 'black';
  bgc = 'White';
  is_error = false;
  switch (color) {
    case 'success':
      color = '#488f5a';
      emoji = '✅ \ \ ';
      break;
    case 'info':
      color = 'DodgerBlue';
      emoji = '';
      break;
    case 'error':
      if (c.error.type === 'validation') {
        color = 'rgba(244, 67, 54, 1)';
        emoji = '🚫 Validation/Missing Fields';
        a = '';
      } else {
        color = 'rgba(244, 67, 54, 1)';
        emoji = '❌ HTTP ERROR ';
        bgc = 'rgba(244, 67, 54, 0.15)';
      }
      is_error = true;
      break;
    case 'warning':
      color = 'rgba(208, 154, 35, 1)';
      emoji = '⚠️ \ ';
  }
  if (is_error === true) {
    console.log('%c' + emoji + a, 'color:' + color + ';display:block; width: 100%;padding:2px 2px 2px 0px;font-family: Open Sans, Helvetica, Sans-serif;font-weight:bold;background-color:' + bgc + ';');
    if (typeof c.error.message === 'object') {
      messages = c.error.message;
      i = 0;
      len = messages.length;
      results = [];
      while (i < len) {
        console.log('%c' + messages[i].field + ' %c' + messages[i].error, 'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:800;', 'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;');
        results.push(i++);
      }
      return results;
    } else {
      return console.log('%c' + c.error.message, 'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;');
    }
  } else {
    if (typeof color === 'object') {
      console.log('%c' + a, 'color: PowderBlue;font-weight:bold;font-family: Open Sans, Helvetica, Sans-serif; background-color: RoyalBlue;');
      console.log(color);
    } else {
      console.log('%c' + emoji + a, 'color:' + color + ';display:block;font-family: Open Sans, Helvetica, Sans-serif;line-height:28px; width: 100%;padding:2px 2px 2px 0px;font-weight:bold;background-color:' + bgc + ';');
      if (b) {
        console.log('%c' + b, 'color:#515D6D;line-height:22px;font-weight:400; font-family: Open Sans, Helvetica, Sans-serif;');
      }
    }
  }
};

var Commerce,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Commerce = (function() {
  "use strict";
  Commerce.prototype.options = {
    publicKey: '',
    auth: {},
    version: 'v1',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    debug: false
  };

  function Commerce(publicKey, debug) {
    if (debug == null) {
      debug = false;
    }
    if (debug) {
      this.DebuggerIsLive();
    }
    this.options = this.Merge(this.options, {
      publicKey: publicKey,
      debug: debug
    });
    this.Storage = new Commerce.Storage;
    switch (window.location.hostname) {
      case 'checkout.chec.dev':
        this.options.url = 'api.chec.dev';
        break;
      case 'spaces.chec.dev':
        this.options.url = 'api.chec.dev';
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
  }

  Commerce.prototype.DebuggerIsLive = function() {
    var ascii;
    ascii = "\r\n \r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ Che\ \ \ \ \ \ \ \ \ EcC\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c....c2\ \ \ \ 2c....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c........c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c............c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c....................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ c........................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ c............................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ c.......:E2\ \ 2c..................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ c........h\ \ $$\ \ \ 2c..................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ c.........:C\ \ $cc$\ \ E....................c2\ \ \ 2c.....:C\r\n \ \ \ \ c............h\ \ \ \ $$\ \ c......................c2\ \ \ 2c.....:C\r\n \ \ c...............:E\ \ \ \ E:.........................c2\ \ \ 2c.....:C\r\n \ \ E............................:C\ c..................h2\ \ \ 2c...:C\r\n \ \ \ \ E........................:C\ \ \ \ \ \c..................h2\ \ \ 2hC\r\n \ \ \ \ \ \ E....................:C\ \ \ \ \ \ \ \ \ c..................h2\r\n \ \ \ \ \ \ \ \ E................:C\ \ \ \ \ \ \ \ \ \ \ \ \ c................:C\r\n \ \ \ \ \ \ \ \ \ \ E............:C\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c............:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ E........:C\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c........:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ E....:C\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ EcC\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ EcC\r\n \r\n\ \r\n \r\n";
    console.log("%c" + ascii, "font-family: 'Courier New', Courier, monospace; color: #788ba4; font-weight:bold; font-size: 11px;");
    console.log("%cCommerce.js console debugger is on! \ 🎉", "text-align:center; display:block; font-family: 'Open Sans', Helvetica, Sans-serif; color: #488f5a; line-height:28px; font-size: 14px");
    return console.log("%c💬 \ \ Need some help? Join our Slack channel - https://chec-commercejs-community.herokuapp.com \r\n", "text-align:center; display:block; font-family: 'Open Sans', Helvetica, Sans-serif; color: #515D6D; line-height:20px; font-size: 12px");
  };

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
    return window.dispatchEvent(new CustomEvent("Commercejs." + e));
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
  function Storage() {}

  Storage.prototype.set = function(key, value, days) {
    var date, expires;
    date = void 0;
    expires = void 0;
    expires = '';
    if (days) {
      date = new Date;
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    }
    return document.cookie = key + '=' + value + expires + '; path=/';
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
      return this.c.Request('cart/' + this.c.Storage.get('commercejs_cart_id'), 'GET', null, function(data) {
        cjs.Cart.cart_id = data.id;
        return cjs.Event('Cart.Ready');
      }, function(error) {
        return cjs.Cart.refresh();
      });
    } else {
      if (id) {
        return this.c.Request('cart/' + id, 'GET', null, function(data) {
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

  Cart.prototype.refresh = function(callback, error) {
    var cjs;
    cjs = this.c;
    return this.c.Request('cart', 'GET', null, function(data) {
      cjs.Storage.set('commercejs_cart_id', data.id, 30);
      cjs.Cart.cart_id = data.id;
      return cjs.Event('Cart.Ready');
    });
  };

  Cart.prototype.id = function() {
    return this.cart_id;
  };

  Cart.prototype.add = function(data, callback, error) {
    return this.c.Request('cart/' + this.cart_id, 'POST', data, callback, error);
  };

  Cart.prototype.contents = function(callback, error) {
    return this.c.Request('cart/' + this.cart_id, 'GET', null, callback, error);
  };

  Cart.prototype.remove = function(line_id, callback, error) {
    return this.c.Request('cart/' + this.cart_id + '/item/' + line_id, 'DELETE', null, callback, error);
  };

  Cart.prototype.update = function(line_id, data, callback, error) {
    return this.c.Request('cart/' + this.cart_id + '/item/' + line_id, 'PUT', data, callback, error);
  };

  return Cart;

})();

Commerce.Checkout = (function() {
  function Checkout(c) {
    this.c = c;
  }

  Checkout.prototype.protect = function(token) {
    return this.c.Request('checkout/' + token + '/protect', 'GET', null, function(data) {
      return eval(data.sift_js);
    });
  };

  Checkout.prototype.generateToken = function(identifier, identifier_type, callback, error) {
    return this.c.Request('checkout/' + identifier, 'GET', {
      'type': identifier_type
    }, callback, error);
  };

  Checkout.prototype.capture = function(token, data, callback, error) {
    return this.c.Request('checkout/' + token, 'POST', data, callback, error);
  };

  Checkout.prototype.checkPaypalStatus = function(token, callback, error) {
    return this.c.Request('checkout/' + token + '/check/paypal/payment', 'GET', {}, callback, error);
  };

  Checkout.prototype.checkPaypalOrderCaptured = function(token, callback, error) {
    return this.c.Request('checkout/' + token + '/check/paypal/captured', 'GET', {}, callback, error);
  };

  Checkout.prototype.receipt = function(token, callback, error) {
    return this.c.Request('checkout/' + token + '/receipt', 'GET', {}, callback, error);
  };

  Checkout.prototype.checkPayWhatYouWant = function(token, customer_set_price, callback, error) {
    return this.c.Request('checkout/' + token + '/check/pay_what_you_want', 'GET', {
      'customer_set_price': customer_set_price
    }, callback, error);
  };

  Checkout.prototype.fields = function(identifier, callback, error) {
    return this.c.Request('checkout/' + identifier + '/fields', 'GET', null, callback, error);
  };

  Checkout.prototype.setTaxZone = function(identifier, location, callback, error) {
    var country, ip_address, postal_zip_code, region;
    country = void 0;
    ip_address = void 0;
    postal_zip_code = void 0;
    region = void 0;
    ip_address = typeof location.ip_address !== 'undefined' ? location.ip_address : '';
    country = typeof location.country !== 'undefined' ? location.country : '';
    region = typeof location.region !== 'undefined' ? location.region : '';
    postal_zip_code = typeof location.postal_zip_code !== 'undefined' ? location.postal_zip_code : '';
    return this.c.Request('checkout/' + identifier + '/helper/set_tax_zone', 'GET', {
      'ip_address': ip_address,
      'country': country,
      'region': region,
      'postal_zip_code': postal_zip_code
    }, callback, error);
  };

  Checkout.prototype.getLocationFromIP = function(token, ip_address, callback, error) {
    if (ip_address === null) {
      ip_address = '';
    }
    if (typeof ip_address === 'function') {
      return this.c.Request('checkout/' + token + '/helper/location_from_ip', 'GET', null, ip_address, error);
    } else {
      return this.c.Request('checkout/' + token + '/helper/location_from_ip', 'GET', {
        'ip_address': ip_address
      }, callback, error);
    }
  };

  Checkout.prototype.isFree = function(token, callback, error) {
    return this.c.Request('checkout/' + token + '/check/is_free', 'GET', null, callback, error);
  };

  Checkout.prototype.checkVariant = function(token, line_item_id, variant_id, option_id, callback, error) {
    return this.c.Request('checkout/' + token + '/check/' + line_item_id + '/variant', 'GET', {
      'variant_id': variant_id,
      'option_id': option_id
    }, callback, error);
  };

  Checkout.prototype.checkDiscount = function(token, code, callback, error) {
    return this.c.Request('checkout/' + token + '/check/discount', 'GET', {
      'code': code
    }, callback, error);
  };

  Checkout.prototype.checkShippingOption = function(token, shipping_country, id, callback, error) {
    return this.c.Request('checkout/' + token + '/check/shipping', 'GET', {
      'country': shipping_country,
      'id': id
    }, callback, error);
  };

  Checkout.prototype.getShippingOptions = function(token, shipping_country, callback, error) {
    return this.c.Request('checkout/' + token + '/helper/shipping_options', 'GET', {
      'country': shipping_country
    }, callback, error);
  };

  Checkout.prototype.checkQuantity = function(token, line_item, amount, callback, error) {
    return this.c.Request('checkout/' + token + '/check/' + line_item + '/quantity', 'GET', {
      'amount': amount
    }, callback, error);
  };

  Checkout.prototype.helperValidation = function(token, callback, error) {
    return this.c.Request('checkout/' + token + '/helper/validation', 'GET', null, callback, error);
  };

  Checkout.prototype.getLive = function(token, callback, error) {
    return this.c.Request('checkout/' + token + '/live', 'GET', null, callback, error);
  };

  return Checkout;

})();

Commerce.Products = (function() {
  function Products(c) {
    this.c = c;
  }

  Products.prototype.list = function(callback, error) {
    return this.c.Request('products', 'GET', null, callback, error);
  };

  Products.prototype.retrieve = function(permalink, identifier_type, callback, error) {
    return this.c.Request('products/' + permalink, 'GET', {
      'type': identifier_type
    }, callback, error);
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

  Services.prototype.localeListSubdivisions = function(country_code, callback, error) {
    return this.c.Request('services/locale/' + country_code + '/subdivisions', 'GET', {}, callback, error);
  };

  return Services;

})();
