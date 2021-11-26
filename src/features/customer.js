import Commerce from '../commerce';

class Customer {
  /**
   * @param {Commerce} commerce
   */
  constructor(commerce) {
    this.commerce = commerce;
    this.data = {};
  }

  /**
   * Send login link
   *
   * @see https://commercejs.com/docs/api/#issue-and-send-login-token
   * @param {string} email The customer's email address
   * @param {string} baseUrl The base URL to use for login links in the email, use {token} as a placeholder
   * @returns {Promise}
   */
  login(email, baseUrl) {
    return this.commerce.request('customers/email-token', 'post', {
      email,
      base_url: baseUrl,
    });
  }

  /**
   * Get access token
   *
   * @see https://commercejs.com/docs/api/#exchange-login-token-for-jwt
   * @param {string} token The login token from the email sent when using login()
   * @param {boolean} save Whether to save the user in session
   * @returns {Promise}
   */
  getToken(token, save = true) {
    return this.commerce
      .request('customers/exchange-token', 'post', { token })
      .then(result => {
        if (save && (result.customer_id || result.jwt)) {
          this.data = {
            id: result.customer_id || null,
            token: result.jwt || null,
          };
          // todo abstract this.commerce.storage to support private and public stores
          window.localStorage.setItem('commercejs_customer_id', this.data.id);
          window.localStorage.setItem(
            'commercejs_customer_token',
            this.data.token,
          );
        }
        return result;
      });
  }

  /**
   * Update customer
   *
   * @see https://commercejs.com/docs/api/#update-customer
   * @param {object} data The data to update on the customer
   * @param {string|null} customerId Optional: the customer's ID e.g. cstmr_ABC123, or null to use session
   * @param {string|null} token Optional: access token for the customer, or null to use session
   * @returns {Promise}
   */
  update(data = {}, customerId = null, token = null) {
    this._assertArgsProvided(customerId, token);

    return this._request(
      `customers/${customerId || this.id()}`,
      'PUT',
      data,
      {},
      token,
    );
  }

  /**
   * List orders for a customer
   *
   * @see https://commercejs.com/docs/api/#list-orders-for-customer
   * @param {string|null} customerId Optional: the customer's ID e.g. cstmr_ABC123, or null to use session
   * @param {string|null} token Optional: access token for the customer, or null to use session
   * @param {object|null} params Optional
   * @returns {Promise}
   */
  getOrders(customerId = null, token = null, params = {}) {
    this._assertArgsProvided(customerId, token);

    const requestParams = {
      sortBy: 'created_at',
      sortDirection: 'desc',
      ...params,
    };

    return this._request(
      `customers/${customerId || this.id()}/orders`,
      'get',
      requestParams,
      {},
      token,
    );
  }

  /**
   * Get order for customer
   *
   * @see https://commercejs.com/docs/api/#get-order-for-customer
   * @param {string} orderId The order ID to retrieve e.g. ord_ZYX234
   * @param {string|null} customerId Optional: the customer's ID e.g. cstmr_ABC123, or null to use session
   * @param {string|null} token Optional: access token for the customer, or null to use session
   * @returns {Promise}
   */
  getOrder(orderId, customerId = null, token = null) {
    this._assertArgsProvided(customerId, token);

    return this._request(
      `customers/${customerId || this.id()}/orders/${orderId}`,
      'get',
      {},
      {},
      token,
    );
  }

  /**
   * Gets information about the currently authorized customer, or a specific customer ID
   *
   * @param {string|null} customerId Optional: the customer's ID e.g. cstmr_ABC123, or null to use session
   * @param {string|null} token Optional: access token for the customer, or null to use session
   * @return {Promise}
   */
  about(customerId = null, token = null) {
    return this._request(
      `customers/${customerId || this.id()}`,
      'get',
      {},
      {},
      token,
    );
  }

  /**
   * Returns the customer ID used during a successful login
   *
   * @returns {string|null}
   */
  id() {
    return this._fromStorage('id');
  }

  /**
   * Returns the customer token used during a successful login
   *
   * @returns {string|null}
   */
  token() {
    return this._fromStorage('token');
  }

  /**
   * Whether a customer is logged in in session
   *
   * @returns {boolean}
   */
  isLoggedIn() {
    return this.id() !== null && this.token() !== null;
  }

  /**
   * Clear customer state
   */
  logout() {
    this.data = {};
    window.localStorage.removeItem('commercejs_customer_id');
    window.localStorage.removeItem('commercejs_customer_token');
  }

  _fromStorage(key) {
    if (this.data[key] && this.data[key].length) {
      return this.data[key];
    }

    const storedValue = window.localStorage.getItem(
      `commercejs_customer_${key}`,
    );
    if (typeof storedValue === 'string' && storedValue.length) {
      return storedValue;
    }

    return null;
  }

  _request(
    endpoint,
    method = 'get',
    data = null,
    extraHeaders = {},
    token = null,
  ) {
    // If no token was provided, look it up from storage
    const authToken = token || this.token();

    return this.commerce.request(endpoint, method, data, {
      'X-Authorization': undefined,
      Authorization: `Bearer ${authToken}`,
      ...extraHeaders,
    });
  }

  _assertArgsProvided(customerId = null, token = null) {
    if (customerId === null && !this.id()) {
      throw new Error(
        'A customer ID must be provided when customer is not logged in',
      );
    }
    if (token === null && !this.token()) {
      throw new Error(
        'A customer access token must be provided when customer is not logged in',
      );
    }
  }
}

export default Customer;
