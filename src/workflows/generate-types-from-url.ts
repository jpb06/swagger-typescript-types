import { fetchSwaggerJson } from '../logic/fetching/fetch-swagger-json-file';
import { generateTypesDefinitions } from '../logic/ts-generation/generate-types-definitions';
import { validateSchema } from '../logic/validation/validate-schema';
import { GenerationResult } from '../types/generation-result.interface';

export type GenerateTypesFromUrlArguments = {
  swaggerJsonUrl: string;
  outputPath: string;
};

export const generateTypesFromUrl = async ({
  swaggerJsonUrl,
  outputPath,
}: GenerateTypesFromUrlArguments): Promise<GenerationResult> => {
  const data = await fetchSwaggerJson(swaggerJsonUrl);
  const schema = await validateSchema(data);

  return generateTypesDefinitions(outputPath, schema);
};
