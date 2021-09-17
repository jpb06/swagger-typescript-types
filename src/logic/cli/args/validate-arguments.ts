import dotenv from 'dotenv';

import { GenerateTypesFromUrlArguments } from '../../../workflows/generate-types-from-url';
import { urlRegex } from '../url-regex';
import { getProcessArguments } from './process-argv.indirection';

export const validateArguments = (): GenerateTypesFromUrlArguments => {
  dotenv.config();
  const args = getProcessArguments();

  const errorMessage =
    'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse';
  if (args.length === 0) {
    throw new Error(errorMessage);
  }

  const envVarName = args[0];

  const sourceUrl = process.env[envVarName];
  if (!sourceUrl || sourceUrl === 'undefined') {
    throw new Error(errorMessage);
  }
  if (!urlRegex.test(sourceUrl)) {
    throw new Error(
      'Expecting an url as value from the environement variable provided. Example: https://cool.org/mySwagger/json',
    );
  }

  const flags = args.splice(1);

  let shouldClearOutPath = false;
  if (flags.includes('--clear')) {
    shouldClearOutPath = true;
  }

  let shouldCallEslint = false;
  if (flags.includes('--lint')) {
    shouldCallEslint = true;
  }

  return {
    sourceUrl,
    envVarName,
    shouldClearOutPath,
    shouldCallEslint,
  };
};
