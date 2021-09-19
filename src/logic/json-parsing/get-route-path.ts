import chalk from 'chalk';

import {
  ApiRouteParameter,
  ApiTypeDefinition,
} from '../../types/swagger-schema.interfaces';
import { getSchemaName } from './get-schema-name';

const getModel = (name: string, schema: ApiTypeDefinition): string => {
  if (schema.$ref) {
    return getSchemaName(schema.$ref);
  }

  if (schema.type) {
    if (schema.type === 'array' && schema.items) {
      if (schema.items.$ref) {
        return `Array<${getSchemaName(schema.items.$ref)}>`;
      } else if (schema.items.type) {
        return `Array<${schema.items.type}>`;
      }

      console.error(
        chalk.redBright(
          `Unable to extract type from ${name}; given array without $ref or type`,
        ),
      );
      return 'undefined';
    }

    return schema.type;
  }

  console.error(
    chalk.redBright(
      `Unable to extract type from ${name}; no $ref or type provided`,
    ),
  );
  return 'undefined';
};

export const getRoutePath = (
  envVarName: string,
  rawPath: string,
  parameters: Array<ApiRouteParameter>,
): string => {
  const root = '${process.env.' + envVarName + '}';
  const pathParameters = parameters.filter((el) => el.in === 'path');
  const path = rawPath.replace(/{/g, '${');

  if (pathParameters.length === 0) {
    return `export const path = \`${root}${path}\`;`;
  }

  const functionParameters = pathParameters.reduce<Array<string>>(
    (output, { name, required, schema }) => {
      const paramName = `${name}${required ? '' : '?'}`;
      const model = getModel(name, schema);

      return [...output, `${paramName}: ${model}`];
    },
    [],
  );

  return `export const getPath = (${functionParameters.join(
    ', ',
  )}): string => \`${root}${path}\`;`;
};
