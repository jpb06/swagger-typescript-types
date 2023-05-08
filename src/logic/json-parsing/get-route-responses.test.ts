import { ApiContent } from '../../types/swagger-schema.interfaces';

import { getRouteResponses } from './get-route-responses';

describe('getRouteResponses function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  afterEach(() => jest.clearAllMocks());

  it('should return a primitive type', () => {
    const result = getRouteResponses('cool', {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      statusCode: '200',
      model: 'string',
      isPrimitiveModel: true,
    });
  });

  it('should return a custom type', () => {
    const result = getRouteResponses('cool', {
      '200': {
        content: {
          'application/json': {
            schema: {
              $ref: 'cool/Yolo',
            },
          },
        },
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      statusCode: '200',
      model: 'Yolo',
      isPrimitiveModel: false,
    });
  });

  it('should return an array containing primitive types', () => {
    const result = getRouteResponses('cool', {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'number',
              },
            },
          },
        },
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      statusCode: '200',
      model: 'Array<number>',
      isPrimitiveModel: true,
    });
  });

  it('should return an array containing custom types', () => {
    const result = getRouteResponses('cool', {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: 'yolo/bro/Cool',
              },
            },
          },
        },
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      statusCode: '200',
      model: 'Array<Cool>',
      underlyingModel: 'Cool',
      isPrimitiveModel: false,
    });
  });

  it('should warn when type could not be extracted at all', () => {
    const result = getRouteResponses('cool', {
      '200': {
        content: {
          'application/json': {
            schema: {},
          },
        },
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      statusCode: '200',
      model: 'never',
      isPrimitiveModel: true,
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should warn when type could not be extracted at all (no application/json)', () => {
    const result = getRouteResponses('cool', {
      '200': {} as ApiContent,
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      statusCode: '200',
      model: 'never',
      isPrimitiveModel: true,
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should warn when type could not be extracted for array', () => {
    const result = getRouteResponses('cool', {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {},
            },
          },
        },
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      statusCode: '200',
      model: 'never',
      isPrimitiveModel: true,
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should extract type from onOf', () => {
    const result = getRouteResponses('cool', {
      '200': {
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  $ref: 'yolo/Cool',
                },
                { type: 'array', items: { $ref: 'super/Bro' } },
              ],
            },
          },
        },
      },
    });

    expect(result).toHaveLength(2);
    expect(result[0]).toStrictEqual({
      statusCode: '200',
      model: 'Cool',
      isPrimitiveModel: false,
    });
    expect(result[1]).toStrictEqual({
      statusCode: '200',
      model: 'Array<Bro>',
      underlyingModel: 'Bro',
      isPrimitiveModel: false,
    });
  });
});
