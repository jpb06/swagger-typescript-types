import * as openapi from '@apidevtools/openapi-schemas';
import Ajv from 'ajv-draft-04';

import { ApiJson } from '../../types/swagger-schema.interfaces';
import { displayError } from '../cli/console/console.messages';

export const validateSchema = async (rawJson: string): Promise<ApiJson> => {
  const ajv = new Ajv({
    allErrors: true,
    validateFormats: false,
    strictSchema: false,
    strictTypes: false,
  });

  const validate = ajv.compile<ApiJson>(openapi.openapiV3);

  const isValid = validate(rawJson);
  if (!isValid) {
    displayError(validate.errors);
    throw new Error('Invalid schema');
  }

  return rawJson as unknown as ApiJson;
};
