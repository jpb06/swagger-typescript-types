import { fetchSwaggerJson } from '../logic/fetching/fetch-swagger-json-file';
import { generateTypesDefinitions } from '../logic/ts-generation/generate-types-definitions';
import { validateSchema } from '../logic/validation/validate-schema';

export type GenerateTypesFromUrlArguments = {
  sourceUrl: string;
  envVarName: string;
  shouldClearOutPath?: boolean;
  shouldCallEslint?: boolean;
};

export const generateTypesFromUrl = async ({
  sourceUrl,
  envVarName,
  shouldClearOutPath = false,
  shouldCallEslint = false,
}: GenerateTypesFromUrlArguments): Promise<void> => {
  const data = await fetchSwaggerJson(sourceUrl);
  const schema = await validateSchema(data);

  await generateTypesDefinitions(
    envVarName,
    schema,
    shouldClearOutPath,
    shouldCallEslint,
  );
};
