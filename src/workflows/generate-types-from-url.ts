import { fetchSwaggerJson } from './logic/fetch-swagger-json-file';
import { generateTypesDefinitions } from './logic/generate-types-definitions';
import { validateSchema } from './logic/validate-schema';

export const generateTypesFromUrl = async (url: string, outPath: string) => {
  const data = await fetchSwaggerJson(url);
  const schema = await validateSchema(data);
  await generateTypesDefinitions(schema, outPath);
};
