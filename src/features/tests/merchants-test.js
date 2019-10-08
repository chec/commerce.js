/* global jest, describe, it, expect, beforeEach */

import Merchants from '../merchants';
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

describe('Merchants', () => {
  describe('about', () => {
    it('proxies the request method', () => {
      const merchants = new Merchants(mockCommerce);
      merchants.about(mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'merchants',
        'GET',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });
});
