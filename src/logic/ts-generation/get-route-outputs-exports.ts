import { RouteResponse } from '../json-parsing/get-route-responses';

export const getRouteOutputsExports = (responses: Array<RouteResponse>) =>
  responses.reduce(
    (exportsList, { statusCode, model }) =>
      exportsList + `export type Response${statusCode} = ${model};\n`,
    '',
  );
