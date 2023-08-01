import { getInterfaceMemberDefinition } from './get-interface-member-definition';

describe('getInterfaceMemberDefinition function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  afterEach(() => jest.clearAllMocks());

  it('should return undefined if schema definition is missin', () => {
    const result = getInterfaceMemberDefinition('cool', ['cool'], {});

    expect(result).toBe('  cool: undefined;\n');
  });

  it('should return the definition of a primitive type', () => {
    const result = getInterfaceMemberDefinition('cool', ['cool'], {
      type: 'string',
    });

    expect(result).toBe(`  cool: string;\n`);
  });

  it('should return the definition of a required custom type', () => {
    const result = getInterfaceMemberDefinition('cool', ['cool'], {
      $ref: 'yolo/Cool',
    });

    expect(result).toBe(`  cool: Cool;\n`);
  });

  it('should return the definition of an optional custom type', () => {
    const result = getInterfaceMemberDefinition('cool', ['bro', 'yolo'], {
      $ref: 'yolo/Cool',
    });

    expect(result).toBe(`  cool?: Cool;\n`);
  });

  it('should return the definition of an array of primitive types', () => {
    const result = getInterfaceMemberDefinition('cool', ['cool'], {
      type: 'array',
      items: {
        type: 'string',
      },
    });

    expect(result).toBe(`  cool: Array<string>;\n`);
  });

  it('should return the definition of an array of custom types', () => {
    const result = getInterfaceMemberDefinition('cool', ['cool'], {
      type: 'array',
      items: {
        $ref: 'yolo/Cool',
      },
    });

    expect(result).toBe(`  cool: Array<Cool>;\n`);
  });

  it('should return return undefined and warn if array type could not be computed', () => {
    const result = getInterfaceMemberDefinition('cool', ['cool'], {
      type: 'array',
      items: {},
    });

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(result).toBe(`  cool: undefined;\n`);
  });

  it('should return the definition of an union type', () => {
    const result = getInterfaceMemberDefinition('cool', ['cool'], {
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

    expect(result).toBe(`  cool: Cool | Array<number> | string;\n`);
  });

  it('should handle inline types', () => {
    const result = getInterfaceMemberDefinition(
      'cool',
      ['cool'],
      {
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
      },
      true,
    );

    expect(result).toBe(
      `  cool: Array<number> | {\n  yolo: string;\n  bro?: number;\n},\n`,
    );
  });

  it('should handle inline types made of arrays', () => {
    const result = getInterfaceMemberDefinition(
      'cool',
      ['cool'],
      {
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
      },
      true,
    );

    expect(result).toBe(
      `  cool: Array<{\n  yolo: string;\n  bro?: number;\n}>,\n`,
    );
  });

  it('should handle enum number types', () => {
    const result = getInterfaceMemberDefinition(
      'status',
      ['status'],
      {
        type: 'number',
        enum: [0, 1, 2],
      },
      true,
    );

    expect(result).toBe(`  status: 0 | 1 | 2;\n`);
  });

  it('should handle enum string types', () => {
    const result = getInterfaceMemberDefinition(
      'cool',
      ['cool'],
      {
        type: 'string',
        enum: ['yolo', 'bro'],
      },
      true,
    );

    expect(result).toBe(`  cool: 'yolo' | 'bro';\n`);
  });

  it('should handle heterogeneous enum number and string types', () => {
    const result = getInterfaceMemberDefinition(
      'status',
      ['status'],
      {
        type: 'string',
        enum: [0, 'a string value', 2],
      },
      true,
    );

    expect(result).toBe(`  status: 0 | 'a string value' | 2;\n`);
  });
});
