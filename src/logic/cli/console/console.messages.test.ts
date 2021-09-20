import chalk from 'chalk';

import { displayError, displaySuccess } from './console.messages';

jest.mock('chalk', () => ({
  cyanBright: jest.fn(),
  green: jest.fn(),
  redBright: jest.fn(),
  underline: {
    cyanBright: jest.fn(),
  },
}));
global.console = { info: jest.fn(), error: jest.fn() } as unknown as Console;

describe('displaySuccess function', () => {
  const outPath = './src/api';

  it('should call console.info', () => {
    displaySuccess(outPath);

    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    displaySuccess(outPath);

    expect(chalk.cyanBright).toHaveBeenCalledWith('swagger-typescript-types');
  });

  it('should display sucess message in green', () => {
    displaySuccess(outPath);

    expect(chalk.green).toHaveBeenCalledWith('Types generated and saved in');
  });

  it('should display the outpath in cyan underlined', () => {
    displaySuccess(outPath);

    expect(chalk.underline.cyanBright).toHaveBeenCalledWith(outPath);
  });
});

describe('displayError function', () => {
  const errorMessage = 'oh no!';

  it('should call console.error', () => {
    displayError({ message: errorMessage });

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    displayError({ message: errorMessage });

    expect(chalk.cyanBright).toHaveBeenCalledWith('swagger-typescript-types');
  });

  it('should display the error message in red', () => {
    displayError({ message: errorMessage });

    expect(chalk.redBright).toHaveBeenCalledWith(errorMessage);
  });
});
