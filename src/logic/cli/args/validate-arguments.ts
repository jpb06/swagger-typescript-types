import { GenerateTypesFromUrlArguments } from '../../../workflows/generate-types-from-url';
import { urlRegex } from '../url-regex';
import { getProcessArguments } from './process-argv.indirection';

export const validateArguments = (): GenerateTypesFromUrlArguments => {
  const args = getProcessArguments();
  if (args.length < 2) {
    throw new Error(
      'Expecting two arguments: swaggerJsonSourceUrl and outPath',
    );
  }

  const sourceUrl = args[0];
  const outPath = args[1];

  if (!urlRegex.test(sourceUrl)) {
    throw new Error(
      'Expecting an url as first parameter. Example: https://cool.org/mySwagger/json',
    );
  }

  if (outPath.length === 0) {
    throw new Error(
      'Expecting a path as second argument to write the extracted types. Example: ./src/types/api-types.ts',
    );
  }

  const flags = args.splice(2);

  let shouldClearOutPath = false;
  if (flags.includes('--clear')) {
    shouldClearOutPath = true;
  }

  let shouldCallEslint = false;
  if (flags.includes('--lint')) {
    shouldCallEslint = true;
  }

  return { sourceUrl, outPath, shouldClearOutPath, shouldCallEslint };
};
