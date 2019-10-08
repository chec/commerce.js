import Commerce from '../commerce';

class Merchants {
  constructor(commerce) {
    this.commerce = commerce;
  }

  /**
   * Gets information about the currently authorized merchant
   *
   * @return {Promise}
   */
  about() {
    return this.commerce.request('merchants');
  }
}

export default Merchants;
