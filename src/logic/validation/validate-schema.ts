import { InputSwaggerJson } from '../../types/input-swagger-json.interface';
import { ValidatedOpenaApiSchema } from '../../types/swagger-schema.interfaces';
import { displayWarning } from '../cli/console/console.messages';

const validate = (rawJson: InputSwaggerJson): void => {
  if (!rawJson.components?.schemas) {
    throw new Error(
      `Schema validation failure: missing components.schemas property`,
    );
  }
  if (Object.keys(rawJson.components.schemas).length === 0) {
    displayWarning(
      'This api definition does not expose any schema. No types will be generated',
    );
  }

  if (!rawJson.paths) {
    throw new Error(`Schema validation failure: missing paths property`);
  }
  if (Object.keys(rawJson.paths).length === 0) {
    throw new Error(
      `This api definition does not expose any endpoint. Nothing to generate`,
    );
  }
};

export const validateSchema = async (
  rawJson: InputSwaggerJson,
): Promise<ValidatedOpenaApiSchema> => {
  validate(rawJson);

  return rawJson as unknown as ValidatedOpenaApiSchema;
};
