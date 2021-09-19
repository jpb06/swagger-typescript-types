import dotenv from 'dotenv';

import { GenerateTypesFromUrlArguments } from '../../../workflows/generate-types-from-url';
import { urlRegex } from '../url-regex';
import { getProcessArguments } from './process-argv.indirection';

export const validateArguments = (): GenerateTypesFromUrlArguments => {
  dotenv.config();
  const args = getProcessArguments();
  if (args.length !== 2) {
    throw new Error('Expecting two arguments');
  }

  const envVarName = args[0];
  const outPath = args[1];

  const sourceUrl = process.env[envVarName];
  if (!sourceUrl || sourceUrl === 'undefined') {
    throw new Error(
      'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse',
    );
  }
  if (!urlRegex.test(sourceUrl)) {
    throw new Error(
      'Expecting an url as value from the environement variable provided. Example: https://cool.org/mySwagger/json',
    );
  }

  return {
    sourceUrl,
    outPath,
    envVarName,
  };
};
