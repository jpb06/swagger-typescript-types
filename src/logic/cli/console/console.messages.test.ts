import chalk from 'chalk';

import { displayError, displaySuccess } from './console.messages';

jest.mock('chalk', () => ({
  cyanBright: jest.fn(),
  greenBright: jest.fn(),
  redBright: jest.fn(),
  whiteBright: jest.fn(),
  underline: {
    cyanBright: jest.fn(),
  },
}));
global.console = { info: jest.fn(), error: jest.fn() } as unknown as Console;

describe('displaySuccess function', () => {
  const outPath = './src/api';

  beforeEach(() => jest.clearAllMocks());

  it('should call console.info', () => {
    displaySuccess(outPath, {
      endpointsCount: 5,
      typesGenerated: true,
    });

    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    displaySuccess(outPath, {
      endpointsCount: 5,
      typesGenerated: true,
    });

    expect(chalk.cyanBright).toHaveBeenCalledWith('swagger-typescript-types');
  });

  it('should display sucess message in green and the number of handled endpoints', () => {
    displaySuccess(outPath, {
      endpointsCount: 5,
      typesGenerated: true,
    });

    expect(chalk.greenBright).toHaveBeenCalledTimes(2);
    expect(chalk.greenBright).toHaveBeenNthCalledWith(1, 5);
    expect(chalk.greenBright).toHaveBeenNthCalledWith(
      2,
      'Types generated and saved in',
    );
  });

  it('should display the outpath in cyan underlined', () => {
    displaySuccess(outPath, {
      endpointsCount: 5,
      typesGenerated: true,
    });

    expect(chalk.underline.cyanBright).toHaveBeenCalledWith(outPath);
  });

  it('should report nothing was generated', () => {
    displaySuccess(outPath, {
      endpointsCount: 0,
      typesGenerated: false,
    });

    expect(chalk.whiteBright).toHaveBeenCalledWith('Nothing was generated');
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
