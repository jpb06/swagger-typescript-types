import {
  ApiJson,
  ApiRouteParameter,
} from '../../types/swagger-schema.interfaces';
import { BodyModel, getBodyModel } from './get-body-model';
import { getRouteResponses, RouteResponse } from './get-route-responses';

export interface Route {
  id: string;
  summary?: string;
  description?: string;
  path: string;
  verb: string;
  parameters: Array<ApiRouteParameter>;
  bodyModel?: BodyModel;
  responses: Array<RouteResponse>;
}

export const getExposedEndpoints = (json: ApiJson): Array<Route> => {
  const routes: Array<Route> = [];

  for (const [path, verbs] of Object.entries(json.paths)) {
    for (const [
      verb,
      { operationId, responses, summary, description, requestBody, parameters },
    ] of Object.entries(verbs)) {
      const bodyModel = getBodyModel(operationId, requestBody);
      const routeResponses = getRouteResponses(operationId, responses);

      routes.push({
        id: operationId,
        summary,
        description,
        path,
        verb,
        parameters,
        bodyModel,
        responses: routeResponses,
      });
    }
  }

  return routes;
};
