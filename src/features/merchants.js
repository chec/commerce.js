import Commerce from '../commerce';

class Merchants {
  constructor(commerce) {
    this.commerce = commerce;
  }

  /**
   * Gets information about the currently authorized merchant
   *
   * @param {function} callback
   * @param {function} error
   */
  about(callback, error) {
    this.commerce.request('merchants', 'GET', null, callback, error);
  }
}

export default Merchants;
