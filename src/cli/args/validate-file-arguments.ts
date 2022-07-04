import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { GenerateTypesFromFileArguments } from '../../workflows/generate-types-from-file';

export const validateFileArguments = (): GenerateTypesFromFileArguments => {
  const argv = yargs(hideBin(process.argv))
    .scriptName('generateTypesFromFile')
    .usage(chalk.blueBright('$0 -i [swaggerJsonPath] -o [outputPath]'))
    .epilogue('Generates api types from a swagger json file')
    .example('$0 -i ./specs/swagger.json -o ./src/api/types', '')
    .describe('i', chalk.cyanBright('The path to the swagger json file'))
    .describe('o', chalk.cyanBright('Where to write the generated api types'))
    .demandOption(['i', 'o']).argv as { i: string; o: string };

  return { inputPath: argv.i, outputPath: argv.o };
};
