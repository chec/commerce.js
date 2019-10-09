/* global jest, describe, it, expect, beforeEach */

import Merchants from '../merchants';
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

describe('Merchants', () => {
  describe('about', () => {
    it('proxies the request method', () => {
      const merchants = new Merchants(mockCommerce);
      const returnValue = merchants.about();

      expect(requestMock).toHaveBeenLastCalledWith('merchants');
      expect(returnValue).toBe('return');
    });
  });
});
