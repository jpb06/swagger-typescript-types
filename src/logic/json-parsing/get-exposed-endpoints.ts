import {
  ValidatedOpenaApiSchema,
  ApiRouteParameter,
} from '../../types/swagger-schema.interfaces';

import { BodyModel, getBodyModel } from './get-body-model';
import { getRouteResponses, RouteResponse } from './get-route-responses';

export interface Route {
  id: string;
  summary?: string;
  description?: string;
  path: string;
  method: string;
  parameters: Array<ApiRouteParameter>;
  bodyModel?: BodyModel;
  responses: Array<RouteResponse>;
}

export const getExposedEndpoints = (
  json: ValidatedOpenaApiSchema,
): Array<Route> => {
  const routes: Array<Route> = [];

  for (const [path, methods] of Object.entries(json.paths)) {
    for (const [
      method,
      { operationId, responses, summary, description, requestBody, parameters },
    ] of Object.entries(methods)) {
      const bodyModel = getBodyModel(operationId, requestBody);
      const routeResponses = getRouteResponses(operationId, responses);

      routes.push({
        id: operationId,
        summary,
        description,
        path,
        method,
        parameters,
        bodyModel,
        responses: routeResponses,
      });
    }
  }

  return routes;
};
