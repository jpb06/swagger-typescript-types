import { runCommand } from '../../tests-related/run-command';

describe('validateFileArguments function', () => {
  const validateArgumentsPath = './../cli/args/validate-file-arguments';
  const inputPath = './src/swagger.json';
  const outputPath = './src/api';
  global.console = { error: jest.fn() } as unknown as Console;
  const mockExit = jest
    .spyOn(process, 'exit')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .mockImplementation((() => {}) as (code?: number | undefined) => never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display an error when no -i option was given', async () => {
    runCommand(validateArgumentsPath, '-o', outputPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: i');
  });

  it('should display an error when no -o option was given', async () => {
    runCommand(validateArgumentsPath, '-i', inputPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: o');
  });

  it('should return args', async () => {
    const args = runCommand(
      validateArgumentsPath,
      '-i',
      inputPath,
      '-o',
      outputPath,
    );

    expect(args).toStrictEqual({
      inputPath,
      outputPath,
    });
  });
});
