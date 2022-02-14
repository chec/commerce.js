import CommerceOptions from './types/CommerceOptions';
import qs from 'qs';
import {DEFAULT_API_VERSION} from './commerce';

export default class ApiClient {
  commerceOptions: CommerceOptions;
  apiKey: string;

  constructor(apiKey: string, options: CommerceOptions = {}) {
    this.apiKey = apiKey;
    this.commerceOptions = options;
  }

  get(endpoint: string, params: object = {}, options: ClientOptions = {}) {

    const initialization = {
      method: 'get',
      ...options
    };

    const queryParamSeperated = endpoint.includes('?')
      ? endpoint.split('?')[0]
      : endpoint;

    return this.request(`${queryParamSeperated}?${qs.stringify(params)}`, initialization)
  }

  post(endpoint: string, payload: string|object, options: ClientOptions = {}) {
    const initialization = {
      method: 'post',
      body: JSON.stringify(payload),
      ...options
    };

    return this.request(endpoint, initialization)
  }

  put(endpoint: string, payload: string|object, options: ClientOptions = {}) {
    const initialization = {
      method: 'put',
      body: JSON.stringify(payload),
      ...options
    };

    return this.request(endpoint, initialization)
  }

  delete(endpoint: string, options: ClientOptions = {}) {
    const initialization = {
      method: 'delete',
      ...options
    };

    return this.request(endpoint, initialization)
  }

  async request<T>(endpoint: string, payload: string|object, options: ClientOptions = {}): Promise<T> {
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);

    // default headers
    const headers = {
      'X-Authorization': this.apiKey,
      'X-Chec-Agent': 'commerce.js/v3',
      'Chec-Version': DEFAULT_API_VERSION,
      'Content-Type': 'application/json',
    };

    const request = new Request(`${this.commerceOptions.baseUrl}/${endpoint}`, { body, headers })
    const response = await fetch(request)

    if(!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json().catch(() => ({}))
  }
}

interface ClientOptions {
  url?: string,
  version?: string,
  overrideKey?: string,
  headers?: { [key: string]: string },
}
