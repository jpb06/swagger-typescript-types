import { ApiTypeDefinition } from '../../../types/swagger-schema.interfaces';
import { WithRequiredProperty } from '../../../types/with-required-property.type';
import { displayWarning } from '../../cli/console/console.messages';
<<<<<<< HEAD
import { getInlineTypeDefinition } from '../get-inline-type-definition';
import { getExampleFromType } from './get-example-from-type';
=======

import { getExampleFromType } from './get-example-from-type';
import { getInlineTypeMock } from './get-inline-type-mock';
>>>>>>> 9c1a687 (chore: add mock example)
import { getMockObjectNameFromPath } from './get-mock-object-name';

export const getArrayMemberMock = (
  propName: string,
  property: WithRequiredProperty<ApiTypeDefinition, 'items'>,
): string | undefined => {
  if (property.items.$ref !== undefined) {
    return `[${getMockObjectNameFromPath(property.items.$ref)}]`;
  }

<<<<<<< HEAD
=======
  if (property.items.example) {
    try {
      return `${JSON.stringify(property.example)}`;
    } catch (_) {
      displayWarning(
        `Unable to stringify the example provided for ${propName}`,
      );
    }
  }

>>>>>>> 9c1a687 (chore: add mock example)
  if (
    property.items.type === 'object' &&
    property.items.properties &&
    property.items.required
  ) {
<<<<<<< HEAD
    return `[${getInlineTypeDefinition(property.items as never)}]`;
=======
    return `[${getInlineTypeMock(property.items as never)}]`;
>>>>>>> 9c1a687 (chore: add mock example)
  }

  if (property.items.type !== undefined) {
    return `[${getExampleFromType(propName, property.items.type)}]`;
  }

  displayWarning(
    `Unable to extract type from ${propName}; given array without $ref or type`,
  );

  return undefined;
};
