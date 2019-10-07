/* global jest, describe, it, expect, beforeEach */

import Products from '../products';
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
      request: requestMock
    };
  });

  mockCommerce = new Commerce('foo', true);

  // Used for API proxy methods
  mockCallback = jest.fn();
  mockErrorCallback = jest.fn();
});

describe('Products', () => {
  describe('list', () => {
    it('proxies the request method and lists using params as a callback', () => {
      const products = new Products(mockCommerce);
      const unusedErrorCallback = jest.fn();
      products.list(mockCallback, mockErrorCallback, unusedErrorCallback);

      expect(unusedErrorCallback).not.toHaveBeenCalled();
      expect(requestMock).toHaveBeenLastCalledWith(
        'products',
        'GET',
        null,
        mockCallback,
        mockErrorCallback
      );
    });

    it('proxies the request method and lists using params as an object', () => {
      const products = new Products(mockCommerce);
      products.list({ foo: 'bar' }, mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'products',
        'GET',
        { foo: 'bar' },
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('retrieve', () => {
    it('proxies the request method', () => {
      const products = new Products(mockCommerce);
      products.retrieve(
        'SKU-123',
        { foo: 'bar' },
        mockCallback,
        mockErrorCallback
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'products/SKU-123',
        'GET',
        { foo: 'bar' },
        mockCallback,
        mockErrorCallback
      );
    });
  });
});
