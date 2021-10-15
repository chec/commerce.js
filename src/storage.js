class Storage {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
  }

  /**
   * Set a value to be persisted. By default this uses cookies.
   *
   * @param {String} key
   * @param {String} value
   * @param {Number} days If provided, will define the lifetime of the cookie. If not it will be a session cookie.
   * @returns {null}
   */
  set(key, value, days) {
    if (
      typeof document === 'undefined' ||
      this.commerce.options.disableStorage
    ) {
      return null;
    }

    let path = '/';
    let expires = '';
    let samesite = 'lax';
    let secure = '';

    if (this.commerce.options.config) {
      if (typeof this.commerce.options.config.cookie_path !== 'undefined') {
        path = this.commerce.options.config.cookie_path;
      }
      if (typeof this.commerce.options.config.cookie_samesite !== 'undefined') {
        samesite = this.commerce.options.config.cookie_samesite;
      }
      if (
        typeof this.commerce.options.config.cookie_secure !== 'undefined' &&
        this.commerce.options.config.cookie_secure
      ) {
        secure = '; secure';
      }
    }

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }

    document.cookie =
      key +
      '=' +
      value +
      expires +
      '; path=' +
      path +
      '; samesite=' +
      samesite +
      secure;
  }

  /**
   * Retrieve a persisted value from the store by its key.
   *
   * @param {String} key
   * @returns {string|null}
   */
  get(key) {
    if (
      typeof document === 'undefined' ||
      this.commerce.options.disableStorage
    ) {
      return null;
    }

    key = key + '=';

    for (let c of Array.from(document.cookie.split(';'))) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(key) === 0) {
        return c.substring(key.length, c.length);
      }
    }

    return null;
  }

  /**
   * Remove a persisted value from the store by its key.
   *
   * @param {String} key
   * @returns {null}
   */
  remove(key) {
    return this.set(key, '', -1);
  }
}

export default Storage;
