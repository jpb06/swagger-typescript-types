import { ApiSchemas } from '../../types/swagger-schema.interfaces';

import { getInterfaceMemberDefinition } from './get-interface-member-definition';

export const getTypesDefinitions = (schemas: ApiSchemas): string => {
  let types = '';

  for (const [typeName, { properties, required }] of Object.entries(schemas)) {
    types += `export interface ${typeName} {\n`;

    for (const [propName, property] of Object.entries(properties)) {
      types += getInterfaceMemberDefinition(propName, required, property);
    }

    types += '}\n';
  }

  return types;
};
