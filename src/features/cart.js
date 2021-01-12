import Commerce from '../commerce';

class Cart {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
    this.cartId = null;
  }

  /**
   * Request a new cart. This method persists the new cart ID to local storage
   *
   * @returns {Promise<object>} A promise that resolves to the new cart
   */
  refresh() {
    return this.commerce.request('carts').then(cart => {
      const { id } = cart;
      this.commerce.storage.set('commercejs_cart_id', id, 30);
      this.cartId = id;
      return cart;
    });
  }

  /**
   * Returns the cart identifier being used in the current request, or null if there is no stored cart ID
   *
   * @returns {string|null}
   */
  id() {
    if (this.cartId !== null) {
      return this.cartId;
    }

    const storedCartId = this.commerce.storage.get('commercejs_cart_id');
    if (typeof storedCartId === 'string' && storedCartId.length) {
      return storedCartId;
    }

    return null;
  }

  async request(
    endpoint = '',
    method = 'get',
    data = null,
    returnFullRequest = false,
  ) {
    const suffix =
      typeof endpoint === 'string' && endpoint.length ? `/${endpoint}` : '';

    if (!this.id()) {
      await this.refresh();
    }

    return this.commerce
      .request(`carts/${this.id()}${suffix}`, method, data, returnFullRequest)
      .catch(error => {
        // Catch 404 errors that imply the cart ID has expired
        if (error.statusCode && error.statusCode === 404) {
          return this.refresh().then(() => {
            // Note that this repetition of the endpoint cannot be extracted as the `.id()` needs to evaluate both times
            return this.commerce.request(
              `carts/${this.id()}${suffix}`,
              method,
              data,
              returnFullRequest,
            );
          });
        }

        throw error;
      });
  }

  /**
   * @param {Object|number} productId
   * @param {number} quantity
   * @param {Object} variant
   * @returns {Promise}
   */
  add(productId, quantity = 1, variant = null) {
    const data = {
      id: typeof productId === 'object' ? productId.id : productId,
      quantity,
      variant,
    };

    return this.request('', 'post', data);
  }

  retrieve(cartId = null) {
    if (cartId) {
      this.cartId = cartId;
    }

    return this.request().then(cart => {
      this.cartId = (cart && cart.id) || null;
      return cart;
    });
  }

  /**
   * Check whether the specified quantity is in stock/available for the specified product ID.
   *
   * @param {string} productId
   * @param {number} quantity
   * @returns {Promise}
   */
  checkQuantity(productId, quantity) {
    return this.commerce
      .request(`products/${productId}`)
      .then(response => quantity <= response.quantity);
  }

  remove(lineId) {
    return this.request(`items/${lineId}`, 'delete');
  }

  delete() {
    return this.request('', 'delete');
  }

  update(lineId, data) {
    return this.request(`items/${lineId}`, 'put', data);
  }

  contents() {
    return this.request('items');
  }

  empty() {
    return this.request('items', 'delete');
  }
}

export default Cart;
