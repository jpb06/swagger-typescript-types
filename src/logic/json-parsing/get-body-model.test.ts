import { getBodyModel } from './get-body-model';

describe('getBodyModel function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  it('should return undefined if no request body', () => {
    const result = getBodyModel('myRoute', undefined);

    expect(result).toBeUndefined();
  });

  it('should return undefined if schema has no props', () => {
    const result = getBodyModel('myRoute', {
      content: {
        'application/json': {
          schema: {},
        },
      },
    });

    expect(result).toBeUndefined();
  });

  it('should return undefined if schema is an array whose items have no type definition', () => {
    const result = getBodyModel('myRoute', {
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {},
          },
        },
      },
    });

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should return schema name', () => {
    const result = getBodyModel('myRoute', {
      content: {
        'application/json': {
          schema: { $ref: 'yolo/Cool' },
        },
      },
    });

    expect(result).toStrictEqual({
      isPrimitiveModel: false,
      model: 'Cool',
    });
  });

  it('should return the schema type', () => {
    const type = 'string';
    const result = getBodyModel('myRoute', {
      content: {
        'application/json': {
          schema: {
            type,
          },
        },
      },
    });

    expect(result).toStrictEqual({
      isPrimitiveModel: true,
      model: type,
    });
  });

  it('should return the schema type on multipart schema', () => {
    const type = 'string';
    const result = getBodyModel('myRoute', {
      content: {
        'multipart/form-data': {
          schema: {
            type,
          },
        },
      },
    });

    expect(result).toStrictEqual({
      isPrimitiveModel: true,
      model: type,
    });
  });

  it('should return an array containing a custom type', () => {
    const result = getBodyModel('myRoute', {
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: 'bro/Cool',
            },
          },
        },
      },
    });

    expect(result).toStrictEqual({
      isPrimitiveModel: false,
      model: 'Array<Cool>',
      underlyingModel: 'Cool',
    });
  });

  it('should return an array containing a primitive type', () => {
    const type = 'string';
    const result = getBodyModel('myRoute', {
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type,
            },
          },
        },
      },
    });

    expect(result).toStrictEqual({
      isPrimitiveModel: true,
      model: `Array<${type}>`,
    });
  });
});
