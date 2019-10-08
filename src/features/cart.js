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
   * Request a new cart ID. This method persists the new ID to the cart and local storage,
   * before firing a `Cart.Ready` event.
   */
  refresh() {
    return this.commerce.request('carts').then(({ id }) => {
      this.commerce.storage.set('commercejs_cart_id', id, 30);
      this.cartId = id;
      return id;
    });
  }

  /**
   * Returns the cart identifier being used in the current request, or null if none
   * has been created yet.
   *
   * @returns {Promise<string>}
   */
  id() {
    if (this.cartId !== null) {
      return Promise.resolve(this.cartId);
    }

    const storedCartId = this.commerce.storage.get('commercejs_cart_id');

    if (typeof storedCartId !== 'string' || !storedCartId.length) {
      return this.refresh();
    }

    return this.commerce.request(`carts/${storedCartId}`).then(
      ({ id }) => {
        this.cartId = id;
        return id;
      },
      async error => await this.refresh(),
    );
  }

  request(
    endpoint = '',
    method = 'get',
    data = null,
    returnFullRequest = false,
  ) {
    const suffix =
      typeof endpoint === 'string' && endpoint.length ? `/${endpoint}` : '';
    return this.id().then(id =>
      this.commerce.request(
        `carts/${id}${suffix}`,
        method,
        data,
        returnFullRequest,
      ),
    );
  }

  add(data) {
    return this.request('', 'post', data);
  }

  retrieve() {
    return this.request();
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
