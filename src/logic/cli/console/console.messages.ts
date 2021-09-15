import chalk from 'chalk';

export const reportSuccess = (outPath: string) => {
  // eslint-disable-next-line no-console
  console.info(
    `${chalk.cyanBright('swagger-typescript-types')} : 🚀 - ${chalk.green(
      'Types generated and saved in',
    )} ${chalk.underline.cyanBright(outPath)}`,
  );
};

export const reportError = (err: unknown) => {
  console.error(
    `${chalk.cyanBright('swagger-typescript-types')} : ❌ - ${chalk.redBright(
      (err as { message: string }).message,
    )}`,
  );
};
