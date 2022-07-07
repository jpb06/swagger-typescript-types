import { readSwaggerJsonFile } from '../logic/fetching/read-swagger-json-file';
import { generateTypesDefinitions } from '../logic/ts-generation/generate-types-definitions';
import { validateSchema } from '../logic/validation/validate-schema';
import { GenerationResult } from '../types/generation-result.interface';

export type GenerateTypesFromFileArguments = {
  inputPath: string;
  outputPath: string;
  importsNotUsedAsValues: boolean;
};

export const generateTypesFromFile = async ({
  inputPath,
  outputPath,
  importsNotUsedAsValues,
}: GenerateTypesFromFileArguments): Promise<GenerationResult> => {
  const data = await readSwaggerJsonFile(inputPath);
  const schema = await validateSchema(data);

  return generateTypesDefinitions(outputPath, schema, importsNotUsedAsValues);
};
