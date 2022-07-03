import { fetchSwaggerJson } from '../logic/fetching/fetch-swagger-json-file';
import { generateTypesDefinitions } from '../logic/ts-generation/generate-types-definitions';
import { validateSchema } from '../logic/validation/validate-schema';
import { GenerationResult } from '../types/generation-result.interface';

export type GenerateTypesFromUrlArguments = {
  apiUrl: string;
  apiJsonPath: string;
  outPath: string;
  envVarName: string;
};

export const generateTypesFromUrl = async ({
  apiUrl,
  apiJsonPath,
  outPath,
}: GenerateTypesFromUrlArguments): Promise<GenerationResult> => {
  const data = await fetchSwaggerJson(`${apiUrl}/${apiJsonPath}`);
  const schema = await validateSchema(data);

  return generateTypesDefinitions(outPath, schema);
};
