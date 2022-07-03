import chalk from 'chalk';

import { getRoutePath } from './get-route-path';

jest.mock('chalk', () => ({
  cyanBright: jest.fn(),
  greenBright: jest.fn(),
  magentaBright: jest.fn(),
  redBright: jest.fn(),
  whiteBright: jest.fn(),
  underline: {
    cyanBright: jest.fn(),
  },
}));

describe('getRoutePath function', () => {
  global.console = { error: jest.fn() } as unknown as Console;

  const id = 'Controller_myRoute';
  const routeName = 'myRoute';

  beforeEach(() => jest.clearAllMocks());

  it('should return a path constant', () => {
    const result = getRoutePath(id, routeName, '/cool/bro', []);

    expect(result).toBe('export const path = `/cool/bro`;');
  });

  it('should return a getPath function with one primitive parameter', () => {
    const result = getRoutePath(id, routeName, '/cool/{isCool}/bro', [
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
      'export const getPath = (isCool: boolean): string => `/cool/${isCool}/bro`;',
    );
  });

  it('should return a getPath function with two primitives parameters including one optional', () => {
    const result = getRoutePath(id, routeName, '/cool/{isCool}/{yolo}/bro', [
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
      'export const getPath = (isCool: boolean, yolo?: string): string => `/cool/${isCool}/${yolo}/bro`;',
    );
  });

  it('should return a getPath function with one custom type parameter', () => {
    const result = getRoutePath(id, routeName, '/cool/{cool}/bro', [
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
      'export const getPath = (cool: Cool): string => `/cool/${cool}/bro`;',
    );
  });

  it('should return a getPath function with one array of primitives parameter', () => {
    const result = getRoutePath(id, routeName, '/cool/{cool}/bro', [
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
      'export const getPath = (cool: Array<number>): string => `/cool/${cool}/bro`;',
    );
  });

  it('should return a getPath function with one array of custom types parameter', () => {
    const result = getRoutePath(id, routeName, '/cool/{cool}/bro', [
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
      'export const getPath = (cool: Array<Cool>): string => `/cool/${cool}/bro`;',
    );
  });

  it('should warn when array type could not be be computed', () => {
    const result = getRoutePath(id, routeName, '/cool/{cool}/bro', [
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
      'export const getPath = (cool: never): string => `/cool/${cool}/bro`;',
    );
  });

  it('should warn when type could not be be computed', () => {
    const result = getRoutePath(id, routeName, '/cool/{cool}/bro', [
      {
        in: 'path',
        name: 'cool',
        required: true,
        schema: {},
      },
    ]);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(result).toBe(
      'export const getPath = (cool: never): string => `/cool/${cool}/bro`;',
    );
  });

  it('should display a warning when path parameters are missing', () => {
    const result = getRoutePath(id, routeName, '/cool/{story}/bro/{yolo}', []);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(chalk.redBright).toHaveBeenCalledWith(
      `Missing path param(s). Expecting 2 bug got 0`,
    );
    expect(result).toBe('export const path = `/cool/${story}/bro/${yolo}`;');
  });
});
