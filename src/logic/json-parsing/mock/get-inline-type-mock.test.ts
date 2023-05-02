import { ApiTypeDefinition } from '../../../types/swagger-schema.interfaces';
import { WithRequiredProperty } from '../../../types/with-required-property.type';

import { getInlineTypeMock } from './get-inline-type-mock';

describe('getInlineTypeMock function', () => {
  it('should return members mock', () => {
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

  it('should return members mock with nested object', () => {
    const input: WithRequiredProperty<
      ApiTypeDefinition,
      'properties' | 'required'
    > = {
      properties: {
        lastAllowedStep: {
          type: 'string',
          enum: [
            'WELCOME',
            'JOBS',
            'SPECIALTIES',
            'ADDRESS',
            'RADIUS',
            'DOCUMENT',
            'COMPLETED',
          ],
          nullable: true,
        },
        status: {
          type: 'string',
          enum: ['NEW', 'PENDING_REVIEW', 'ACCEPTED', 'DECLINED', 'NONE'],
        },
        type: {
          type: 'string',
          enum: ['JOIN', 'UPDATE', 'NONE'],
        },
      } as never,
      required: [],
    };

    const result = getInlineTypeMock(input);

    const members = `{
  lastAllowedStep: 'WELCOME',
  status: 'NEW',
  type: 'JOIN',
}`;

    expect(result).toBe(members);
  });

  it('should return members mock with nested array', () => {
    const input: WithRequiredProperty<
      ApiTypeDefinition,
      'properties' | 'required'
    > = {
      properties: {
        type: {
          type: 'object',
        },
        params: {
          oneOf: [
            {
              $ref: '#/components/schemas/WebhookDispatcherParamsBodyDto',
            },
            {
              $ref: '#/components/schemas/EmailDispatcherParamsBodyDto',
            },
          ],
        },
      } as never,
      required: ['type', 'params'],
    };

    const result = getInlineTypeMock(input);

    const members = `{
  type: {"some unknown object":"please add an example in the DTO to remove this warning"},
  params: mockWebhookDispatcherParamsBodyDto,
}`;

    expect(result).toBe(members);
  });

  it('should return members mock with allOf prop', () => {
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

    const result = getInlineTypeMock(input);

    const members = `{
  priceRange: mockPriceRange,
}`;

    expect(result).toBe(members);
  });
});
