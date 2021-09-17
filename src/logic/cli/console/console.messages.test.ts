import chalk from 'chalk';

import { outPath } from '../../constants/out-path';
import { reportError, reportSuccess } from './console.messages';

jest.mock('chalk', () => ({
  cyanBright: jest.fn(),
  green: jest.fn(),
  redBright: jest.fn(),
  underline: {
    cyanBright: jest.fn(),
  },
}));
global.console = { info: jest.fn(), error: jest.fn() } as unknown as Console;

describe('reportSuccess function', () => {
  it('should call console.info', () => {
    reportSuccess();

    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    reportSuccess();

    expect(chalk.cyanBright).toHaveBeenCalledWith('swagger-typescript-types');
  });

  it('should display sucess message in green', () => {
    reportSuccess();

    expect(chalk.green).toHaveBeenCalledWith('Types generated and saved in');
  });

  it('should display the outpath in cyan underlined', () => {
    reportSuccess();

    expect(chalk.underline.cyanBright).toHaveBeenCalledWith(outPath);
  });
});

describe('reportError function', () => {
  const errorMessage = 'oh no!';

  it('should call console.error', () => {
    reportError({ message: errorMessage });

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    reportError({ message: errorMessage });

    expect(chalk.cyanBright).toHaveBeenCalledWith('swagger-typescript-types');
  });

  it('should display the error message in red', () => {
    reportError({ message: errorMessage });

    expect(chalk.redBright).toHaveBeenCalledWith(errorMessage);
  });
});
