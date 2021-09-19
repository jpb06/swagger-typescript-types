import { mocked } from 'ts-jest/utils';

import { getProcessArguments } from './process-argv.indirection';
import { validateArguments } from './validate-arguments';

jest.mock('./process-argv.indirection');

describe('validateArguments function', () => {
  const outPath = './src/api';

  it('should throw an error if the number of arguments is not equal to two', () => {
    mocked(getProcessArguments).mockReturnValueOnce([]);
    expect(validateArguments).toThrowError('Expecting two arguments');
  });

  it('should throw an error if the number of arguments is more than two', () => {
    mocked(getProcessArguments).mockReturnValueOnce(['cool', 'bro', 'yolo']);
    expect(validateArguments).toThrowError('Expecting two arguments');
  });
  it('should throw an error if the first argument is not a defined env var', () => {
    process.env.API_URL = undefined;
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL', outPath]);
    expect(validateArguments).toThrowError(
      'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse',
    );
  });

  it('should throw an error if the first argument is not an env var that contains an url', () => {
    process.env.API_URL = 'yolo';
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL', outPath]);
    expect(validateArguments).toThrowError(
      'Expecting an url as value from the environement variable provided. Example: https://cool.org/mySwagger/json',
    );
  });

  it('should return arguments', () => {
    const url = 'https://cool.org';
    process.env.API_URL = url;
    mocked(getProcessArguments).mockReturnValueOnce(['API_URL', outPath]);

    const data = validateArguments();

    expect(data.envVarName).toBe('API_URL');
    expect(data.outPath).toBe(outPath);
    expect(data.sourceUrl).toBe(url);
  });
});
