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
   */
  protect(token) {
    this.commerce.request(
      `checkouts/${token}/protect`,
      'GET',
      null,
      data => eval(data.sift_js), // todo remove this, or document if it is safe
    );
  }

  /**
   * Gets a new checkout token
   *
   * @param {string} identifier
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  generateToken(identifier, data, callback, error) {
    this.commerce.request(
      `checkouts/${identifier}`,
      'GET',
      data,
      callback,
      error,
    );
  }

  /**
   * Capture a provided checkout by its token
   *
   * @param {string} token
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  capture(token, data, callback, error) {
    this.commerce.request(`checkouts/${token}`, 'POST', data, callback, error);
  }

  /**
   * Checks the status of a PayPal payment for the provided checkout token
   *
   * @param {string} token
   * @param {function} callback
   * @param {function} error
   */
  checkPaypalStatus(token, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/paypal/payment`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * Checks whether the status a PayPal payment for the provided checkout token is captured
   *
   * @param {string} token
   * @param {function} callback
   * @param {function} error
   */
  checkPaypalOrderCaptured(token, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/paypal/captured`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * Gets the receipt for the provided checkout token
   *
   * @param {string} token
   * @param {function} callback
   * @param {function} error
   */
  receipt(token, callback, error) {
    this.commerce.request(
      `checkouts/${token}/receipt`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * Checks whether a checkout has "pay what you want" enabled by the provided token
   *
   * @param {string} token
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  checkPayWhatYouWant(token, data, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/pay_what_you_want`,
      'GET',
      data,
      callback,
      error,
    );
  }

  /**
   * @param {string} identifier
   * @param {function} callback
   * @param {function} error
   */
  fields(identifier, callback, error) {
    this.commerce.request(
      `checkouts/${identifier}/fields`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * Sets the geographic tax zone to be used for calculation in the provided checkout
   *
   * @param {string} identifier
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  setTaxZone(identifier, data, callback, error) {
    this.commerce.request(
      `checkouts/${identifier}/helper/set_tax_zone`,
      'GET',
      data,
      callback,
      error,
    );
  }

  /**
   * Gets a location from the provided IP address, either as a callback, or a specific value
   *
   * @param {string} token
   * @param {callback|string}   ipAddress If used as a callback, the regular callback argument
   *                            is then treated as the error handler
   * @param {function} callback Ignored when ipAddress is a callback
   * @param {function} error
   */
  getLocationFromIP(token, ipAddress = '', callback, error) {
    if (typeof ipAddress === 'function') {
      this.commerce.request(
        `checkouts/${token}/helper/location_from_ip`,
        'GET',
        null,
        ipAddress,
        error,
      );
      return;
    }

    this.commerce.request(
      `checkouts/${token}/helper/location_from_ip`,
      'GET',
      { ip_address: ipAddress },
      callback,
      error,
    );
  }

  /**
   * Checks whether the provided checkout has a zero payable balance
   *
   * @param {string} token
   * @param {function} callback
   * @param {function} error
   */
  isFree(token, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/is_free`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * Checks whether the specified line item ID is still valid/available for the provided checkout
   *
   * @param {string} token
   * @param {string} lineItemId
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  checkVariant(token, lineItemId, data, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/${lineItemId}/variant`,
      'GET',
      data,
      callback,
      error,
    );
  }

  /**
   * Checks whether the provided discount code is valid for the provided checkout
   *
   * @param {string} token
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  checkDiscount(token, data, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/discount`,
      'GET',
      data,
      callback,
      error,
    );
  }

  /**
   * Checks whether the provided shipping method is valid for the provided checkout
   *
   * @param {string} token
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  checkShippingOption(token, data, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/shipping`,
      'GET',
      data,
      callback,
      error,
    );
  }

  /**
   * Gets the shipping options available for the provided checkout
   *
   * @param {string} token
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  getShippingOptions(token, data, callback, error) {
    this.commerce.request(
      `checkouts/${token}/helper/shipping_options`,
      'GET',
      data,
      callback,
      error,
    );
  }

  /**
   * Check whether the provided line item quantity is valid for the provided checkout
   *
   * @param {string} token
   * @param {string} lineItem
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  checkQuantity(token, lineItem, data, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/${lineItem}/quantity`,
      'GET',
      data,
      callback,
      error,
    );
  }

  /**
   * Gets the validation rules for the provided checkout
   *
   * @param {string} token
   * @param {function} callback
   * @param {function} error
   */
  helperValidation(token, callback, error) {
    this.commerce.request(
      `checkouts/${token}/helper/validation`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * Gets the live order object for the provided checkout token
   *
   * @param {string} token
   * @param {function} callback
   * @param {function} error
   */
  getLive(token, callback, error) {
    this.commerce.request(
      `checkouts/${token}/live`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * Gets information about the provided token
   *
   * @param {string} token
   * @param {function} callback
   * @param {function} error
   */
  getToken(token, callback, error) {
    this.commerce.request(
      `checkouts/tokens/${token}`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * Checks whether the provided gift card (code) is valid for the current checkout
   *
   * @param {string} token
   * @param {object} data
   * @param {function} callback
   * @param {function} error
   */
  checkGiftcard(token, data, callback, error) {
    this.commerce.request(
      `checkouts/${token}/check/giftcard`,
      'GET',
      data,
      callback,
      error,
    );
  }
}

export default Checkout;
