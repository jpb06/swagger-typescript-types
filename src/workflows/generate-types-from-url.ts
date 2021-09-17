import { fetchSwaggerJson } from '../logic/fetching/fetch-swagger-json-file';
import { generateTypesDefinitions } from '../logic/ts-generation/generate-types-definitions';
import { validateSchema } from '../logic/validation/validate-schema';

export type GenerateTypesFromUrlArguments = {
  sourceUrl: string;
  envVarName: string;
};

export const generateTypesFromUrl = async ({
  sourceUrl,
  envVarName,
}: GenerateTypesFromUrlArguments): Promise<void> => {
  const data = await fetchSwaggerJson(sourceUrl);
  const schema = await validateSchema(data);

  await generateTypesDefinitions(envVarName, schema);
};
