import { writeFile } from 'fs-extra';

import { ApiJson } from '../../types/swagger-schema.interfaces';

const getSchemaName = (path: string) =>
  path.substring(path.lastIndexOf('/') + 1);

export const generateTypesDefinitions = async (
  json: ApiJson,
  outPath: string,
) => {
  let typesDefinition = '';

  Object.entries(json.components.schemas).forEach(
    ([typeName, { properties, required }]) => {
      typesDefinition += `export interface ${typeName} {\n`;

      Object.entries(properties).forEach(
        ([propName, { type, items, $ref }]) => {
          const prop = `  ${propName}${required.includes(propName) ? '' : '?'}`;

          if (type === 'array' && items && items.$ref !== undefined) {
            typesDefinition += `${prop}: Array<${getSchemaName(
              items.$ref,
            )}>;\n`;
          } else if ($ref) {
            typesDefinition += `${prop}: ${getSchemaName($ref as string)};\n`;
          } else {
            typesDefinition += `${prop}: ${type};\n`;
          }
        },
      );

      typesDefinition += '}\n';
    },
  );

  await writeFile(outPath, typesDefinition);
};
