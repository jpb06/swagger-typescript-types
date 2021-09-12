import * as openapi from '@apidevtools/openapi-schemas';
import Ajv from 'ajv-draft-04';

import { ApiJson } from '../../types/swagger-schema.interfaces';

export const validateSchema = async (rawJson: string): Promise<ApiJson> => {
  const ajv = new Ajv({
    allErrors: true,
    validateFormats: false,
    strictSchema: false,
    strictTypes: false,
  });

  const validate = ajv.compile(openapi.openapiV3);

  const isValid = validate(rawJson);
  if (!isValid) {
    throw new Error('Invalid schema');
  }

  return rawJson as unknown as ApiJson;
};
