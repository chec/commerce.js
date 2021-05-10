/* global describe, it, expect */
import Commerce from '../commerce';
import Storage from '../storage';

describe('Storage', () => {
  describe('request', () => {
    beforeEach(() => {
      // Clears any existing cookies set during testing under the "foo" key
      document.cookie = 'foo=bar; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });

    it('should set values to the store', () => {
      const commerce = new Commerce('foo');
      commerce.storage.set('foo', 'bar', 3);
      expect(document.cookie).toBe('foo=bar');
    });

    it('should not set values to the store when disabled', () => {
      const commerce = new Commerce('foo', false, {
        disableStorage: true,
      });
      commerce.storage.set('foo', 'bar', 3);
      expect(document.cookie).toBe('');
    });

    it('should return persisted values', () => {
      const commerce = new Commerce('foo');
      commerce.storage.set('foo', 'baz', 0);
      expect(commerce.storage.get('foo')).toBe('baz');
    });

    it('should not return persisted values when disabled', () => {
      const commerce = new Commerce('foo', false, {
        disableStorage: true,
      });
      commerce.storage.set('foo', 'baz', 0);
      expect(commerce.storage.get('foo')).toBeNull();
    });

    it('should remove a stored value', () => {
      const commerce = new Commerce('foo');
      commerce.storage.set('foo', 'bar', 0);
      commerce.storage.remove('foo');
      expect(commerce.storage.get('foo')).toBeNull();
    });
  });
});
