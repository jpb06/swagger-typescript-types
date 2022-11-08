import { mapZodTypes } from './map-zod-types';

describe('mapZodTypes function', () => {
  it('should replace integer by number', () => {
    const result = mapZodTypes('integer');

    expect(result).toBe('number');
  });

  it('should return input', () => {
    const result = mapZodTypes('yolo');

    expect(result).toBe('yolo');
  });
});
