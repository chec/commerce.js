class Checkout {
  constructor(commerce) {
    this.commerce = commerce;
  }

  protect(token) {
    return this.commerce.request(
      `checkouts/${token}/protect`,
      'GET',
      null,
      data => eval(data.sift_js)
    );
  }

  generateToken(identifier, data, callback, error) {
    return this.commerce.request(
      `checkouts/${identifier}`,
      'GET',
      data,
      callback,
      error
    );
  }

  capture(token, data, callback, error) {
    return this.commerce.request(
      `checkouts/${token}`,
      'POST',
      data,
      callback,
      error
    );
  }

  checkPaypalStatus(token, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/paypal/payment`,
      'GET',
      null,
      callback,
      error
    );
  }

  checkPaypalOrderCaptured(token, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/paypal/captured`,
      'GET',
      null,
      callback,
      error
    );
  }

  receipt(token, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/receipt`,
      'GET',
      null,
      callback,
      error
    );
  }

  checkPayWhatYouWant(token, data, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/pay_what_you_want`,
      'GET',
      data,
      callback,
      error
    );
  }

  fields(identifier, callback, error) {
    return this.commerce.request(
      `checkouts/${identifier}/fields`,
      'GET',
      null,
      callback,
      error
    );
  }

  setTaxZone(identifier, data, callback, error) {
    return this.commerce.request(
      `checkouts/${identifier}/helper/set_tax_zone`,
      'GET',
      data,
      callback,
      error
    );
  }

  getLocationFromIP(token, ipAddress = '', callback, error) {
    if (typeof ipAddress === 'function') {
      return this.commerce.request(
        `checkouts/${token}/helper/location_from_ip`,
        'GET',
        null,
        ipAddress,
        error
      );
    }

    return this.commerce.request(
      `checkouts/${token}/helper/location_from_ip`,
      'GET',
      { ipAddress },
      callback,
      error
    );
  }

  isFree(token, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/is_free`,
      'GET',
      null,
      callback,
      error
    );
  }

  checkVariant(token, lineItemId, data, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/${lineItemId}/variant`,
      'GET',
      data,
      callback,
      error
    );
  }

  checkDiscount(token, data, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/discount`,
      'GET',
      data,
      callback,
      error
    );
  }

  checkShippingOption(token, data, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/shipping`,
      'GET',
      data,
      callback,
      error
    );
  }

  getShippingOptions(token, data, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/helper/shipping_options`,
      'GET',
      data,
      callback,
      error
    );
  }

  checkQuantity(token, lineItem, data, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/${lineItem}/quantity`,
      'GET',
      data,
      callback,
      error
    );
  }

  helperValidation(token, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/helper/validation`,
      'GET',
      null,
      callback,
      error
    );
  }

  getLive(token, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/live`,
      'GET',
      null,
      callback,
      error
    );
  }

  getToken(token, callback, error) {
    return this.commerce.request(
      `checkouts/tokens/${token}`,
      'GET',
      null,
      callback,
      error
    );
  }

  checkGiftcard(token, data, callback, error) {
    return this.commerce.request(
      `checkouts/${token}/check/giftcard`,
      'GET',
      data,
      callback,
      error
    );
  }
}

export default Checkout;
