import { getSchemaName } from './get-schema-name';

describe('getSchemaName function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  it('should get last path segment', () => {
    const result = getSchemaName('cool/bro/yolo/Oyo');

    expect(result).toBe('Oyo');
  });
});
