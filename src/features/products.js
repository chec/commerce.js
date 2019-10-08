import Commerce from '../commerce';

class Products {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
  }

  /**
   * List products for the current merchant
   *
   * @param {object} params
   * @param {function} callback
   * @param {function} error
   */
  list(params, callback, error) {
    if (typeof params === 'function') {
      this.commerce.request('products', 'GET', null, params, callback);
      return;
    }

    this.commerce.request('products', 'GET', params, callback, error);
  }

  /**
   * Get a specific product for the current merchant
   *
   * @param {string} permalink
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  retrieve(permalink, data, callback, error) {
    this.commerce.request(
      `products/${permalink}`,
      'GET',
      data,
      callback,
      error
    );
  }
}

// TODO: Search by ID or Permalink

export default Products;
