import { ApiTypeDefinition } from '../../../types/swagger-schema.interfaces';
import { WithRequiredProperty } from '../../../types/with-required-property.type';
import { displayWarning } from '../../cli/console/console.messages';

import { getExampleFromType } from './get-example-from-type';
import { getInlineTypeMock } from './get-inline-type-mock';
import { getMockObjectNameFromPath } from './get-mock-object-name';

export const getArrayMemberMock = (
  propName: string,
  property: WithRequiredProperty<ApiTypeDefinition, 'items'>,
): string | undefined => {
  if (property.items.$ref !== undefined) {
    return `[${getMockObjectNameFromPath(property.items.$ref)}]`;
  }

  if (property.items.example) {
    try {
      return `${JSON.stringify(property.example)}`;
    } catch (_) {
      displayWarning(
        `Unable to stringify the example provided for ${propName}`,
      );
    }
  }

  if (
    property.items.type === 'object' &&
    property.items.properties &&
    property.items.required
  ) {
    return `[${getInlineTypeMock(property.items as never)}]`;
  }

  if (property.items.type !== undefined) {
    return `[${getExampleFromType(propName, property.items.type)}]`;
  }

  displayWarning(
    `Unable to extract type from ${propName}; given array without $ref or type`,
  );

  return undefined;
};
