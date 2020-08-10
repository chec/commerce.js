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
   * @param {string} id
   * @param {object} data
   * @return {Promise}
   */
  retrieve(id, data = {}) {
    return this.commerce.request(`products/${id}`, 'get', data);
  }
}

// TODO: Search by ID or Permalink

export default Products;
