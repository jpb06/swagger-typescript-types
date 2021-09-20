import { readJson } from 'fs-extra';

import { validateSchema } from './validate-schema';

describe('validateSchema function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  beforeEach(() => jest.clearAllMocks());

  it('should throw an error if schema is invalid', async () => {
    await expect(validateSchema({})).rejects.toThrow(
      'Schema validation failure: missing components.schemas property',
    );
  });

  it('should return json if schema is valid', async () => {
    const swaggerJson = await readJson(
      './src/tests-related/mock-data/swagger.json',
    );
    const json = await validateSchema(swaggerJson);

    expect(json).toBeDefined();
  });

  it('should throw an error when components.schemas is undefined', async () => {
    await expect(validateSchema({})).rejects.toThrow(
      `Schema validation failure: missing components.schemas property`,
    );
  });

  it('should throw an error when paths is undefined', async () => {
    return expect(
      validateSchema({ components: { schemas: {} } }),
    ).rejects.toThrow(`Schema validation failure: missing paths property`);
  });

  it('should display a warning if there is no schemas', async () => {
    await validateSchema({ components: { schemas: {} }, paths: { yolo: {} } });

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if there is no paths', async () => {
    return expect(
      validateSchema({ components: { schemas: { yolo: {} } }, paths: {} }),
    ).rejects.toThrow(
      `This api definition does not expose any endpoint. Nothing to generate`,
    );
  });
});
