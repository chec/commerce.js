class Cart {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
    this.init();
  }

  init(id = false) {
    const cjs = this.commerce;

    if (!id && this.commerce.storage.get('commercejs_cart_id') !== null) {
      return this.commerce.request(
        `carts/${this.commerce.storage.get('commercejs_cart_id')}`,
        'GET',
        null,
        data => {
          cjs.cart.cart_id = data.id;
          return cjs.event('Cart.Ready');
        },
        error => cjs.cart.refresh()
      );
    }

    if (id) {
      return this.commerce.request(
        `carts/${id}`,
        'GET',
        null,
        data => {
          cjs.storage.set('commercejs_cart_id', data.id, 30);
          cjs.cart.cart_id = data.id;
          return cjs.event('Cart.Ready');
        },
        error => cjs.cart.refresh()
      );
    }

    return this.refresh();
  }

  refresh() {
    const cjs = this.commerce;

    return this.commerce.request('carts', 'GET', null, data => {
      cjs.storage.set('commercejs_cart_id', data.id, 30);
      cjs.cart.cart_id = data.id;
      return cjs.event('Cart.Ready');
    });
  }

  id() {
    return this.cart_id;
  }

  add(data, callback, error) {
    return this.commerce.request(
      `carts/${this.cart_id}`,
      'POST',
      data,
      callback,
      error
    );
  }

  retrieve(callback, error) {
    return this.commerce.request(
      `carts/${this.cart_id}`,
      'GET',
      null,
      callback,
      error
    );
  }

  remove(lineId, callback, error) {
    return this.commerce.request(
      `carts/${this.cart_id}/items/${lineId}`,
      'DELETE',
      null,
      callback,
      error
    );
  }

  delete(callback, error) {
    return this.commerce.request(
      `carts/${this.cart_id}`,
      'DELETE',
      null,
      callback,
      error
    );
  }

  update(lineId, data, callback, error) {
    return this.commerce.request(
      `carts/${this.cart_id}/items/${lineId}`,
      'PUT',
      data,
      callback,
      error
    );
  }

  contents(callback, error) {
    return this.commerce.request(
      `carts/${this.cart_id}/items`,
      'GET',
      null,
      callback,
      error
    );
  }

  empty(callback, error) {
    return this.commerce.request(
      `carts/${this.cart_id}/items`,
      'DELETE',
      null,
      callback,
      error
    );
  }
}

export default Cart;
