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
   * @param {object|null} params
   * @return {Promise}
   */
  list(params = null) {
    return this.commerce.request('products', 'get', params);
  }

  /**
   * Get a specific product for the current merchant
   *
   * @param {string} permalink
   * @param {object} data
   * @return {Promise}
   */
  retrieve(permalink, data) {
    return this.commerce.request(`products/${permalink}`, 'get', data);
  }
}

// TODO: Search by ID or Permalink

export default Products;
