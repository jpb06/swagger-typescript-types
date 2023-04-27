import { ApiTypeDefinition } from '../../types/swagger-schema.interfaces';
import { WithRequiredProperty } from '../../types/with-required-property.type';

import { getInterfaceMemberDefinition } from './get-interface-member-definition';

export const getInlineTypeDefinition = (
  property: WithRequiredProperty<ApiTypeDefinition, 'properties' | 'required'>,
): string => {
  let type = '{\n';

  for (const [objectPropName, objectProperty] of Object.entries(
    property.properties,
  )) {
    type += `${getInterfaceMemberDefinition(
      objectPropName,
      property.required,
      objectProperty,
      true,
    )}`;
  }

  type += '}';

  return type;
};
