import { ApiTypeDefinition } from '../../types/swagger-schema.interfaces';
import { WithRequiredProperty } from '../../types/with-required-property.type';

import { getInlineTypeDefinition } from './get-inline-type-definition';

describe('getInlineTypeDefinition function', () => {
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

    const result = getInlineTypeDefinition(input);

    const members = `{
  yolo: string;
  cool?: number;
  zod?: number;
}`;

    expect(result).toBe(members);
  });

  it('should return members definition with allOf', () => {
    const input: WithRequiredProperty<
      ApiTypeDefinition,
      'properties' | 'required'
    > = {
      properties: {
        priceRange: {
          description: 'Price range',
          example: {
            priceLow: 12,
            priceHigh: 35,
          },
          allOf: [
            {
              $ref: '#/components/schemas/PriceRange',
            },
          ],
        },
      } as never,
      required: ['priceRange'],
    };

    const result = getInlineTypeDefinition(input);

    const members = `{
  priceRange: PriceRange,
}`;

    expect(result).toBe(members);
  });
});
