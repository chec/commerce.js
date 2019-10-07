/* global jest, describe, it, expect, beforeEach */

import Cart from '../cart';
import Commerce from '../../commerce';

jest.mock('../../commerce');

let eventMock;
let requestMock;
let storageGetMock;
let storageSetMock;
let mockCommerce;

beforeEach(() => {
  Commerce.mockClear();

  requestMock = jest.fn().mockImplementation(
    (endpoint, method, data, callback) => callback({
      id: '12345',
    })
  );
  eventMock = jest.fn();
  storageGetMock = jest.fn();
  storageSetMock = jest.fn();

  Commerce.mockImplementation(() => {
    return {
      cart: {
        cart_id: null,
      },
      event: eventMock,
      request: requestMock,
      storage: {
        get: storageGetMock,
        set: storageSetMock,
      },
    };
  });

  mockCommerce = new Commerce('foo', true);
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

      expect(storageSetMock).toHaveBeenCalledWith('commercejs_cart_id', '12345', 30);
      expect(eventMock).toHaveBeenCalledWith('Cart.Ready');
    });
  });
});
