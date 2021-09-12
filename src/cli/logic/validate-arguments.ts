import { getProcessArguments } from './process-argv.indirection';
import { urlRegex } from './url-regex';

export const validateArguments = () => {
  const args = getProcessArguments();
  if (args.length !== 2) {
    throw new Error('Expecting two arguments');
  }

  const sourceUrl = args[0];
  const outPath = args[1];

  if (!urlRegex.test(sourceUrl)) {
    throw new Error(
      'Expecting an url as first parameter. Example: https://cool.org/mySwagger/json',
    );
  }

  if (outPath.length === 0 || !outPath.endsWith('.ts')) {
    throw new Error(
      'Expecting a path as second argument to write the extracted types. Example: ./src/api-types.ts',
    );
  }

  return { sourceUrl, outPath };
};
