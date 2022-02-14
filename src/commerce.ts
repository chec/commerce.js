// import ApiKeyMap from './types/ApiKeyMap';
import CommerceOptions from './types/CommerceOptions';
import ApiClient from './apiClient';

const defaultOptions: CommerceOptions = {
  baseUrl: 'https://api.chec.io',
}

export const DEFAULT_API_VERSION = '2021-10-06';

export default class Commerce {
  key: string;
  options: CommerceOptions;

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  constructor(key: string, options: CommerceOptions = {}) {
    this.key = key;
    this.options = {
      ...defaultOptions,
      ...options,
    };

    if (
      !options.allowSecretKey &&
      // typeof this.key === 'string' &&
      this.key.toLowerCase().substring(0, 3) === 'sk_'
    ) {
      throw new Error(
        'Secret key provided. You must use a public key with Commerce.js, or use `allowSecretKey` in the config object.',
      );
    }

    const client = new ApiClient(this.key, this.options);
  }
}

