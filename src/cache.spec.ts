import { clear, getItem, setItem } from './cache';
import { resetConfig, setConfig } from './config';

describe('cache', () => {
  beforeEach(() => {
    clear();
  });

  afterEach(() => {
    resetConfig();
  });

  describe('getItem method', () => {
    it('should return value', () => {
      setItem('valid', 'top-secret');
      const result = getItem('valid');

      expect(result).toBeDefined();
    });

    it('should return null when item not exists', () => {
      const result = getItem('not_exists');

      expect(result).toBeNull();
    });

    it('should return null when item is expired', () => {
      setConfig({ cacheLifetime: -1000 });
      setItem('expired', 'top-secret');
      const result = getItem('expired');

      expect(result).toBeNull();
    });
  });
});
