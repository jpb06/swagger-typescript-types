import { ApiTypeDefinition } from '../../types/swagger-schema.interfaces';
import { displayWarning } from '../cli/console/console.messages';

import { RouteResponse } from './get-route-responses';
import { getSchemaName } from './get-schema-name';

export const getRouteResponseModel = (
  operationId: string,
  { $ref, items, type }: ApiTypeDefinition,
  statusCode: string,
): RouteResponse => {
  if ($ref) {
    return {
      statusCode,
      model: getSchemaName($ref),
      isPrimitiveModel: false,
    };
  } else if (type === 'array' && items) {
    if (items.$ref) {
      const modelName = getSchemaName(items.$ref);
      return {
        statusCode,
        model: `Array<${modelName}>`,
        underlyingModel: modelName,
        isPrimitiveModel: false,
      };
    } else if (items.type) {
      return {
        statusCode,
        model: `Array<${items.type}>`,
        isPrimitiveModel: true,
      };
    }

    displayWarning(`No type provided for response ${statusCode}`, operationId);
    return {
      statusCode,
      model: 'never',
      isPrimitiveModel: true,
    };
  } else if (type) {
    return {
      statusCode,
      model: type,
      isPrimitiveModel: true,
    };
  }

  displayWarning(`No type provided for response ${statusCode}`, operationId);
  return {
    statusCode,
    model: 'never',
    isPrimitiveModel: true,
  };
};
