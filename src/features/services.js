class Services {
  constructor(commerce) {
    this.commerce = commerce;
  }

  localeListCountries(callback, error) {
    return this.commerce.request(
      'services/locale/countries',
      'GET',
      null,
      callback,
      error
    );
  }

  localeListShippingCountries(token, callback, error) {
    return this.commerce.request(
      `services/locale/${token}/countries`,
      'GET',
      null,
      callback,
      error
    );
  }

  localeListShippingSubdivisions(token, countryCode, callback, error) {
    return this.commerce.request(
      `services/locale/${token}/countries/${countryCode}/subdivisions`,
      'GET',
      null,
      callback,
      error
    );
  }

  localeListSubdivisions(countryCode, callback, error) {
    return this.commerce.request(
      'services/locale/' + countryCode + '/subdivisions',
      'GET',
      {},
      callback,
      error
    );
  }
}

export default Services;
