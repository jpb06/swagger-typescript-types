import { urlRegex } from './url-regex';

export const validateArguments = () => {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error('Expecting two arguments');
    process.exit(1);
  }

  const sourceUrl = args[0];
  const outPath = args[1];

  if (!urlRegex.test(sourceUrl)) {
    console.error(
      'Expecting an url as first parameter. Example: https://cool.org/mySwagger/json',
    );
    process.exit(1);
  }

  if (outPath.length === 0 || !outPath.endsWith('.ts')) {
    console.error(
      'Expecting a path as second argument to write the extracted types. Example: ./src/api-types.ts',
    );
    process.exit(1);
  }

  return { sourceUrl, outPath };
};
