import { fetchSwaggerJson } from '../logic/fetching/fetch-swagger-json-file';
import { generateTypesDefinitions } from '../logic/ts-generation/generate-types-definitions';
import { validateSchema } from '../logic/validation/validate-schema';

export type GenerateTypesFromUrlArguments = {
  sourceUrl: string;
  outPath: string;
  shouldClearOutPath?: boolean;
  shouldCallEslint?: boolean;
};

export const generateTypesFromUrl = async ({
  sourceUrl,
  outPath,
  shouldClearOutPath = false,
  shouldCallEslint = false,
}: GenerateTypesFromUrlArguments) => {
  const data = await fetchSwaggerJson(sourceUrl);
  const schema = await validateSchema(data);

  await generateTypesDefinitions(
    schema,
    outPath,
    shouldClearOutPath,
    shouldCallEslint,
  );
};
