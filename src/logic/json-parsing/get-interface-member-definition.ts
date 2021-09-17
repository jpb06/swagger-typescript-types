import { ApiProperty } from '../../types/swagger-schema.interfaces';
import { getSchemaName } from './get-schema-name';

export const getInterfaceMemberDefinition = (
  propName: string,
  required: Array<string>,
  { type, $ref, items }: ApiProperty,
): string => {
  const prop = `  ${propName}${required.includes(propName) ? '' : '?'}`;

  if (type === 'array' && items) {
    if (items.$ref !== undefined) {
      return `${prop}: Array<${getSchemaName(items.$ref)}>;\n`;
    } else if (items.type !== undefined) {
      return `${prop}: Array<${items.type}>;\n`;
    }
  } else if ($ref) {
    return `${prop}: ${getSchemaName($ref)};\n`;
  }

  return `${prop}: ${type};\n`;
};
