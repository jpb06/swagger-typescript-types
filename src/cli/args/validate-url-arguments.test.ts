import { mocked } from 'jest-mock';

import { getProcessArguments } from './process-argv.indirection';
import { validateUrlArguments } from './validate-url-arguments';

jest.mock('./process-argv.indirection');

describe('validateUrlArguments function', () => {
  const outPath = './src/api';

  it('should throw an error if the number of arguments is not equal to three', () => {
    mocked(getProcessArguments).mockReturnValueOnce([]);
    expect(validateUrlArguments).toThrowError(
      'Expecting three arguments: api url, json path and output path',
    );
  });

  it('should throw an error if the number of arguments is more than three', () => {
    mocked(getProcessArguments).mockReturnValueOnce([
      'cool',
      'bro',
      'yolo',
      'yola',
    ]);
    expect(validateUrlArguments).toThrowError(
      'Expecting three arguments: api url, json path and output path',
    );
  });

  it('should throw an error if the first argument is not a defined env var', () => {
    process.env.API_URL = undefined;
    mocked(getProcessArguments).mockReturnValueOnce([
      'API_URL',
      '-json',
      outPath,
    ]);
    expect(validateUrlArguments).toThrowError(
      'Expecting an url as value from the environement variable provided. Example: https://cool.org',
    );
  });

  it('should throw an error if the first argument is not an env var that contains an url', () => {
    process.env.API_URL = 'yolo';
    mocked(getProcessArguments).mockReturnValueOnce([
      'API_URL',
      '-json',
      outPath,
    ]);
    expect(validateUrlArguments).toThrowError(
      'Expecting an url as value from the environement variable provided. Example: https://cool.org/mySwagger',
    );
  });

  it('should throw an error if the first argument contains never', () => {
    process.env.API_URL = 'never';
    mocked(getProcessArguments).mockReturnValueOnce([
      'API_URL',
      '-json',
      outPath,
    ]);
    expect(validateUrlArguments).toThrowError(
      'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse',
    );
  });

  it('should return arguments', () => {
    const url = 'https://cool.org';
    const jsonPath = '-json';
    process.env.API_URL = url;
    mocked(getProcessArguments).mockReturnValueOnce([
      'API_URL',
      jsonPath,
      outPath,
    ]);

    const data = validateUrlArguments();

    expect(data.envVarName).toBe('API_URL');
    expect(data.outPath).toBe(outPath);
    expect(data.apiUrl).toBe(url);
    expect(data.apiJsonPath).toBe(jsonPath);
  });
});
