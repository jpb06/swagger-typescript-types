import { getInterfaceMemberMock } from './get-interface-member-mock';

describe('getInterfaceMemberMock function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  afterEach(() => jest.clearAllMocks());

  it('should return undefined if schema definition is missing', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {});

    expect(result).toBe('  cool: undefined,\n');
  });

  it('should return the matching example of a primitive type', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      type: 'string',
    });

    expect(result).toBe(`  cool: 'cool',\n`);
  });

  it('should return the mock object of a required custom type', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      $ref: 'yolo/Cool',
    });

    expect(result).toBe(`  cool: mockCool,\n`);
  });

  it('should return the mock Object of an optional custom type', () => {
    const result = getInterfaceMemberMock('cool', ['bro', 'yolo'], {
      $ref: 'yolo/Cool',
    });

    expect(result).toBe(`  cool: mockCool,\n`);
  });

  it('should return the matching example of an array of primitive types', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      type: 'array',
      items: {
        type: 'string',
      },
    });

    expect(result).toBe(`  cool: ['cool'],\n`);
  });

  it('should return an array of mock objects of an array of custom types', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      type: 'array',
      items: {
        $ref: 'yolo/Cool',
      },
    });

    expect(result).toBe(`  cool: [mockCool],\n`);
  });

  it('should return return undefined and warn if array type could not be computed', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      type: 'array',
      items: {},
    });

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(result).toBe(`  cool: undefined,\n`);
  });

  it('should return the first mock of an union type with ref', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      oneOf: [
        {
          $ref: 'yolo/Cool',
        },
        {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        {
          type: 'string',
        },
      ],
    });

    expect(result).toBe(`  cool: mockCool,\n`);
  });

  it('should return the first mock of an union type with number', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        {
          $ref: 'yolo/Cool',
        },
        {
          type: 'string',
        },
      ],
    });

    expect(result).toBe(`  cool: [123],\n`);
  });

  it('should handle inline types', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        {
          type: 'object',
          properties: {
            yolo: {
              type: 'string',
            },
            bro: {
              type: 'number',
            },
          } as never,
          required: ['yolo'],
        },
      ],
    });

    expect(result).toBe(`  cool: [123],\n`);
  });

  it('should handle inline types made of arrays', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              yolo: {
                type: 'string',
              },
              bro: {
                type: 'number',
              },
            } as never,
            required: ['yolo'],
          },
        },
      ],
    });

<<<<<<< HEAD
    expect(result).toBe(`  cool: [{\n  yolo: string;\n  bro?: number;\n}],\n`);
=======
    expect(result).toBe(`  cool: [{\n  yolo: 'yolo',\n  bro: 123,\n}],\n`);
>>>>>>> 9c1a687 (chore: add mock example)
  });

  it('should handle enum types', () => {
    const result = getInterfaceMemberMock('cool', ['cool'], {
      type: 'string',
      enum: ['yolo', 'bro'],
    });

    expect(result).toBe(`  cool: 'yolo',\n`);
  });
});
