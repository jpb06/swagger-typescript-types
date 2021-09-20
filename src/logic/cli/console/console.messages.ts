/* eslint-disable no-console */
import chalk from 'chalk';

import { GenerationResult } from '../../../types/generation-result.interface';

export const displaySuccess = (
  outPath: string,
  { endpointsCount, typesGenerated }: GenerationResult,
): void => {
  const generated = typesGenerated || endpointsCount > 0;

  if (generated) {
    const summary = `${chalk.greenBright(endpointsCount)} endpoints treated`;
    console.info(
      `${chalk.cyanBright('swagger-typescript-types')} 🚀 - ${chalk.greenBright(
        'Types generated and saved in',
      )} ${chalk.underline.cyanBright(outPath)} (${summary})`,
    );
  } else {
    console.info(
      `${chalk.cyanBright('swagger-typescript-types')} 🤷 - ${chalk.whiteBright(
        'Nothing was generated',
      )}`,
    );
  }
};

export const displayError = (err: unknown): void => {
  console.error(
    `${chalk.cyanBright('swagger-typescript-types')} ❌ - ${chalk.redBright(
      (err as { message: string }).message,
    )}`,
  );
};

export const displayWarning = (text: string, id?: string): void => {
  const optionalId = id ? ` ${chalk.magentaBright(id)}:` : '';
  console.error(
    `${chalk.cyanBright(
      'swagger-typescript-types',
    )} 🚨 -${optionalId} ${chalk.redBright(text)}`,
  );
};
