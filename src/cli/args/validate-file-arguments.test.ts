import { pathExists } from 'fs-extra';
import { mocked } from 'jest-mock';

import { getProcessArguments } from './process-argv.indirection';
import { validateFileArguments } from './validate-file-arguments';

jest.mock('./process-argv.indirection');
jest.mock('fs-extra');

describe('validateFileArguments function', () => {
  const inputPath = './cool';
  const outputPath = './bro';

  it('should throw an error if the number of arguments is not equal to two', async () => {
    mocked(getProcessArguments).mockReturnValueOnce([]);

    await expect(validateFileArguments).rejects.toThrow(
      'Expecting two arguments: intput path and output path',
    );
  });

  it('should throw an error if the number of arguments is more than two', async () => {
    mocked(getProcessArguments).mockReturnValueOnce([
      'cool',
      'bro',
      'yolo',
      'yola',
    ]);

    await expect(validateFileArguments).rejects.toThrow(
      'Expecting two arguments: intput path and output path',
    );
  });

  it('should throw an error if input path does not exist', async () => {
    mocked(pathExists).mockResolvedValueOnce(false as never);
    mocked(getProcessArguments).mockReturnValueOnce([inputPath, outputPath]);

    await expect(validateFileArguments).rejects.toThrow(
      `${inputPath} does not exist`,
    );
  });

  it('should return arguments', async () => {
    mocked(pathExists).mockResolvedValueOnce(true as never);
    mocked(getProcessArguments).mockReturnValueOnce([inputPath, outputPath]);

    const data = await validateFileArguments();

    expect(data.inputPath).toBe(inputPath);
    expect(data.outputPath).toBe(outputPath);
  });
});
