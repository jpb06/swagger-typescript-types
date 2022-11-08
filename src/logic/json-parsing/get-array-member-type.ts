import { ApiTypeDefinition } from '../../types/swagger-schema.interfaces';
import { WithRequiredProperty } from '../../types/with-required-property.type';
import { displayWarning } from '../cli/console/console.messages';
import { getInlineTypeDefinition } from './get-inline-type-definition';
import { getSchemaName } from './get-schema-name';

export const getArrayMemberType = (
  propName: string,
  property: WithRequiredProperty<ApiTypeDefinition, 'items'>,
): string | undefined => {
  if (property.items.$ref !== undefined) {
    return `Array<${getSchemaName(property.items.$ref)}>`;
  }

  if (
    property.items.type === 'object' &&
    property.items.properties &&
    property.items.required
  ) {
    return `Array<${getInlineTypeDefinition(property.items as never)}>`;
  }

  if (property.items.type !== undefined) {
    return `Array<${property.items.type}>`;
  }

  displayWarning(
    `Unable to extract type from ${propName}; given array without $ref or type`,
  );

  return undefined;
};
