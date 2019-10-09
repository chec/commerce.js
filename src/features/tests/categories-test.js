/* global jest, describe, it, expect, beforeEach */

import Categories from '../categories';
import Commerce from '../../commerce';

jest.mock('../../commerce');

let requestMock;
let mockCommerce;

beforeEach(() => {
  Commerce.mockClear();

  // Commerce mock internals
  requestMock = jest.fn();
  requestMock.mockReturnValue('return');

  Commerce.mockImplementation(() => {
    return {
      request: requestMock,
    };
  });

  mockCommerce = new Commerce('foo', true);
});

describe('Categories', () => {
  describe('list', () => {
    it('proxies the request method with data as params', () => {
      const categories = new Categories(mockCommerce);
      const returnValue = categories.list({ foo: 'bar' });

      expect(requestMock).toHaveBeenLastCalledWith('categories', 'get', {
        foo: 'bar',
      });
      expect(returnValue).toBe('return');
    });
  });

  describe('retrieve', () => {
    it('proxies the request method', () => {
      const categories = new Categories(mockCommerce);
      const returnValue = categories.retrieve('foo', { bar: 'baz' });

      expect(requestMock).toHaveBeenLastCalledWith('categories/foo', 'get', {
        bar: 'baz',
      });
      expect(returnValue).toBe('return');
    });
  });
});
