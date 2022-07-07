import { generateTypesDefinitions } from './logic/ts-generation/generate-types-definitions';
import { validateSchema } from './logic/validation/validate-schema';
import { GenerationResult } from './types/generation-result.interface';
import { InputSwaggerJson } from './types/input-swagger-json.interface';
import { ValidatedOpenaApiSchema } from './types/swagger-schema.interfaces';
import {
  generateTypesFromFile,
  GenerateTypesFromFileArguments,
} from './workflows/generate-types-from-file';
import {
  generateTypesFromUrl,
  GenerateTypesFromUrlArguments,
} from './workflows/generate-types-from-url';

export {
  generateTypesFromFile,
  generateTypesFromUrl,
  validateSchema,
  generateTypesDefinitions,
};

export type {
  InputSwaggerJson,
  ValidatedOpenaApiSchema,
  GenerateTypesFromUrlArguments,
  GenerateTypesFromFileArguments,
  GenerationResult,
};
