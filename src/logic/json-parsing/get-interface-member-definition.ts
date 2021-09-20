import {
  ApiConditionalUnionTypeDefinition,
  ApiTypeDefinition,
} from '../../types/swagger-schema.interfaces';
import { displayWarning } from '../cli/console/console.messages';
import { getSchemaName } from './get-schema-name';

const getItemDefinition = (
  propName: string,
  property: ApiTypeDefinition,
): string | undefined => {
  if (property.$ref) {
    return `${getSchemaName(property.$ref)}`;
  }

  if (property.type) {
    if (property.type === 'array' && property.items) {
      if (property.items.$ref !== undefined) {
        return `Array<${getSchemaName(property.items.$ref)}>`;
      } else if (property.items.type !== undefined) {
        return `Array<${property.items.type}>`;
      }

      displayWarning(
        `Unable to extract type from ${propName}; given array without $ref or type`,
      );
      return undefined;
    }

    return `${property.type}`;
  }

  displayWarning(
    `Unable to extract type from ${propName}; no $ref or type provided`,
  );
  return undefined;
};

export const getInterfaceMemberDefinition = (
  propName: string,
  required: Array<string>,
  property: ApiConditionalUnionTypeDefinition,
): string => {
  const prop = `  ${propName}${required.includes(propName) ? '' : '?'}`;

  if ('oneOf' in property) {
    return `${prop}: ${property.oneOf
      .map((el) => getItemDefinition(propName, el))
      .join(' | ')};\n`;
  }

  return `${prop}: ${getItemDefinition(propName, property)};\n`;
};
