import chalk from 'chalk';

import { ApiContent } from '../../types/swagger-schema.interfaces';
import { getSchemaName } from './get-schema-name';

export interface RouteResponse {
  statusCode: string;
  model: string;
  isPrimitiveModel: boolean;
  underlyingModel?: string;
}

export const getRouteResponses = (responses: {
  [key: string]: ApiContent;
}): Array<RouteResponse> => {
  const routeResponses: Array<RouteResponse> = [];

  for (const [
    statusCode,
    {
      content: {
        'application/json': {
          schema: { $ref, type, items },
        },
      },
    },
  ] of Object.entries(responses)) {
    if ($ref) {
      const modelName = getSchemaName($ref);
      routeResponses.push({
        statusCode,
        model: modelName,
        isPrimitiveModel: false,
      });
    } else if (type === 'array' && items) {
      if (items.$ref) {
        const modelName = getSchemaName(items.$ref);
        routeResponses.push({
          statusCode,
          model: `Array<${modelName}>`,
          underlyingModel: modelName,
          isPrimitiveModel: false,
        });
      } else if (items.type) {
        routeResponses.push({
          statusCode,
          model: `Array<${items.type}>`,
          isPrimitiveModel: true,
        });
      } else {
        console.error(
          chalk.redBright(
            `Unable to extract type for response ${statusCode}; given array without $ref or type`,
          ),
        );
        routeResponses.push({
          statusCode,
          model: 'undefined',
          isPrimitiveModel: true,
        });
      }
    } else if (type) {
      routeResponses.push({
        statusCode,
        model: type,
        isPrimitiveModel: true,
      });
    } else {
      console.error(
        chalk.redBright(
          `Unable to extract type for response ${statusCode}; no $ref or type provided`,
        ),
      );
      routeResponses.push({
        statusCode,
        model: 'undefined',
        isPrimitiveModel: true,
      });
    }
  }

  return routeResponses;
};
