import { readJson } from 'fs-extra';

import { validateSchema } from './validate-schema';

describe('validateSchema function', () => {
  it('should throw an error if schema is invalid', () => {
    return expect(validateSchema('in')).rejects.toThrow('Invalid schema');
  });

  it('should return json if schema is valid', async () => {
    const swaggerJson = await readJson(
      './src/tests-related/mock-data/swagger.json',
    );
    const json = await validateSchema(swaggerJson);

    expect(json).toBeDefined();
  });
});
