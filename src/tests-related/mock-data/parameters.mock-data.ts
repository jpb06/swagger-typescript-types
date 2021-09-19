import { ApiRouteParameter } from '../../types/swagger-schema.interfaces';

export const parametersMockData: Array<ApiRouteParameter> = [
  {
    in: 'path',
    name: 'user',
    required: true,
    schema: {
      $ref: 'yolo/UserDto',
    },
  },
  {
    in: 'path',
    name: 'ref',
    required: false,
    schema: {
      type: 'string',
    },
  },
  {
    in: 'path',
    name: 'rights',
    required: true,
    schema: {
      type: 'array',
      items: {
        $ref: 'path/RightDto',
      },
    },
  },
  {
    in: 'path',
    name: 'optionsIds',
    required: true,
    schema: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
];
