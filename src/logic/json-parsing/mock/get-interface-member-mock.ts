import {
  ApiConditionalUnionTypeDefinition,
  ApiTypeDefinition,
} from '../../../types/swagger-schema.interfaces';

import { getMemberMock } from './get-member-mock';

export const getInterfaceMemberMock = (
  propName: string,
  required: Array<string>,
  property: ApiConditionalUnionTypeDefinition,
): string => {
  const prop = `  ${propName}`;

  if ((property as { oneOf: Array<ApiTypeDefinition> }).oneOf) {
    return `${prop}: ${
      (property as { oneOf: Array<ApiTypeDefinition> }).oneOf.map((el) =>
        getMemberMock(propName, el),
      )[0]
    },\n`;
  }

<<<<<<< HEAD
=======
  if ((property as { allOf: Array<ApiTypeDefinition> }).allOf) {
    return `${prop}: ${
      (property as { allOf: Array<ApiTypeDefinition> }).allOf.map((el) =>
        getMemberMock(propName, el),
      )[0]
    },\n`;
  }

>>>>>>> 9c1a687 (chore: add mock example)
  return `${prop}: ${getMemberMock(
    propName,
    property as ApiTypeDefinition,
  )},\n`;
};
