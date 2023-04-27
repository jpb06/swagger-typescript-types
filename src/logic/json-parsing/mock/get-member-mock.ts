import { ApiTypeDefinition } from '../../../types/swagger-schema.interfaces';
import { displayWarning } from '../../cli/console/console.messages';

import { getArrayMemberMock } from './get-array-member-mock';
import { getExampleFromEnum } from './get-example-from-enum';
import { getExampleFromType } from './get-example-from-type';
import { getInlineTypeMock } from './get-inline-type-mock';
import { getMockObjectNameFromPath } from './get-mock-object-name';

export const getMemberMock = (
  propName: string,
  property: ApiTypeDefinition,
): string | undefined => {
  if (property.$ref) {
    return `${getMockObjectNameFromPath(property.$ref)}`;
  }

  if (property.type) {
    if (
      property.type === 'object' &&
      property.properties &&
      property.required
    ) {
      return getInlineTypeMock(property as never);
    }

    if (property.type === 'array' && property.items) {
      return getArrayMemberMock(propName, property as never);
    }

    if (property.enum) {
      return getExampleFromEnum(propName, property.enum);
    }

    return getExampleFromType(propName, property.type);
  }

  displayWarning(
    `Unable to extract type from ${propName}; no $ref or type provided`,
  );
  return undefined;
};
