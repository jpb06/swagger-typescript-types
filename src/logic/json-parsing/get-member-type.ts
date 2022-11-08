import { ApiTypeDefinition } from '../../types/swagger-schema.interfaces';
import { displayWarning } from '../cli/console/console.messages';
import { getInlineTypeDefinition } from './get-inline-type-definition';
import { getSchemaName } from './get-schema-name';
import { mapZodTypes } from './map-zod-types';

export const getMemberType = (
  propName: string,
  property: ApiTypeDefinition,
): string | undefined => {
  if (property.$ref) {
    return `${getSchemaName(property.$ref)}`;
  }

  if (property.type) {
    if (
      property.type === 'object' &&
      property.properties &&
      property.required
    ) {
      return getInlineTypeDefinition(property as never);
    }

    if (property.type === 'array' && property.items) {
      if (property.items.$ref !== undefined) {
        return `Array<${getSchemaName(property.items.$ref)}>`;
      } else if (
        property.items.type === 'object' &&
        property.items.properties &&
        property.items.required
      ) {
        return `Array<${getInlineTypeDefinition(property.items as never)}>`;
      } else if (property.items.type !== undefined) {
        return `Array<${property.items.type}>`;
      }

      displayWarning(
        `Unable to extract type from ${propName}; given array without $ref or type`,
      );
      return undefined;
    }

    if (property.enum) {
      return property.enum.map((el) => `'${el}'`).join(' | ');
    }

    return mapZodTypes(property.type);
  }

  displayWarning(
    `Unable to extract type from ${propName}; no $ref or type provided`,
  );
  return undefined;
};
