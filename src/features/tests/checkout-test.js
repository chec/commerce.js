/* global jest, describe, it, expect, beforeEach */

import Checkout from '../checkout';
import Commerce from '../../commerce';

jest.mock('../../commerce');

let requestMock;
let mockCommerce;
let mockCallback;
let mockErrorCallback;

beforeEach(() => {
  Commerce.mockClear();

  // Commerce mock internals
  requestMock = jest.fn();

  Commerce.mockImplementation(() => {
    return {
      request: requestMock,
    };
  });

  mockCommerce = new Commerce('foo', true);

  // Used for API proxy methods
  mockCallback = jest.fn();
  mockErrorCallback = jest.fn();
});

describe('Checkout', () => {
  describe('protect', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.protect('foo');

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo/protect',
        'GET',
        null,
        expect.any(Function),
      );
    });
  });

  describe('generateToken', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.generateToken(
        'foo',
        { a: 'b' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo',
        'GET',
        { a: 'b' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('capture', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.capture('foo123', { a: 'b' }, mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123',
        'POST',
        { a: 'b' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('checkPaypalStatus', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.checkPaypalStatus('abc123', mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/abc123/check/paypal/payment',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('checkPaypalOrderCaptured', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.checkPaypalOrderCaptured(
        'abc123',
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/abc123/check/paypal/captured',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('receipt', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.receipt('qw3rt1', mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/qw3rt1/receipt',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('checkPayWhatYouWant', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.checkPayWhatYouWant(
        'bar321',
        { foo: 'baz' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/bar321/check/pay_what_you_want',
        'GET',
        { foo: 'baz' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('fields', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.fields('foobar', mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foobar/fields',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('setTaxZone', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.setTaxZone(
        'b1lly',
        { zone: 'Cuba' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/b1lly/helper/set_tax_zone',
        'GET',
        { zone: 'Cuba' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('getLocationFromIP', () => {
    it('proxies the request method using the provided IP address method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.getLocationFromIP('b0b', mockCallback, null, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/b0b/helper/location_from_ip',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });

    it('proxies the request method using the provided IP address string', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.getLocationFromIP(
        'b0b',
        '127.0.0.1',
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/b0b/helper/location_from_ip',
        'GET',
        { ip_address: '127.0.0.1' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('isFree', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.isFree('a1s2d3', mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/a1s2d3/check/is_free',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('checkVariant', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.checkVariant(
        'a1s2d3',
        'h1',
        { hello: 'world' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/a1s2d3/check/h1/variant',
        'GET',
        { hello: 'world' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('checkDiscount', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.checkDiscount(
        'foo123',
        { code: 'A1D2' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/check/discount',
        'GET',
        { code: 'A1D2' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('checkShippingOption', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.checkShippingOption(
        'foo123',
        { method: 'A1D2' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/check/shipping',
        'GET',
        { method: 'A1D2' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('getShippingOptions', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.getShippingOptions(
        'foo123',
        { a: 'b' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/helper/shipping_options',
        'GET',
        { a: 'b' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('checkQuantity', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.checkQuantity(
        'foo123',
        'bar234',
        { quantity: 25 },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/check/bar234/quantity',
        'GET',
        { quantity: 25 },
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('helperValidation', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.helperValidation('foo123', mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/helper/validation',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('getLive', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.getLive('foo-123-bar', mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo-123-bar/live',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('getToken', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.getToken('foo-123-bar', mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/tokens/foo-123-bar',
        'GET',
        null,
        mockCallback,
        mockErrorCallback,
      );
    });
  });

  describe('checkGiftcard', () => {
    it('proxies the request method', () => {
      const checkout = new Checkout(mockCommerce);
      checkout.checkGiftcard(
        'xkcd',
        { card: 'BAR123' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/xkcd/check/giftcard',
        'GET',
        { card: 'BAR123' },
        mockCallback,
        mockErrorCallback,
      );
    });
  });
});
