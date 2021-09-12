import { validateArguments } from './validate-arguments';

describe('validateArguments function', () => {
  it('should throw an error if the number of arguments is not equal to two', () => {
    expect(validateArguments).toThrowError('Expecting two arguments');
  });

  it('should throw an error if the number of arguments is not equal to two', () => {
    process.argv = ['node', 'jest', '--arg1'];
    expect(validateArguments).toThrowError('Expecting two arguments');
  });

  it('should throw an error if the first argument is not an url', () => {
    process.argv = ['node', 'jest', 'cool', 'bro'];
    expect(validateArguments).toThrowError(
      'Expecting an url as first parameter. Example: https://cool.org/mySwagger/json',
    );
  });

  it('should throw an error if second argument is an empty string', () => {
    process.argv = ['node', 'jest', 'https://cool.org', ''];
    expect(validateArguments).toThrowError(
      'Expecting a path as second argument to write the extracted types. Example: ./src/api-types.ts',
    );
  });

  it('should throw an error if second argument does not en with .ts', () => {
    process.argv = ['node', 'jest', 'https://cool.org', 'cool.jpg'];
    expect(validateArguments).toThrowError(
      'Expecting a path as second argument to write the extracted types. Example: ./src/api-types.ts',
    );
  });

  it('should return arguments', () => {
    const url = 'https://cool.org';
    const outPath = './src/cool.ts';
    process.argv = ['node', 'jest', url, outPath];

    const data = validateArguments();

    expect(data.outPath).toBe(outPath);
    expect(data.sourceUrl).toBe(url);
  });
});
