import { mocked } from 'ts-jest/utils';

import { getProcessArguments } from './process-argv.indirection';
import { validateArguments } from './validate-arguments';

jest.mock('./process-argv.indirection');

describe('validateArguments function', () => {
  it('should throw an error if the number of arguments less than two', () => {
    mocked(getProcessArguments).mockReturnValueOnce([]);
    expect(validateArguments).toThrowError('Expecting two arguments');
  });

  it('should throw an error if the first argument is not a defined env var', () => {
    process.env.API_URL = undefined;
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL', 'bro']);
    expect(validateArguments).toThrowError(
      'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse',
    );
  });

  it('should throw an error if the first argument is not an env var that contains an url', () => {
    process.env.API_URL = 'yolo';
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL', 'bro']);
    expect(validateArguments).toThrowError(
      'Expecting an url as first parameter. Example: https://cool.org/mySwagger/json',
    );
  });

  it('should throw an error if second argument is an empty string', () => {
    process.env.API_URL = 'https://cool.org';
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL', '']);
    expect(validateArguments).toThrowError(
      'Expecting a path as second argument to write the extracted types. Example: ./src/types/api-types.ts',
    );
  });

  it('should return arguments', () => {
    const url = 'https://cool.org';
    process.env.API_URL = url;
    const outPath = './src/cool.ts';
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL', outPath]);

    const data = validateArguments();

    expect(data.outPath).toBe(outPath);
    expect(data.envVarName).toBe('API_URL');
    expect(data.sourceUrl).toBe(url);
    expect(data.shouldCallEslint).toBe(false);
    expect(data.shouldClearOutPath).toBe(false);
  });

  it('should return additional flags if provided', () => {
    const url = 'https://cool.org';
    process.env.API_URL = url;
    const outPath = './src/cool.ts';
    mocked(getProcessArguments).mockReturnValueOnce([
      'API_URL',
      outPath,
      '--clear',
      '--lint',
    ]);

    const data = validateArguments();

    expect(data.outPath).toBe(outPath);
    expect(data.envVarName).toBe('API_URL');
    expect(data.sourceUrl).toBe(url);
    expect(data.shouldCallEslint).toBe(true);
    expect(data.shouldClearOutPath).toBe(true);
  });
});
