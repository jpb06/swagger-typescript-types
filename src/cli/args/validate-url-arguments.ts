import dotenv from 'dotenv-flow';

import { GenerateTypesFromUrlArguments } from '../../workflows/generate-types-from-url';
import { getProcessArguments } from './process-argv.indirection';

export const validateUrlArguments = (): GenerateTypesFromUrlArguments => {
  dotenv.config({ silent: true });
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
  if (!apiUrl || apiUrl === 'never') {
    throw new Error(
      'Expecting the name of an environement variable as first parameter. This env var should contain an url to the swagger json to parse',
    );
  }

  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  if (!urlRegex.test(apiUrl)) {
    throw new Error(
      'Expecting an url as value from the environement variable provided. Example: https://cool.org/mySwagger',
    );
  }

  return {
    apiUrl,
    apiJsonPath,
    outPath,
    envVarName,
  };
};
