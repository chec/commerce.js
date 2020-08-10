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
   * Get a specific category by its ID. You may also provide `{ type: 'slug' }`
   * as data and use a category slug instead of an ID.
   *
   * @param {string} id
   * @param {object} data
   * @return {Promise}
   */
  retrieve(id, data = {}) {
    return this.commerce.request(`categories/${id}`, 'get', data);
  }
}

export default Categories;
