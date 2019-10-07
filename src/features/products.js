class Products {
  constructor(commerce) {
    this.commerce = commerce;
  }

  list(params, callback, error) {
    if (typeof params === 'function') {
      return this.commerce.request('products', 'GET', null, params, callback);
    }

    return this.commerce.request('products', 'GET', params, callback, error);
  }

  retrieve(permalink, data, callback, error) {
    return this.commerce.request(
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
