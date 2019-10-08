/* global jest, describe, it, expect, beforeEach */

import Services from '../services';
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

describe('Services', () => {
  describe('localeListCountries', () => {
    it('proxies the request method', () => {
      const services = new Services(mockCommerce);
      services.localeListCountries(mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'services/locale/countries',
        'GET',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('localeListShippingCountries', () => {
    it('proxies the request method', () => {
      const services = new Services(mockCommerce);
      services.localeListShippingCountries(
        'foo123',
        mockCallback,
        mockErrorCallback
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'services/locale/foo123/countries',
        'GET',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('localeListShippingSubdivisions', () => {
    it('proxies the request method', () => {
      const services = new Services(mockCommerce);
      services.localeListShippingSubdivisions(
        'foo123',
        'nz',
        mockCallback,
        mockErrorCallback
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'services/locale/foo123/countries/nz/subdivisions',
        'GET',
        null,
        mockCallback,
        mockErrorCallback
      );
    });
  });

  describe('localeListSubdivisions', () => {
    it('proxies the request method', () => {
      const services = new Services(mockCommerce);
      services.localeListSubdivisions('nz', mockCallback, mockErrorCallback);

      expect(requestMock).toHaveBeenLastCalledWith(
        'services/locale/nz/subdivisions',
        'GET',
        {},
        mockCallback,
        mockErrorCallback
      );
    });
  });
});
