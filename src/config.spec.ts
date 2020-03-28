import { DEFAULT_CACHE_LIFETIME, getConfig, resetConfig, setConfig } from './config';

describe('config', () => {
  afterEach(() => {
    resetConfig();
  });

  describe('getConfig method', () => {
    it('should return current config', () => {
      const result = getConfig();

      expect(result).toEqual({
        cacheLifetime: DEFAULT_CACHE_LIFETIME,
      });
    });
  });

  describe('setConfig method', () => {
    it('should return current config', () => {
      const result = setConfig({
        cacheLifetime: 0,
      });

      expect(result).toEqual({
        cacheLifetime: 0,
      });
    });
  });
});
