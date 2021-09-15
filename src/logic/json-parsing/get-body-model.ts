import { ApiContent } from '../../types/swagger-schema.interfaces';
import { getSchemaName } from './get-schema-name';

export interface BodyModel {
  model: string;
  underlyingModel?: string;
  isPrimitiveModel: boolean;
}

export const getBodyModel = (
  requestBody?: ApiContent,
): BodyModel | undefined => {
  if (!requestBody) {
    return undefined;
  }

  const schema = requestBody.content['application/json'].schema;

  if (schema.$ref) {
    return {
      model: getSchemaName(schema.$ref),
      isPrimitiveModel: false,
    };
  } else if (schema.type === 'array' && schema.items) {
    if (schema.items?.$ref) {
      const modelName = getSchemaName(schema.items.$ref);
      return {
        model: `Array<${modelName}>`,
        underlyingModel: modelName,
        isPrimitiveModel: false,
      };
    } else if (schema.items?.type) {
      return {
        model: `Array<${schema.items.type}>`,
        isPrimitiveModel: true,
      };
    } else if (schema.type) {
      return {
        model: schema.type,
        isPrimitiveModel: true,
      };
    }
  }
};
