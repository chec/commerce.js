class Merchants {
  constructor(commerce) {
    this.commerce = commerce;
  }

  about(callback, error) {
    return this.commerce.request('merchants', 'GET', null, callback, error);
  }
}

export default Merchants;
