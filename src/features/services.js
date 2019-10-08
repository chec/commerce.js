import Commerce from '../commerce';

class Services {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
  }

  /**
   * List all countries
   *
   * @param {function} callback
   * @param {function} error
   */
  localeListCountries(callback, error) {
    this.commerce.request(
      'services/locale/countries',
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * List all available shipping countries
   *
   * @param {string} token
   * @param {function} callback
   * @param {function} error
   */
  localeListShippingCountries(token, callback, error) {
    this.commerce.request(
      `services/locale/${token}/countries`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * List all available shipping subdivisions for the provided country code
   *
   * @param {string} token
   * @param {string} countryCode
   * @param {function} callback
   * @param {function} error
   */
  localeListShippingSubdivisions(token, countryCode, callback, error) {
    this.commerce.request(
      `services/locale/${token}/countries/${countryCode}/subdivisions`,
      'GET',
      null,
      callback,
      error,
    );
  }

  /**
   * List all subdivisions for the provided country code
   *
   * @param {string} countryCode
   * @param {function} callback
   * @param {function} error
   */
  localeListSubdivisions(countryCode, callback, error) {
    this.commerce.request(
      `services/locale/${countryCode}/subdivisions`,
      'GET',
      {},
      callback,
      error,
    );
  }
}

export default Services;
