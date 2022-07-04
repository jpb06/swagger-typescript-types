import chalk from 'chalk';
import dotenv from 'dotenv-flow';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { GenerateTypesFromUrlArguments } from '../../workflows/generate-types-from-url';

export const validateUrlArguments = (): GenerateTypesFromUrlArguments => {
  dotenv.config({ silent: true });

  const argv = yargs(hideBin(process.argv))
    .scriptName('generateTypesFromUrl')
    .usage(chalk.blueBright('$0 -u [swaggerUrl] -o [outputPath]'))
    .epilogue('Generates api types from the json of an exposed swagger')
    .example(
      '$0 -u https://rhf-mui-nx-sandbox-back.herokuapp.com/-json -o ./src/api/types',
      '',
    )
    .describe('u', chalk.cyanBright('Swagger json url'))
    .describe('o', chalk.cyanBright('Where to write the generated api types'))
    .check((args) => {
      const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
      if (!urlRegex.test(args.u as string)) {
        throw new Error(
          chalk.bold.redBright('Errors:\n-u\t\tExpecting an url\n'),
        );
      }

      return true;
    })
    .demandOption(['u', 'o']).argv as { u: string; o: string };

  return { swaggerJsonUrl: argv.u, outputPath: argv.o };
};
