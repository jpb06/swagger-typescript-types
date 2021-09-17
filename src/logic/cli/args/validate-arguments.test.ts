import { mocked } from 'ts-jest/utils';

import { getProcessArguments } from './process-argv.indirection';
import { validateArguments } from './validate-arguments';

jest.mock('./process-argv.indirection');

describe('validateArguments function', () => {
  it('should throw an error if the number of arguments less than one', () => {
    mocked(getProcessArguments).mockReturnValueOnce([]);
    expect(validateArguments).toThrowError(
      'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse',
    );
  });

  it('should throw an error if the first argument is not a defined env var', () => {
    process.env.API_URL = undefined;
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL']);
    expect(validateArguments).toThrowError(
      'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse',
    );
  });

  it('should throw an error if the first argument is not an env var that contains an url', () => {
    process.env.API_URL = 'yolo';
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL']);
    expect(validateArguments).toThrowError(
      'Expecting an url as value from the environement variable provided. Example: https://cool.org/mySwagger/json',
    );
  });

  it('should return arguments', () => {
    const url = 'https://cool.org';
    process.env.API_URL = url;
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL']);

    const data = validateArguments();

    expect(data.envVarName).toBe('API_URL');
    expect(data.sourceUrl).toBe(url);
    expect(data.shouldCallEslint).toBe(false);
    expect(data.shouldClearOutPath).toBe(false);
  });

  it('should return additional flags if provided', () => {
    const url = 'https://cool.org';
    process.env.API_URL = url;
    mocked(getProcessArguments).mockReturnValueOnce([
      'API_URL',
      '--clear',
      '--lint',
    ]);

    const data = validateArguments();

    expect(data.envVarName).toBe('API_URL');
    expect(data.sourceUrl).toBe(url);
    expect(data.shouldCallEslint).toBe(true);
    expect(data.shouldClearOutPath).toBe(true);
  });
});
