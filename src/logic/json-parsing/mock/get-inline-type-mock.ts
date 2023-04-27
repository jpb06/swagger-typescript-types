import { ApiTypeDefinition } from '../../../types/swagger-schema.interfaces';
import { WithRequiredProperty } from '../../../types/with-required-property.type';

import { getInterfaceMemberMock } from './get-interface-member-mock';

export const getInlineTypeMock = (
  property: WithRequiredProperty<ApiTypeDefinition, 'properties' | 'required'>,
): string => {
  let type = '{\n';

  for (const [objectPropName, objectProperty] of Object.entries(
    property.properties,
  )) {
    type += `${getInterfaceMemberMock(
      objectPropName,
      property.required,
      objectProperty,
    )}`;
  }

  type += '}';

  return type;
};
