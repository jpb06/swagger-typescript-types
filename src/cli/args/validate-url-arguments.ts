import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { GenerateTypesFromUrlArguments } from '../../workflows/generate-types-from-url';

type Argv = { u: string; o: string; t: boolean };

export const validateArguments = (): GenerateTypesFromUrlArguments => {
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
    .describe(
      't',
      chalk.cyanBright(
        'Whether types should be exported with the `export type ...` syntax (importsNotUsedAsValues option)',
      ),
    )
    .default('t', false)
    .boolean('t')
    .locale('en')
    .check((args) => {
      const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
      if (!urlRegex.test(args.u as string)) {
        throw new Error(
          chalk.bold.redBright('Errors:\n-u\t\tExpecting an url\n'),
        );
      }

      return true;
    })
    .demandOption(['u', 'o']).argv as Argv;

  return {
    swaggerJsonUrl: argv.u,
    outputPath: argv.o,
    importsNotUsedAsValues: argv.t,
  };
};
