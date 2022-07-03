import { pathExists } from 'fs-extra';

import { GenerateTypesFromFileArguments } from '../../workflows/generate-types-from-file';
import { getProcessArguments } from './process-argv.indirection';

export const validateFileArguments =
  async (): Promise<GenerateTypesFromFileArguments> => {
    const args = getProcessArguments();
    if (args.length !== 2) {
      throw new Error('Expecting two arguments: intput path and output path');
    }

    const inputPath = args[0];
    const outputPath = args[1];

    const exists = await pathExists(inputPath);
    if (!exists) {
      throw new Error(`${inputPath} does not exist`);
    }

    return {
      inputPath,
      outputPath,
    };
  };
