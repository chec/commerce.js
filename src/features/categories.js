import Commerce from '../commerce';

class Categories {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
  }

  /**
   * List the merchant's categories, either by filtered params, or unfiltered.
   *
   * @param {null|object} params
   * @return {Promise}
   */
  list(params = null) {
    if (typeof params === 'function') {
      return this.commerce.request('categories');
    }

    return this.commerce.request('categories', 'get', params);
  }

  /**
   * Get a specific category its slug
   *
   * @param {string} slug
   * @param {object} data
   * @return {Promise}
   */
  retrieve(slug, data) {
    return this.commerce.request(`categories/${slug}`, 'get', data);
  }
}

export default Categories;
