import { ApiTypeDefinition } from '../../../types/swagger-schema.interfaces';
import { WithRequiredProperty } from '../../../types/with-required-property.type';

import { getInlineTypeMock } from './get-inline-type-mock';

describe('getInlineTypeMock function', () => {
  it('should return members definition', () => {
    const input: WithRequiredProperty<
      ApiTypeDefinition,
      'properties' | 'required'
    > = {
      properties: {
        yolo: {
          type: 'string',
        },
        cool: {
          type: 'number',
        },
        zod: {
          type: 'integer',
        },
      } as never,
      required: ['yolo'],
    };

    const result = getInlineTypeMock(input);

    const members = `{
  yolo: 'yolo',
  cool: 123,
  zod: 123,
}`;

    expect(result).toBe(members);
  });
});
