import Commerce from '../commerce';

class Checkout {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
  }

  /**
   * @param {string} token
   * @return {Promise}
   */
  protect(token) {
    return this.commerce.request(`checkouts/${token}/protect`).then(
      data => eval(data.sift_js), // todo remove this, or document if it is safe
    );
  }

  /**
   * Gets a new checkout token
   *
   * @param {string} identifier
   * @param {object} data
   * @return {Promise}
   */
  generateToken(identifier, data) {
    return this.commerce.request(`checkouts/${identifier}`, 'get', data);
  }

  /**
   * Gets a new checkout token from a specific identifier type
   *
   * @param {string} type The type of identifier that will be passed
   * @param {string} identifier
   * @return {Promise}
   */
  generateTokenFrom(type, identifier) {
    if (!['product_id', 'cart', 'permalink'].includes(type)) {
      throw new Error(`Cannot generate a token with unknown "${type}" type`);
    }

    return this.generateToken(identifier, { type });
  }

  /**
   * Capture a provided checkout by its token
   *
   * @param {string} token
   * @param {object} data
   * @return {Promise}
   */
  capture(token, data) {
    return this.commerce
      .request(`checkouts/${token}`, 'post', data)
      .then(response => {
        // Refresh the cart on success
        this.commerce.cart.refresh();
        // Return the original response
        return response;
      });
  }

  /**
   * Gets the receipt for the provided checkout token
   *
   * @param {string} token
   * @return {Promise}
   */
  receipt(token) {
    return this.commerce.request(`checkouts/${token}/receipt`);
  }

  /**
   * Checks whether a checkout has "pay what you want" enabled by the provided token
   *
   * @param {string} token
   * @param {object} data
   * @return {Promise}
   */
  checkPayWhatYouWant(token, data) {
    return this.commerce.request(
      `checkouts/${token}/check/pay_what_you_want`,
      'get',
      data,
    );
  }

  /**
   * @param {string} identifier
   * @return {Promise}
   */
  fields(identifier) {
    return this.commerce.request(`checkouts/${identifier}/fields`);
  }

  /**
   * Sets the geographic tax zone to be used for calculation in the provided checkout
   *
   * @param {string} identifier
   * @param {object} data
   * @return {Promise}
   */
  setTaxZone(identifier, data) {
    return this.commerce.request(
      `checkouts/${identifier}/helper/set_tax_zone`,
      'get',
      data,
    );
  }

  /**
   * Gets a location from the provided IP address, either as a callback, or a specific value
   *
   * @param {string} token
   * @param {string} ipAddress
   * @return {Promise}
   */
  getLocationFromIP(token, ipAddress = '') {
    const urlSuffix =
      ipAddress && ipAddress.length ? `?ip_address=${ipAddress}` : '';
    return this.commerce.request(
      `checkouts/${token}/helper/location_from_ip${urlSuffix}`,
    );
  }

  /**
   * Checks whether the provided checkout has a zero payable balance
   *
   * @param {string} token
   * @return {Promise}
   */
  isFree(token) {
    return this.commerce.request(`checkouts/${token}/check/is_free`);
  }

  /**
   * Checks whether the specified line item ID is still valid/available for the provided checkout
   *
   * @param {string} token
   * @param {string} lineItemId
   * @param {object} data
   * @return {Promise}
   */
  checkVariant(token, lineItemId, data) {
    return this.commerce.request(
      `checkouts/${token}/check/${lineItemId}/variant`,
      'get',
      data,
    );
  }

  /**
   * Checks whether the provided discount code is valid for the provided checkout
   *
   * @param {string} token
   * @param {object} data
   * @return {Promise}
   */
  checkDiscount(token, data) {
    return this.commerce.request(
      `checkouts/${token}/check/discount`,
      'get',
      data,
    );
  }

  /**
   * Checks whether the provided shipping method is valid for the provided checkout
   *
   * @param {string} token
   * @param {object} data
   * @return {Promise}
   */
  checkShippingOption(token, data) {
    return this.commerce.request(
      `checkouts/${token}/check/shipping`,
      'get',
      data,
    );
  }

  /**
   * Gets the shipping options available for the provided checkout
   *
   * @param {string} token
   * @param {object} data
   * @return {Promise}
   */
  getShippingOptions(token, data) {
    return this.commerce.request(
      `checkouts/${token}/helper/shipping_options`,
      'get',
      data,
    );
  }

  /**
   * Check whether the provided line item quantity is valid for the provided checkout
   *
   * @param {string} token
   * @param {string} lineItem
   * @param {object} data
   * @return {Promise}
   */
  checkQuantity(token, lineItem, data) {
    return this.commerce.request(
      `checkouts/${token}/check/${lineItem}/quantity`,
      'get',
      data,
    );
  }

  /**
   * Gets the validation rules for the provided checkout
   *
   * @param {string} token
   * @return {Promise}
   */
  helperValidation(token) {
    return this.commerce.request(`checkouts/${token}/helper/validation`);
  }

  /**
   * Gets the live order object for the provided checkout token
   *
   * @param {string} token
   * @return {Promise}
   */
  getLive(token) {
    return this.commerce.request(`checkouts/${token}/live`);
  }

  /**
   * Gets information about the provided token
   *
   * @param {string} token
   * @return {Promise}
   */
  getToken(token) {
    return this.commerce.request(`checkouts/tokens/${token}`);
  }

  /**
   * Checks whether the provided gift card (code) is valid for the current checkout
   *
   * @param {string} token
   * @param {object} data
   * @return {Promise}
   */
  checkGiftcard(token, data) {
    return this.commerce.request(
      `checkouts/${token}/check/giftcard`,
      'get',
      data,
    );
  }
}

export default Checkout;
