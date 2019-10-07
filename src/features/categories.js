class Categories {
  constructor(commerce) {
    this.commerce = commerce;
  }

  list(params, callback, error) {
    if (typeof params === 'function') {
      return this.commerce.request('categories', 'GET', null, params, callback);
    }

    return this.commerce.request('categories', 'GET', params, callback, error);
  }

  retrieve(slug, data, callback, error) {
    return this.commerce.request(
      `categories/${slug}`,
      'GET',
      data,
      callback,
      error
    );
  }
}

export default Categories;
