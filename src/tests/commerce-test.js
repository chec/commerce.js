/* global describe, it, expect */
jest.mock('axios');

import Commerce from '../commerce';
import Features from '../features';
import Storage from '../storage';
import axios from 'axios';

describe('Commerce', () => {
  describe('constructor', () => {
    it('loads and initialises sub-components', () => {
      const commerce = new Commerce('foo');

      expect(commerce).toBeInstanceOf(Commerce);

      expect(commerce.storage).toBeInstanceOf(Storage);

      expect(commerce.cart).toBeInstanceOf(Features.Cart);
      expect(commerce.checkout).toBeInstanceOf(Features.Checkout);
      expect(commerce.merchants).toBeInstanceOf(Features.Merchants);
      expect(commerce.products).toBeInstanceOf(Features.Products);
      expect(commerce.services).toBeInstanceOf(Features.Services);
    });

    it('prevents use of a secret key', () => {
      expect(() => {
        new Commerce('sk_9w8h598s4t9st');
      }).toThrowError(
        'Secret key provided. You must use a public key with Commerce.js!',
      );
    });
  });

  describe('request', () => {
    beforeEach(() => {
      axios.mockClear();
      axios.mockImplementation(() =>
        Promise.resolve({ status: 200, data: {} }),
      );
    });

    it('should attach the given public key to headers', () => {
      const commerce = new Commerce('foo');

      commerce.request('test');

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Authorization': 'foo',
          }),
        }),
      );
    });

    it('should insert an agent header', () => {
      const commerce = new Commerce('foo');

      commerce.request('test');

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Chec-Agent': 'commerce.js/v2',
          }),
        }),
      );
    });

    it('should respect timeout configuration', () => {
      const commerce = new Commerce('foo', false, { timeoutMs: 1234 });

      commerce.request('test');

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 1234,
        }),
      );
    });

    it('should respect custom axios configuration', () => {
      const proxy = {
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l',
        },
      };

      const commerce = new Commerce('foo', false, {
        axiosConfig: {
          proxy,
          headers: {
            'X-Fake-Header': 'test',
            'X-Chec-Agent': 'commerce.js/v2',
          },
        },
      });

      commerce.request('test');

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          proxy,
          headers: expect.objectContaining({
            'X-Fake-Header': 'test',
          }),
        }),
      );
    });

    it('should have a configurable base URL', () => {
      const commerce = new Commerce('foo', false, {
        url: 'chec.loc',
      });

      commerce.request('test');

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'chec.loc/v1/',
        }),
      );
    });

    it('should use the given version in the URL', () => {
      const commerce = new Commerce('foo', false, {
        url: 'chec.loc',
        version: 'v68',
      });

      commerce.request('test');

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'chec.loc/v68/',
        }),
      );
    });

    it('should convert data to form data for non-GET requests', () => {
      const commerce = new Commerce('foo');

      const data = { test: true };
      commerce.request('test', 'post', data);

      const expectation = new FormData();
      expectation.set('test', true);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expectation,
        }),
      );
    });

    it('should convert data to params for GET requests', () => {
      const commerce = new Commerce('foo');

      let data = { test: true };
      commerce.request('test', 'get', data);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          params: data,
        }),
      );
    });

    it('should return the full response promise when specified', async () => {
      const commerce = new Commerce('foo');

      const response = await commerce.request('test', 'get', null, true);

      expect(response.status).toBe(200);
    });

    it('should call an event callback when the response contains an event', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: {
            _event: 'test-event',
          },
        }),
      );
      const eventMock = jest.fn();

      const commerce = new Commerce('foo', false, { eventCallback: eventMock });

      await commerce.request('test');

      expect(eventMock).toHaveBeenCalledWith('test-event');
    });

    it('should pass through all response data other than an event', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: {
            _event: 'test-event',
            other: 'data',
          },
        }),
      );

      const commerce = new Commerce('foo');

      const response = await commerce.request('test');

      expect(response).toEqual({
        other: 'data',
      });
    });
  });

  describe('_serialize', () => {
    it('converts a set of key value pairs to FormData', () => {
      const input = { foo: 'bar', bar: 'baz' };
      const commerce = new Commerce('foo');
      const result = commerce._serialize(input);

      expect(commerce._serialize(input)).toBeInstanceOf(FormData);
      expect(result.get('foo')).toBe('bar');
      expect(result.get('bar')).toBe('baz');
    });

    it('handles numbers', () => {
      const input = { id: 123 };
      const commerce = new Commerce('foo');
      const result = commerce._serialize(input);

      expect(result.get('id')).toBe('123'); // Always strings!
    });

    it('handles booleans', () => {
      const input = { is_free: true };
      const commerce = new Commerce('foo');
      const result = commerce._serialize(input);

      expect(result.get('is_free')).toBe('true'); // Always strings!
    });

    it('handles nested objects', () => {
      const input = {
        conditionals: {
          is_free: true,
          prefix: 'sdk',
          extra: {
            for: 'the sake of it',
          },
        },
      };
      const commerce = new Commerce('foo');
      const result = commerce._serialize(input);

      expect(result.get('conditionals[is_free]')).toBe('true');
      expect(result.get('conditionals[prefix]')).toBe('sdk');
      expect(result.get('conditionals[extra][for]')).toBe('the sake of it');
    });

    it('handles nested arrays', () => {
      const input = {
        products: [
          {
            name: 'T-shirt',
          },
          {
            name: 'JavaScript SDK',
          },
          {
            variants: [
              {
                name: 'Something',
              },
            ],
          },
        ],
      };
      const commerce = new Commerce('foo');
      const result = commerce._serialize(input);

      expect(result.get('products[0][name]')).toBe('T-shirt');
      expect(result.get('products[1][name]')).toBe('JavaScript SDK');
      expect(result.get('products[2][variants][0][name]')).toBe('Something');
    });
  });
});
