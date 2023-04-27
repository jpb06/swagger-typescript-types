import { ApiSchemas } from '../../../types/swagger-schema.interfaces';

import { getInterfaceMemberMock } from './get-interface-member-mock';
import { getMockObjectName } from './get-mock-object-name';

export const getTypesMocks = (schemas: ApiSchemas): string => {
  let types = '';

  for (const [typeName, { properties, required }] of Object.entries(schemas)) {
    types += `import type { ${typeName} } from './api-types'\n`;

    types += `export const ${getMockObjectName(typeName)}: ${typeName} = {\n`;

    for (const [propName, property] of Object.entries(properties)) {
      types += getInterfaceMemberMock(propName, required, property);
    }

    types += '}\n';
  }

  return types;
};
