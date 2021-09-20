import { ApiContent } from '../../types/swagger-schema.interfaces';
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

  for (const [
    statusCode,
    {
      content: {
        'application/json': { schema },
      },
    },
  ] of Object.entries(responses)) {
    if ('oneOf' in schema) {
      routeResponses.push(
        ...schema.oneOf.map((el) =>
          getRouteResponseModel(operationId, el, statusCode),
        ),
      );
    } else {
      routeResponses.push(
        getRouteResponseModel(operationId, schema, statusCode),
      );
    }
  }

  return routeResponses;
};
