import { ApiRouteParameter } from '../../types/swagger-schema.interfaces';
import { getSchemaName } from './get-schema-name';

export const getRoutePath = (
  rawPath: string,
  parameters: Array<ApiRouteParameter>,
) => {
  const pathParameters = parameters.filter((el) => el.in === 'path');
  if (pathParameters.length === 0) {
    return `export const path = '${rawPath}';`;
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
  )}): string => \`${rawPath.replace('{', '${')}\`;`;
};
