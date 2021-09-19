import { splitOnce } from './split-once';

describe('splitOnce function', () => {
  it('should return null as second item', () => {
    const result = splitOnce('cool', '_');

    expect(result[0]).toBe('cool');
    expect(result[1]).toBeNull();
  });

  it('should return two items', () => {
    const result = splitOnce('cool_bro', '_');

    expect(result[0]).toBe('cool');
    expect(result[1]).toBe('bro');
  });

  it('should return two items from a string with more than one underscore', () => {
    const result = splitOnce('cool_bro_yolo_owo', '_');

    expect(result[0]).toBe('cool');
    expect(result[1]).toBe('bro_yolo_owo');
  });
});
