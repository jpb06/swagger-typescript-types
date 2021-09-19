import { readJson } from 'fs-extra';

import { validateSchema } from './validate-schema';

describe('validateSchema function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  it('should throw an error if schema is invalid', async () => {
    await expect(validateSchema('in')).rejects.toThrow('Invalid schema');
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should return json if schema is valid', async () => {
    const swaggerJson = await readJson(
      './src/tests-related/mock-data/swagger.json',
    );
    const json = await validateSchema(swaggerJson);

    expect(json).toBeDefined();
  });
});
