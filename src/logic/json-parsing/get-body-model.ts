import { getSchemaName } from './get-schema-name';
import {
  ApiContent,
  ApiTypeDefinition,
} from '../../types/swagger-schema.interfaces';
import { displayWarning } from '../cli/console/console.messages';

export interface BodyModel {
  model: string;
  underlyingModel?: string;
  isPrimitiveModel: boolean;
}

export const getBodyModel = (
  operationId: string,
  requestBody?: ApiContent,
): BodyModel | undefined => {
  if (!requestBody) {
    return undefined;
  }

  const schema = requestBody.content['application/json']
    .schema as ApiTypeDefinition;

  if (schema.$ref) {
    return {
      model: getSchemaName(schema.$ref),
      isPrimitiveModel: false,
    };
  }

  if (schema.type) {
    if (schema.type === 'array' && schema.items) {
      if (schema.items.$ref) {
        const modelName = getSchemaName(schema.items.$ref);
        return {
          model: `Array<${modelName}>`,
          underlyingModel: modelName,
          isPrimitiveModel: false,
        };
      }

      if (schema.items.type) {
        return {
          model: `Array<${schema.items.type}>`,
          isPrimitiveModel: true,
        };
      }

      displayWarning(
        `Unable to extract type for request body; given array without $ref or type`,
        operationId,
      );
      return undefined;
    }

    return {
      model: schema.type,
      isPrimitiveModel: true,
    };
  }
};
