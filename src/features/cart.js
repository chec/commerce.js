import Commerce from '../commerce';

class Cart {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
    this.init();
  }

  init() {
    if (this.commerce.storage.get('commercejs_cart_id') === null) {
      return this.refresh();
    }

    return this.commerce.request(
      `carts/${this.commerce.storage.get('commercejs_cart_id')}`,
      'GET',
      null,
      ({ id }) => {
        this.commerce.cart.cart_id = id;
        return this.commerce.event('Cart.Ready');
      },
      error => this.commerce.cart.refresh()
    );
  }

  refresh() {
    return this.commerce.request('carts', 'GET', null, ({ id }) => {
      this.commerce.storage.set('commercejs_cart_id', id, 30);
      this.commerce.cart.cart_id = id;
      return this.commerce.event('Cart.Ready');
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
