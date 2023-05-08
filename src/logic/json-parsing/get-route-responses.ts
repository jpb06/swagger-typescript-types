import {
  ApiContent,
  ApiTypeDefinition,
} from '../../types/swagger-schema.interfaces';

import { getRouteResponseModel } from './get-route-response-model';

export interface RouteResponse {
  statusCode: string;
  model: string;
  isPrimitiveModel: boolean;
  underlyingModel?: string;
}

export const getRouteResponses = (
  operationId: string,
  responses: {
    [key: string]: ApiContent;
  },
): Array<RouteResponse> => {
  const routeResponses: Array<RouteResponse> = [];

  for (const [statusCode, { content }] of Object.entries(responses)) {
    if (
      content &&
      'application/json' in content &&
      content['application/json'].schema
    ) {
      const schema = content['application/json'].schema;
      if ('oneOf' in schema) {
        routeResponses.push(
          ...schema.oneOf.map((el) =>
            getRouteResponseModel(operationId, el, statusCode),
          ),
        );
      } else {
        routeResponses.push(
          getRouteResponseModel(
            operationId,
            schema as ApiTypeDefinition,
            statusCode,
          ),
        );
      }
    } else {
      routeResponses.push(getRouteResponseModel(operationId, {}, statusCode));
    }
  }

  return routeResponses;
};
