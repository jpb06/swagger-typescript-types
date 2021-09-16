import { ApiRouteParameter } from '../../types/swagger-schema.interfaces';
import { getSchemaName } from './get-schema-name';

export const getRoutePath = (
  envVarName: string,
  rawPath: string,
  parameters: Array<ApiRouteParameter>,
): string => {
  const root = '${process.env.' + envVarName + '}';
  const pathParameters = parameters.filter((el) => el.in === 'path');
  if (pathParameters.length === 0) {
    return `export const path = \`${root}${rawPath}\`;`;
  }

  const functionParameters = pathParameters.reduce<Array<string>>(
    (output, { name, required, schema }) => {
      const paramName = `${name}${required ? '' : '?'}`;

      let model = '';
      if (schema.$ref) {
        model = getSchemaName(schema.$ref);
      } else if (schema.type === 'array') {
        if (schema.items?.$ref) {
          model = getSchemaName(schema.items.$ref);
        } else if (schema.items?.type) {
          model = schema.items?.type;
        }
      } else if (schema.type) {
        model = schema.type;
      }

      return [...output, `${paramName}: ${model}`];
    },
    [],
  );

  return `export const getPath = (${functionParameters.join(
    ', ',
  )}): string => \`${root}${rawPath.replace('{', '${')}\`;`;
};
