/* global jest, describe, it, expect, beforeEach */

import Cart from '../cart';
import Commerce from '../../commerce';

jest.mock('../../commerce');

let requestMock;
let storageGetMock;

beforeEach(() => {
  Commerce.mockClear();

  requestMock = jest.fn();
  storageGetMock = jest.fn();

  Commerce.mockImplementation(() => {
    return {
      request: requestMock,
      storage: {
        get: storageGetMock,
      },
    };
  });
});

describe('Cart', () => {
  describe('init', () => {
    it('initializes a new ID when none is stored', () => {
      storageGetMock.mockReturnValue(null);

      const mockCommerce = new Commerce('foo', true);
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

      const mockCommerce = new Commerce('foo', true);
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
});
