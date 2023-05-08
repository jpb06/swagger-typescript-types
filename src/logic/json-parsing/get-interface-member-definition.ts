import {
  ApiConditionalUnionTypeDefinition,
  ApiTypeDefinition,
} from '../../types/swagger-schema.interfaces';

import { getMemberType } from './get-member-type';

export const getInterfaceMemberDefinition = (
  propName: string,
  required: Array<string>,
  property: ApiConditionalUnionTypeDefinition,
  isInlineType = false,
): string => {
  const prop = `  ${propName}${
    required && required.includes(propName) ? '' : '?'
  }`;

  if ((property as { oneOf: Array<ApiTypeDefinition> }).oneOf) {
    return `${prop}: ${(property as { oneOf: Array<ApiTypeDefinition> }).oneOf
      .map((el) => getMemberType(propName, el))
      .join(' | ')}${isInlineType ? ',' : ';'}\n`;
  }

  if ((property as { allOf: Array<ApiTypeDefinition> }).allOf) {
    return `${prop}: ${(property as { allOf: Array<ApiTypeDefinition> }).allOf
      .map((el) => getMemberType(propName, el))
      .join(' | ')}${isInlineType ? ',' : ';'}\n`;
  }

  return `${prop}: ${getMemberType(
    propName,
    property as ApiTypeDefinition,
  )};\n`;
};
