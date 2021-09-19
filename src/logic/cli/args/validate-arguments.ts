import dotenv from 'dotenv';

import { GenerateTypesFromUrlArguments } from '../../../workflows/generate-types-from-url';
import { urlRegex } from '../url-regex';
import { getProcessArguments } from './process-argv.indirection';

export const validateArguments = (): GenerateTypesFromUrlArguments => {
  dotenv.config();
  const args = getProcessArguments();
  if (args.length !== 3) {
    throw new Error(
      'Expecting three arguments: api url, json path and output path',
    );
  }

  const envVarName = args[0];
  const apiJsonPath = args[1];
  const outPath = args[2];

  const apiUrl = process.env[envVarName];
  if (!apiUrl || apiUrl === 'undefined') {
    throw new Error(
      'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse',
    );
  }
  if (!urlRegex.test(apiUrl)) {
    throw new Error(
      'Expecting an url as value from the environement variable provided. Example: https://cool.org/mySwagger/json',
    );
  }

  return {
    apiUrl,
    apiJsonPath,
    outPath,
    envVarName,
  };
};
