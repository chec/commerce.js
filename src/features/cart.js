import Commerce from '../commerce';

class Cart {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
    this.cart = null;
  }

  /**
   * Request a new cart ID. This method persists the new ID to the cart and local storage
   */
  refresh() {
    return this.commerce.request('carts').then(cart => {
      const { id } = cart;
      this.commerce.storage.set('commercejs_cart_id', id, 30);
      this.cart = cart;
      return id;
    });
  }

  /**
   * Returns the cart identifier being used in the current request, or null if there is no stored cart ID
   *
   * @returns {string|null}
   */
  id() {
    if (this.cart !== null && this.cart.id !== null) {
      return this.cart.id;
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
        if (error.response && error.response.status === 404) {
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

  retrieve() {
    return this.request().then(cart => {
      this.cart = cart;
      return cart;
    });
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
