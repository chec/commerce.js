/* global jest, describe, it, expect, beforeEach */

import Customer from '../customer';
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

describe('Customer', () => {
  describe('list', () => {
    it('proxies the request method with data as params', () => {
      const customer = new Customer(mockCommerce);
      const returnValue = customer.login(
        'foo@example.com',
        'http://localhost/login/{token}',
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/email-token',
        'post',
        {
          email: 'foo@example.com',
          base_url: 'http://localhost/login/{token}',
        },
      );
      expect(returnValue).toBe('return');
    });
  });

  describe('about', () => {
    it('proxies the request method', () => {
      const customer = new Customer(mockCommerce);
      customer.data.id = 'cstmr_QWERTY';
      customer.data.token = 'ABC-123-ZYX-234';
      customer.about();

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_QWERTY',
        'get',
        {},
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });

    it('accepts ID and token arguments', () => {
      const customer = new Customer(mockCommerce);
      customer.about('cstmr_ABC123', 'BCD-234-CBD-345');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_ABC123',
        'get',
        {},
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer BCD-234-CBD-345',
        },
      );
    });
  });

  describe('getToken', () => {
    it('proxies the request method', () => {
      requestMock.mockReturnValue(Promise.resolve({}));
      const customer = new Customer(mockCommerce);
      customer.getToken('ABC-123-ZYX-234');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/exchange-token',
        'post',
        { token: 'ABC-123-ZYX-234' },
      );
    });
  });

  describe('update', () => {
    it('proxies the request method', async () => {
      const customer = new Customer(mockCommerce);
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@test.com',
      };
      const returnValue = customer.update(
        data,
        'cstmr_FOO123',
        'ABC-123-ZYX-234',
      );

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_FOO123',
        'PUT',
        {
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@test.com',
        },
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );

      const result = await returnValue;
      expect(result).toBe('return');
    });

    it('throws error when customer is not logged in and no customer ID was provided', () => {
      const customer = new Customer(mockCommerce);
      expect(() => {
        customer.update();
      }).toThrow(
        'A customer ID must be provided when customer is not logged in',
      );
    });

    it('throws error when customer is not logged in and no token was provided', () => {
      const customer = new Customer(mockCommerce);
      expect(() => {
        customer.update({}, 'cstmr_FOO123');
      }).toThrow(
        'A customer access token must be provided when customer is not logged in',
      );
    });

    it('gathers customer ID from session if not provided', () => {
      const customer = new Customer(mockCommerce);
      customer.data.id = 'cstmr_QWERTY';
      customer.update({}, null, 'ABC-123-ZYX-234');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_QWERTY',
        'PUT',
        {},
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });

    it('gathers customer token from session if not provided', () => {
      const customer = new Customer(mockCommerce);
      customer.data.token = 'ABC-123-ZYX-234';
      customer.update({}, 'cstmr_QWERTY');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_QWERTY',
        'PUT',
        {},
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });
  });

  describe('getOrders', () => {
    it('proxies the request method', () => {
      const customer = new Customer(mockCommerce);
      customer.getOrders('cstmr_FOO123', 'ABC-123-ZYX-234', {
        sortBy: 'created',
        sortDirection: 'desc',
      });

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_FOO123/orders',
        'get',
        {
          sortBy: 'created',
          sortDirection: 'desc',
        },
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });

    it('throws error when customer is not logged in and no customer ID was provided', () => {
      const customer = new Customer(mockCommerce);
      expect(() => {
        customer.getOrders();
      }).toThrow(
        'A customer ID must be provided when customer is not logged in',
      );
    });

    it('throws error when customer is not logged in and no token was provided', () => {
      const customer = new Customer(mockCommerce);
      expect(() => {
        customer.getOrders('cstmr_FOO123');
      }).toThrow(
        'A customer access token must be provided when customer is not logged in',
      );
    });

    it('gathers customer ID from session if not provided', () => {
      const customer = new Customer(mockCommerce);
      customer.data.id = 'cstmr_QWERTY';
      customer.getOrders(null, 'ABC-123-ZYX-234');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_QWERTY/orders',
        'get',
        {
          sortBy: 'created_at',
          sortDirection: 'desc',
        },
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });

    it('gathers customer token from session if not provided', () => {
      const customer = new Customer(mockCommerce);
      customer.data.token = 'ABC-123-ZYX-234';
      customer.getOrders('cstmr_QWERTY');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_QWERTY/orders',
        'get',
        {
          sortBy: 'created_at',
          sortDirection: 'desc',
        },
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });
  });

  describe('getOrder', () => {
    it('proxies the request method', () => {
      const customer = new Customer(mockCommerce);
      customer.getOrder('ord_FOO234', 'cstmr_FOO123', 'ABC-123-ZYX-234');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_FOO123/orders/ord_FOO234',
        'get',
        {},
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });

    it('throws error when customer is not logged in and no customer ID was provided', () => {
      const customer = new Customer(mockCommerce);
      expect(() => {
        customer.getOrder('ord_FOO234');
      }).toThrow(
        'A customer ID must be provided when customer is not logged in',
      );
    });

    it('throws error when customer is not logged in and no token was provided', () => {
      const customer = new Customer(mockCommerce);
      expect(() => {
        customer.getOrder('ord_FOO234', 'cstmr_FOO123');
      }).toThrow(
        'A customer access token must be provided when customer is not logged in',
      );
    });

    it('gathers customer ID from session if not provided', () => {
      const customer = new Customer(mockCommerce);
      customer.data.id = 'cstmr_QWERTY';
      customer.getOrder('ord_FOO234', null, 'ABC-123-ZYX-234');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_QWERTY/orders/ord_FOO234',
        'get',
        {},
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });

    it('gathers customer token from session if not provided', () => {
      const customer = new Customer(mockCommerce);
      customer.data.token = 'ABC-123-ZYX-234';
      customer.getOrder('ord_FOO234', 'cstmr_QWERTY');

      expect(requestMock).toHaveBeenLastCalledWith(
        'customers/cstmr_QWERTY/orders/ord_FOO234',
        'get',
        {},
        {
          'X-Authorization': undefined,
          Authorization: 'Bearer ABC-123-ZYX-234',
        },
      );
    });
  });

  describe('id', () => {
    it('returns customer ID from storage', () => {
      const customer = new Customer(mockCommerce);
      customer.data.id = 'foo';
      expect(customer.id()).toBe('foo');
    });
  });

  describe('token', () => {
    it('returns customer token from storage', () => {
      const customer = new Customer(mockCommerce);
      customer.data.token = 'foo.bar.234';
      expect(customer.token()).toBe('foo.bar.234');
    });
  });

  describe('isLoggedIn', () => {
    it('returns false', () => {
      const customer = new Customer(mockCommerce);
      customer.data = {};
      expect(customer.isLoggedIn()).toBe(false);
    });

    it('returns true', () => {
      const customer = new Customer(mockCommerce);
      customer.data = { id: 'foo', token: 'foo.bar.234' };
      expect(customer.isLoggedIn()).toBe(true);
    });
  });

  describe('logout', () => {
    it('logs the user out', () => {
      const customer = new Customer(mockCommerce);
      customer.data = { id: 'foo', token: 'foo.bar.234' };
      expect(customer.isLoggedIn()).toBe(true);

      customer.logout();
      expect(customer.isLoggedIn()).toBe(false);
    });
  });
});
