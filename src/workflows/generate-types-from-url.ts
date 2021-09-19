import { fetchSwaggerJson } from '../logic/fetching/fetch-swagger-json-file';
import { generateTypesDefinitions } from '../logic/ts-generation/generate-types-definitions';
import { validateSchema } from '../logic/validation/validate-schema';

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
  envVarName,
}: GenerateTypesFromUrlArguments): Promise<void> => {
  const data = await fetchSwaggerJson(`${apiUrl}/${apiJsonPath}`);
  const schema = await validateSchema(data);

  await generateTypesDefinitions(envVarName, outPath, schema);
};
