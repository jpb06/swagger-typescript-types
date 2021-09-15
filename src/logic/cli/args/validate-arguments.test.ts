import { mocked } from 'ts-jest/utils';

import { getProcessArguments } from './process-argv.indirection';
import { validateArguments } from './validate-arguments';

jest.mock('./process-argv.indirection');

describe('validateArguments function', () => {
  it('should throw an error if the number of arguments less than two', () => {
    mocked(getProcessArguments).mockReturnValueOnce([]);
    expect(validateArguments).toThrowError('Expecting two arguments');
  });

  it('should throw an error if the first argument is not an url', () => {
    mocked(getProcessArguments).mockReturnValueOnce(['cool', 'bro']);
    expect(validateArguments).toThrowError(
      'Expecting an url as first parameter. Example: https://cool.org/mySwagger/json',
    );
  });

  it('should throw an error if second argument is an empty string', () => {
    mocked(getProcessArguments).mockReturnValueOnce(['https://cool.org', '']);
    expect(validateArguments).toThrowError(
      'Expecting a path as second argument to write the extracted types. Example: ./src/types/api-types.ts',
    );
  });

  it('should return arguments', () => {
    const url = 'https://cool.org';
    const outPath = './src/cool.ts';
    mocked(getProcessArguments).mockReturnValueOnce([url, outPath]);

    const data = validateArguments();

    expect(data.outPath).toBe(outPath);
    expect(data.sourceUrl).toBe(url);
    expect(data.shouldCallEslint).toBe(false);
    expect(data.shouldClearOutPath).toBe(false);
  });

  it('should return additional flags if provided', () => {
    const url = 'https://cool.org';
    const outPath = './src/cool.ts';
    mocked(getProcessArguments).mockReturnValueOnce([
      url,
      outPath,
      '--clear',
      '--lint',
    ]);

    const data = validateArguments();

    expect(data.outPath).toBe(outPath);
    expect(data.sourceUrl).toBe(url);
    expect(data.shouldCallEslint).toBe(true);
    expect(data.shouldClearOutPath).toBe(true);
  });
});
