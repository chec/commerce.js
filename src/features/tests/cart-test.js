/* global jest, describe, it, expect, beforeEach */
jest.mock('axios');
jest.mock('../../commerce');

import Cart from '../cart';
import MockCommerce from '../../commerce';
import axios from 'axios';

const Commerce = jest.requireActual('../../commerce').default;

let eventMock;
let storageGetMock;
let storageSetMock;
let mockCommerce;
let mockCallback;
let mockErrorCallback;

beforeEach(() => {
  MockCommerce.mockClear();

  eventMock = jest.fn();
  storageGetMock = jest.fn();
  storageSetMock = jest.fn();

  const commerceImpl = {
    options: {
      url: 'http://localhost/',
      apiKey: 'test',
      version: 'v1',
      cartLifetime: 30,
    },
    cart: {
      cart_id: null,
    },
    error(response) {},
    event: eventMock,
    storage: {
      get: storageGetMock,
      set: storageSetMock,
    },
  };

  commerceImpl.request = Commerce.prototype.request.bind(commerceImpl);

  MockCommerce.mockImplementation(() => commerceImpl);

  mockCommerce = new MockCommerce('foo', true);

  // Used for API proxy methods
  mockCallback = jest.fn();
  mockErrorCallback = jest.fn();

  axios.mockClear();
  axios.mockImplementation(() =>
    Promise.resolve({ status: 200, data: { id: '12345' } }),
  );
});

describe('Cart', () => {
  describe('id', () => {
    it('does not initialise a new ID when none is stored', () => {
      storageGetMock.mockReturnValue(null);

      const cart = new Cart(mockCommerce);

      expect(cart.id()).toBe(null);
      expect(mockCommerce.storage.get).toHaveBeenCalled();
      expect(axios).not.toHaveBeenCalled();
    });

    it('returns a stored ID', async () => {
      storageGetMock.mockReturnValue('123');

      const cart = new Cart(mockCommerce);

      expect(cart.id()).toBe('123');
      expect(mockCommerce.storage.get).toHaveBeenCalled();
    });
  });

  describe('request', () => {
    it('runs refresh if no cart ID is available', async () => {
      const cart = new Cart(mockCommerce);
      const refreshSpy = jest.spyOn(cart, 'refresh');

      await cart.request();

      expect(refreshSpy).toHaveBeenCalled();
    });

    it('does not refresh if the cart ID is available', async () => {
      storageGetMock.mockReturnValue('123');

      const cart = new Cart(mockCommerce);
      const refreshSpy = jest.spyOn(cart, 'refresh');

      await cart.request();

      expect(mockCommerce.storage.get).toHaveBeenCalled();
      expect(refreshSpy).not.toHaveBeenCalled();
      expect(axios).toHaveBeenCalledTimes(1);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/123',
          method: 'get',
        }),
      );
    });

    it('will refresh if a 404 is returned from a request', async () => {
      axios.mockClear();
      axios
        .mockImplementationOnce(() =>
          Promise.reject({
            response: {
              status: 404,
              statusText: 'Not found',
              data: {},
            },
          }),
        )
        .mockImplementation(() =>
          Promise.resolve({ status: 200, data: { id: '12345' } }),
        );

      storageGetMock.mockReturnValue('123');

      const cart = new Cart(mockCommerce);
      const refreshSpy = jest.spyOn(cart, 'refresh');

      await cart.request();

      expect(mockCommerce.storage.get).toHaveBeenCalled();
      expect(refreshSpy).toHaveBeenCalled();
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/123',
          method: 'get',
        }),
      );
      expect(mockCommerce.storage.set).toHaveBeenCalledWith(
        expect.anything(),
        '12345',
        expect.anything(),
      );
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345',
          method: 'get',
        }),
      );
    });
  });

  describe('refresh', () => {
    it('sets the card ID and fires a ready event', async () => {
      const cart = new Cart(mockCommerce);
      const newCart = await cart.refresh();

      expect(storageSetMock).toHaveBeenCalledWith(
        'commercejs_cart_id',
        '12345',
        30,
      );
      expect(newCart).toHaveProperty('id');
    });

    it('respects custom cartLifetime config', async () => {
      mockCommerce.options.cartLifetime = 5;
      const cart = new Cart(mockCommerce);
      const newCart = await cart.refresh();

      expect(storageSetMock).toHaveBeenCalledWith(
        'commercejs_cart_id',
        '12345',
        5,
      );
      expect(newCart).toHaveProperty('id');
    });
  });

  describe('add', () => {
    it('proxies the request method', async () => {
      storageGetMock.mockReturnValue('12345');

      const cart = new Cart(mockCommerce, '12345');
      const data = { id: 'bar' };

      await cart.add(data);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345',
          method: 'post',
        }),
      );

      const lastData = axios.mock.calls.pop()[0].data;
      expect(lastData.id).toBe('bar');
    });

    it('builds a request from given args with variant ID', async () => {
      storageGetMock.mockReturnValue('12345');

      const cart = new Cart(mockCommerce, '12345');

      await cart.add('id', 6, 'vrnt_123');

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345',
          method: 'post',
        }),
      );

      const lastData = axios.mock.calls.pop()[0].data;
      expect(lastData.id).toBe('id');
      expect(lastData.quantity).toEqual(6);
      expect(lastData.variant_id).toBe('vrnt_123');
    });

    it('builds a request from given args with variant options', async () => {
      storageGetMock.mockReturnValue('12345');

      const cart = new Cart(mockCommerce, '12345');

      await cart.add('id', 6, { vgrp_123: 'optn_123' });

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345',
          method: 'post',
        }),
      );

      const lastData = axios.mock.calls.pop()[0].data;
      expect(lastData.id).toBe('id');
      expect(lastData.quantity).toEqual(6);
      expect(lastData.options.vgrp_123).toBe('optn_123');
    });
  });

  describe('retrieve', () => {
    it('proxies the request method', async () => {
      const cart = new Cart(mockCommerce);
      storageGetMock.mockReturnValue('12345');
      await cart.retrieve();

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345',
        }),
      );
    });

    it('uses a given cart ID', async () => {
      const cart = new Cart(mockCommerce);
      storageGetMock.mockReturnValue('12345');
      await cart.retrieve(54321);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/54321',
        }),
      );
    });
  });

  describe('remove', () => {
    it('proxies the request method', async () => {
      const cart = new Cart(mockCommerce);
      const lineId = '98765';
      await cart.remove(lineId);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345/items/98765',
          method: 'delete',
        }),
      );
    });
  });

  describe('delete', () => {
    it('proxies the request method', async () => {
      const cart = new Cart(mockCommerce);
      await cart.delete();

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345',
          method: 'delete',
        }),
      );
    });
  });

  describe('update', () => {
    it('proxies the request method', async () => {
      const cart = new Cart(mockCommerce);
      const lineId = '98765';
      const data = { foo: 'bar' };
      await cart.update(lineId, data);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345/items/98765',
          method: 'put',
        }),
      );

      const lastData = axios.mock.calls.pop()[0].data;
      expect(lastData.foo).toBe('bar');
    });
  });

  describe('contents', () => {
    it('proxies the request method', async () => {
      const cart = new Cart(mockCommerce);
      await cart.contents();

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345/items',
          method: 'get',
        }),
      );
    });
  });

  describe('empty', () => {
    it('proxies the request method', async () => {
      const cart = new Cart(mockCommerce);
      await cart.empty();

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'carts/12345/items',
          method: 'delete',
        }),
      );
    });
  });
});
