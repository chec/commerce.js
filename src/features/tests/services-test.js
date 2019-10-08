/* global jest, describe, it, expect, beforeEach */

import Services from '../services';
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

describe('Services', () => {
  describe('localeListCountries', () => {
    it('proxies the request method', () => {
      const services = new Services(mockCommerce);
      const returnValue = services.localeListCountries();

      expect(requestMock).toHaveBeenLastCalledWith('services/locale/countries');
      expect(returnValue).toBe('return');
    });
  });

  describe('localeListShippingCountries', () => {
    it('proxies the request method', () => {
      const services = new Services(mockCommerce);
      const returnValue = services.localeListShippingCountries('foo123');

      expect(requestMock).toHaveBeenLastCalledWith(
        'services/locale/foo123/countries',
      );
      expect(returnValue).toBe('return');
    });
  });

  describe('localeListShippingSubdivisions', () => {
    it('proxies the request method', () => {
      const services = new Services(mockCommerce);
      const returnValue = services.localeListShippingSubdivisions(
        'foo123',
        'nz',
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'services/locale/foo123/countries/nz/subdivisions',
      );
      expect(returnValue).toBe('return');
    });
  });

  describe('localeListSubdivisions', () => {
    it('proxies the request method', () => {
      const services = new Services(mockCommerce);
      const returnValue = services.localeListSubdivisions('nz');

      expect(requestMock).toHaveBeenLastCalledWith(
        'services/locale/nz/subdivisions',
      );
      expect(returnValue).toBe('return');
    });
  });
});
