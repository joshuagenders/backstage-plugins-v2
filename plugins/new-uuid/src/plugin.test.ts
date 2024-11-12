import { newUuidPlugin } from './plugin';

describe('new-uuid', () => {
  it('should export plugin', () => {
    expect(newUuidPlugin).toBeDefined();
  });
});
