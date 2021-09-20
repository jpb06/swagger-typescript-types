import chalk from 'chalk';

export const displaySuccess = (outPath: string): void => {
  // eslint-disable-next-line no-console
  console.info(
    `${chalk.cyanBright('swagger-typescript-types')} 🚀 - ${chalk.green(
      'Types generated and saved in',
    )} ${chalk.underline.cyanBright(outPath)}`,
  );
};

export const displayError = (err: unknown): void => {
  console.error(
    `${chalk.cyanBright('swagger-typescript-types')} ❌ - ${chalk.redBright(
      (err as { message: string }).message,
    )}`,
  );
};

export const displayWarning = (text: string, id?: string): void => {
  console.error(
    `${chalk.cyanBright('swagger-typescript-types')} 🚨 - ${
      id ? `${chalk.magentaBright(id)}:` : ''
    } ${chalk.redBright(text)}`,
  );
};
