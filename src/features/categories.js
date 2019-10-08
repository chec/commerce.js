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
   * @param {function|object} params
   * @param {function} callback
   * @param {function} error
   */
  list(params, callback, error) {
    if (typeof params === 'function') {
      this.commerce.request('categories', 'GET', null, params, callback);
      return;
    }

    this.commerce.request('categories', 'GET', params, callback, error);
  }

  /**
   * Get a specific category its slug
   *
   * @param {string} slug
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  retrieve(slug, data, callback, error) {
    this.commerce.request(`categories/${slug}`, 'GET', data, callback, error);
  }
}

export default Categories;
