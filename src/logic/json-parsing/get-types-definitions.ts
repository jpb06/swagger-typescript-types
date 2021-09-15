import { ApiSchemas } from '../../types/swagger-schema.interfaces';
import { getSchemaName } from './get-schema-name';

export const getTypesDefinitions = (schemas: ApiSchemas) => {
  let typesDefinition = '';

  for (const [typeName, { properties, required }] of Object.entries(schemas)) {
    typesDefinition += `export interface ${typeName} {\n`;

    for (const [propName, { type, items, $ref }] of Object.entries(
      properties,
    )) {
      const prop = `  ${propName}${required.includes(propName) ? '' : '?'}`;

      if (type === 'array' && items) {
        if (items.$ref !== undefined) {
          typesDefinition += `${prop}: Array<${getSchemaName(items.$ref)}>;\n`;
        } else if (items.type !== undefined) {
          typesDefinition += `${prop}: Array<${items.type}>;\n`;
        }
      } else if ($ref) {
        typesDefinition += `${prop}: ${getSchemaName($ref)};\n`;
      } else {
        typesDefinition += `${prop}: ${type};\n`;
      }
    }

    typesDefinition += '}\n';
  }

  return typesDefinition;
};
