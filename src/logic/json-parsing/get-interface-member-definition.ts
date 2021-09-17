import { ApiTypeDefinition } from '../../types/swagger-schema.interfaces';
import { getSchemaName } from './get-schema-name';

const getItemDefinition = (property: ApiTypeDefinition): string => {
  if (property.type === 'array' && property.items) {
    if (property.items.$ref !== undefined) {
      return `Array<${getSchemaName(property.items.$ref)}>`;
    } else if (property.items.type !== undefined) {
      return `Array<${property.items.type}>`;
    }
  } else if (property.$ref) {
    return `${getSchemaName(property.$ref)}`;
  }

  return `${property.type}`;
};

export const getInterfaceMemberDefinition = (
  propName: string,
  required: Array<string>,
  propertyDescription: ApiTypeDefinition | { oneOf: Array<ApiTypeDefinition> },
): string => {
  const prop = `  ${propName}${required.includes(propName) ? '' : '?'}`;

  if ('oneOf' in propertyDescription) {
    return `${prop}: ${propertyDescription.oneOf
      .map((el) => getItemDefinition(el))
      .join(' | ')};\n`;
  }

  return `${prop}: ${getItemDefinition(propertyDescription)};\n`;
};
