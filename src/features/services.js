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
   * @return {Promise}
   */
  localeListCountries() {
    return this.commerce.request('services/locale/countries');
  }

  /**
   * List all available shipping countries
   *
   * @param {string} token
   * @return {Promise}
   */
  localeListShippingCountries(token) {
    return this.commerce.request(`services/locale/${token}/countries`);
  }

  /**
   * List all available shipping subdivisions for the provided country code
   *
   * @param {string} token
   * @param {string} countryCode
   * @return {Promise}
   */
  localeListShippingSubdivisions(token, countryCode) {
    return this.commerce.request(
      `services/locale/${token}/countries/${countryCode}/subdivisions`,
    );
  }

  /**
   * List all subdivisions for the provided country code
   *
   * @param {string} countryCode
   * @return {Promise}
   */
  localeListSubdivisions(countryCode) {
    return this.commerce.request(`services/locale/${countryCode}/subdivisions`);
  }
}

export default Services;
