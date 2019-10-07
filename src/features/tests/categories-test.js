/* global jest, describe, it, expect, beforeEach */

import Categories from '../categories';
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

describe('Categories', () => {
  describe('list', () => {
    it('proxies the request method with callable params', () => {
      const categories = new Categories(mockCommerce);
      categories.list(mockCallback, mockErrorCallback, null);

      expect(requestMock).toHaveBeenLastCalledWith(
        'categories',
        'GET',
        null,
        mockCallback,
        mockErrorCallback
      );
    });

    it('proxies the request method with data as params', () => {
      const categories = new Categories(mockCommerce);
      categories.list({ foo: 'bar' }, mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'categories',
        'GET',
        { foo: 'bar' },
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('retrieve', () => {
    it('proxies the request method', () => {
      const categories = new Categories(mockCommerce);
      categories.retrieve(
        'foo',
        { bar: 'baz' },
        mockCallback,
        mockErrorCallback
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'categories/foo',
        'GET',
        { bar: 'baz' },
        mockCallback,
        mockErrorCallback
      );
    });
  });
});
