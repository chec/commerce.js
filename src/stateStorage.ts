// TODO needs to import proper api cart type
type ApiCart = any;

export interface StateStorage {
  get<T>(key: string): Promise<T|null>
  set(key: string, value: any): void
  supportsJson(): boolean
}

export class NullStorage implements StateStorage {
  storage: Storage;

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
  }

  get<T>(key: string) {
    return Promise.resolve(null);
  }

  set(key: string, value: any) {
    // noop
  }

  supportsJson(): boolean {
    return false;
  }
}

export class LocalStorage implements StateStorage {
  storage: Storage;

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
  }

  get<T>(key: string): Promise<T|null> {
    const data = this.storage.getItem(`cjs_${key}`);
    if (data === null) {
      return Promise.resolve(null);
    }
    return Promise.resolve(JSON.parse(data));
  }

  set(key: string, value: any) {
    const data = typeof value !== 'string' ? value : JSON.stringify(value);

    this.storage.setItem(`cjs_${key}`, data);
  }

  supportsJson(): boolean {
    return true;
  }
}

export class State {
  storage: StateStorage;

  constructor(storage: StateStorage) {
    this.storage = storage;
  }

  getActiveCartId(): Promise<string|null> {
    return this.storage.get('cart_id');
  }

  getCartData(id: string): Promise<ApiCart|null> {
    if (!this.storage.supportsJson()) {
      return Promise.resolve(null);
    }

    return this.storage.get<ApiCart>(`cart_${id}`);
  }

  setCartData(id: string, value: any) {
    return this.storage.set(`cart_${id}`, value);
  }
}
