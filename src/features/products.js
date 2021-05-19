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

  /**
   * List variants for a product
   *
   * @param {string} productId
   * @param {object|null} params
   * @returns {Promise}
   */
  getVariants(productId, params = null) {
    return this.commerce.request(
      `products/${productId}/variants`,
      'get',
      params,
    );
  }

  /**
   * Get variant for a product
   *
   * @param {string} productId
   * @param {string} variantId
   * @returns {Promise}
   */
  getVariant(productId, variantId) {
    return this.commerce.request(
      `products/${productId}/variants/${variantId}`,
      'get',
    );
  }
}

// TODO: Search by ID or Permalink

export default Products;
