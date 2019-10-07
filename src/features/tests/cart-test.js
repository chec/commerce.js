/* global jest, describe, it, expect, beforeEach */

import Cart from '../cart';
import Commerce from '../../commerce';

jest.mock('../../commerce');

let eventMock;
let requestMock;
let storageGetMock;
let storageSetMock;
let mockCommerce;
let mockCallback;
let mockErrorCallback;

beforeEach(() => {
  Commerce.mockClear();

  // Commerce mock internals
  requestMock = jest
    .fn()
    .mockImplementation((endpoint, method, data, callback) =>
      callback({
        id: '12345'
      })
    );
  eventMock = jest.fn();
  storageGetMock = jest.fn();
  storageSetMock = jest.fn();

  Commerce.mockImplementation(() => {
    return {
      cart: {
        cart_id: null
      },
      event: eventMock,
      request: requestMock,
      storage: {
        get: storageGetMock,
        set: storageSetMock
      }
    };
  });

  mockCommerce = new Commerce('foo', true);

  // Used for API proxy methods
  mockCallback = jest.fn();
  mockErrorCallback = jest.fn();
});

describe('Cart', () => {
  describe('init', () => {
    it('initializes a new ID when none is stored', () => {
      storageGetMock.mockReturnValue(null);

      new Cart(mockCommerce);

      expect(mockCommerce.storage.get).toHaveBeenCalled();
      // Ensure that `Cart.refresh()` was called
      expect(mockCommerce.request).toHaveBeenCalledWith(
        'carts',
        'GET',
        null,
        expect.any(Function)
      );
    });

    it('initializes from the stored ID', () => {
      storageGetMock.mockReturnValue('123');

      new Cart(mockCommerce);

      expect(mockCommerce.storage.get).toHaveBeenCalled();
      expect(mockCommerce.request).toHaveBeenCalledWith(
        'carts/123',
        'GET',
        null,
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  describe('refresh', () => {
    it('sets the card ID and fires a ready event', () => {
      const cart = new Cart(mockCommerce);
      cart.refresh();

      expect(storageSetMock).toHaveBeenCalledWith(
        'commercejs_cart_id',
        '12345',
        30
      );
      expect(eventMock).toHaveBeenCalledWith('Cart.Ready');
    });
  });

  describe('id', () => {
    it('returns the cart ID', () => {
      const cart = new Cart(mockCommerce);

      expect(cart.id()).toBe('12345');
    });
  });

  describe('add', () => {
    it('proxies the request method', () => {
      const cart = new Cart(mockCommerce);
      const data = { foo: 'bar' };
      cart.add(data, mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'carts/12345',
        'POST',
        data,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('retrieve', () => {
    it('proxies the request method', () => {
      const cart = new Cart(mockCommerce);
      cart.retrieve(mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'carts/12345',
        'GET',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('remove', () => {
    it('proxies the request method', () => {
      const cart = new Cart(mockCommerce);
      const lineId = '98765';
      cart.remove(lineId, mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'carts/12345/items/98765',
        'DELETE',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('delete', () => {
    it('proxies the request method', () => {
      const cart = new Cart(mockCommerce);
      cart.delete(mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'carts/12345',
        'DELETE',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('update', () => {
    it('proxies the request method', () => {
      const cart = new Cart(mockCommerce);
      const lineId = '98765';
      const data = { foo: 'bar' };
      cart.update(lineId, data, mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'carts/12345/items/98765',
        'PUT',
        data,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('contents', () => {
    it('proxies the request method', () => {
      const cart = new Cart(mockCommerce);
      cart.contents(mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'carts/12345/items',
        'GET',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('empty', () => {
    it('proxies the request method', () => {
      const cart = new Cart(mockCommerce);
      cart.empty(mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'carts/12345/items',
        'DELETE',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });
});
