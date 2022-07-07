import { fetchSwaggerJson } from './logic/fetching/fetch-swagger-json-file';
import { readSwaggerJsonFile } from './logic/fetching/read-swagger-json-file';
import { generateTypesDefinitions } from './logic/ts-generation/generate-types-definitions';
import { validateSchema } from './logic/validation/validate-schema';
import { InputSwaggerJson } from './types/input-swagger-json.interface';
import { ValidatedOpenaApiSchema } from './types/swagger-schema.interfaces';

export {
  readSwaggerJsonFile,
  fetchSwaggerJson,
  validateSchema,
  generateTypesDefinitions,
};

export type { InputSwaggerJson, ValidatedOpenaApiSchema };
