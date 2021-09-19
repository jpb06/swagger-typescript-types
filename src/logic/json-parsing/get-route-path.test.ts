import { getRoutePath } from './get-route-path';

describe('getRoutePath function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  beforeEach(() => jest.clearAllMocks());

  it('should return a path constant', () => {
    const result = getRoutePath('API_URL', '/cool/bro', []);

    expect(result).toBe(
      'export const path = `${process.env.API_URL}/cool/bro`;',
    );
  });

  it('should return a getPath function with one primitive parameter', () => {
    const result = getRoutePath('API_URL', '/cool/{isCool}/bro', [
      {
        in: 'path',
        name: 'isCool',
        required: true,
        schema: {
          type: 'boolean',
        },
      },
    ]);

    expect(result).toBe(
      'export const getPath = (isCool: boolean): string => `${process.env.API_URL}/cool/${isCool}/bro`;',
    );
  });

  it('should return a getPath function with two primitives parameters including one optional', () => {
    const result = getRoutePath('API_URL', '/cool/{isCool}/{yolo}/bro', [
      {
        in: 'path',
        name: 'isCool',
        required: true,
        schema: {
          type: 'boolean',
        },
      },
      {
        in: 'path',
        name: 'yolo',
        required: false,
        schema: {
          type: 'string',
        },
      },
    ]);

    expect(result).toBe(
      'export const getPath = (isCool: boolean, yolo?: string): string => `${process.env.API_URL}/cool/${isCool}/${yolo}/bro`;',
    );
  });

  it('should return a getPath function with one custom type parameter', () => {
    const result = getRoutePath('API_URL', '/cool/{cool}/bro', [
      {
        in: 'path',
        name: 'cool',
        required: true,
        schema: {
          $ref: 'yolo/Cool',
        },
      },
    ]);

    expect(result).toBe(
      'export const getPath = (cool: Cool): string => `${process.env.API_URL}/cool/${cool}/bro`;',
    );
  });

  it('should return a getPath function with one array of primitives parameter', () => {
    const result = getRoutePath('API_URL', '/cool/{cool}/bro', [
      {
        in: 'path',
        name: 'cool',
        required: true,
        schema: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    ]);

    expect(result).toBe(
      'export const getPath = (cool: Array<number>): string => `${process.env.API_URL}/cool/${cool}/bro`;',
    );
  });

  it('should return a getPath function with one array of custom types parameter', () => {
    const result = getRoutePath('API_URL', '/cool/{cool}/bro', [
      {
        in: 'path',
        name: 'cool',
        required: true,
        schema: {
          type: 'array',
          items: {
            $ref: 'yolo/Cool',
          },
        },
      },
    ]);

    expect(result).toBe(
      'export const getPath = (cool: Array<Cool>): string => `${process.env.API_URL}/cool/${cool}/bro`;',
    );
  });

  it('should warn when array type could not be be computed', () => {
    const result = getRoutePath('API_URL', '/cool/{cool}/bro', [
      {
        in: 'path',
        name: 'cool',
        required: true,
        schema: {
          type: 'array',
          items: {},
        },
      },
    ]);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(result).toBe(
      'export const getPath = (cool: undefined): string => `${process.env.API_URL}/cool/${cool}/bro`;',
    );
  });

  it('should warn when type could not be be computed', () => {
    const result = getRoutePath('API_URL', '/cool/{cool}/bro', [
      {
        in: 'path',
        name: 'cool',
        required: true,
        schema: {},
      },
    ]);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(result).toBe(
      'export const getPath = (cool: undefined): string => `${process.env.API_URL}/cool/${cool}/bro`;',
    );
  });
});
