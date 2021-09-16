/* global jest, describe, it, expect, beforeEach */

import Checkout from '../checkout';
import Commerce from '../../commerce';
import '@babel/polyfill';

jest.mock('../../commerce');

let requestMock;
let mockCommerce;
let mockCallback;
let mockErrorCallback;
let refreshCartMock;

beforeEach(() => {
  Commerce.mockClear();

  // Commerce mock internals
  refreshCartMock = jest.fn();
  requestMock = jest.fn();
  requestMock.mockReturnValue(Promise.resolve('return'));

  Commerce.mockImplementation(() => {
    return {
      cart: {
        refresh: refreshCartMock,
      },
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
    it('returns an empty promise', async () => {
      const checkout = new Checkout(mockCommerce);
      const result = await checkout.protect('foo');
      expect(result).toBeNull();
    });
  });

  describe('generateToken', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.generateToken('foo', { a: 'b' });

      expect(requestMock).toHaveBeenLastCalledWith('checkouts/foo', 'get', {
        a: 'b',
      });
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('generateTokenFrom', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.generateTokenFrom('cart', 'foo');

      expect(requestMock).toHaveBeenLastCalledWith('checkouts/foo', 'get', {
        type: 'cart',
      });
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('capture', () => {
    it('proxies the request method and refreshes the cart', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.capture(
        'foo123',
        { a: 'b' },
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith('checkouts/foo123', 'post', {
        a: 'b',
      });
      const result = await returnValue;
      expect(result).toBe('return');
      expect(refreshCartMock).toHaveBeenCalled();
    });
  });

  describe('receipt', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.receipt(
        'qw3rt1',
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith('checkouts/qw3rt1/receipt');
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('checkPayWhatYouWant', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.checkPayWhatYouWant('bar321', {
        foo: 'baz',
      });

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/bar321/check/pay_what_you_want',
        'get',
        { foo: 'baz' },
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('fields', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.fields(
        'foobar',
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith('checkouts/foobar/fields');
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('setTaxZone', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.setTaxZone('b1lly', { zone: 'Cuba' });

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/b1lly/helper/set_tax_zone',
        'get',
        {
          zone: 'Cuba',
        },
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('getLocationFromIP', () => {
    it('proxies the request method without a given IP', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.getLocationFromIP('b0b');

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/b0b/helper/location_from_ip',
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });

    it('proxies the request method using the provided IP address string', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.getLocationFromIP('b0b', '127.0.0.1');

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/b0b/helper/location_from_ip?ip_address=127.0.0.1',
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('isFree', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.isFree(
        'a1s2d3',
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/a1s2d3/check/is_free',
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('checkVariant', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.checkVariant('a1s2d3', 'h1', {
        hello: 'world',
      });

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/a1s2d3/check/h1/variant',
        'get',
        {
          hello: 'world',
        },
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('checkDiscount', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.checkDiscount('foo123', { code: 'A1D2' });

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/check/discount',
        'get',
        {
          code: 'A1D2',
        },
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('checkShippingOption', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.checkShippingOption('foo123', {
        method: 'A1D2',
      });

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/check/shipping',
        'get',
        {
          method: 'A1D2',
        },
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('getShippingOptions', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.getShippingOptions('foo123', { a: 'b' });

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/helper/shipping_options',
        'get',
        { a: 'b' },
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('checkQuantity', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.checkQuantity('foo123', 'bar234', {
        quantity: 25,
      });

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/check/bar234/quantity',
        'get',
        { quantity: 25 },
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('helperValidation', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.helperValidation(
        'foo123',
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo123/helper/validation',
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('getLive', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.getLive(
        'foo-123-bar',
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/foo-123-bar/live',
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });

  describe('getToken', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.getToken(
        'foo-123-bar',
        mockCallback,
        mockErrorCallback,
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/tokens/foo-123-bar',
      );
      returnValue.then(result => expect(result).toBe('return'));
    });
  });

  describe('checkGiftcard', () => {
    it('proxies the request method', async () => {
      const checkout = new Checkout(mockCommerce);
      const returnValue = checkout.checkGiftcard('xkcd', { card: 'BAR123' });

      expect(requestMock).toHaveBeenLastCalledWith(
        'checkouts/xkcd/check/giftcard',
        'get',
        {
          card: 'BAR123',
        },
      );
      const result = await returnValue;
      expect(result).toBe('return');
    });
  });
});
