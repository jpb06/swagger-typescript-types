import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { GenerateTypesFromFileArguments } from '../../workflows/generate-types-from-file';

type Argv = { i: string; o: string; t: boolean };

export const validateArguments = (): GenerateTypesFromFileArguments => {
  const argv = yargs(hideBin(process.argv))
    .scriptName('generateTypesFromFile')
    .usage(chalk.blueBright('$0 -i [swaggerJsonPath] -o [outputPath] -t'))
    .epilogue('Generates api types from a swagger json file')
    .example('$0 -i ./specs/swagger.json -o ./src/api/types', '')
    .describe('i', chalk.cyanBright('The path to the swagger json file'))
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
    .demandOption(['i', 'o']).argv as Argv;

  return {
    inputPath: argv.i,
    outputPath: argv.o,
    importsNotUsedAsValues: argv.t,
  };
};
