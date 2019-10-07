/* global describe, it, expect */

import Commerce from '../commerce';
import Features from '../features';
import Storage from '../storage';

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
  });
});
