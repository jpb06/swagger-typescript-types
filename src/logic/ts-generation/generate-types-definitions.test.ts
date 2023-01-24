import { writeFile } from 'fs-extra';

import { generateTypesDefinitions } from './generate-types-definitions';
import swaggerJsonWithMissingRouteName from '../../tests-related/mock-data/swagger-with-missing-routename.json';
import swaggerWithoutSuccessTypeJson from '../../tests-related/mock-data/swagger-without-success-type.json';
import swaggerWithoutTypesJson from '../../tests-related/mock-data/swagger-without-types.json';
import swaggerJson from '../../tests-related/mock-data/swagger.json';
import { transpileRaw } from '../../tests-related/ts/transpile-raw';
import { ValidatedOpenaApiSchema } from '../../types/swagger-schema.interfaces';

jest.mock('fs-extra');

const expectWriteFileCallToContain = (index: number, regex: RegExp): void => {
  const rawResult = jest.mocked(writeFile).mock.calls[index][1];
  expect(rawResult).toMatch(regex);
};

const expectToContainSuccessAndError = (
  index: number,
  successExport: string,
  errorExport: string,
): void => {
  const rawResult = jest.mocked(writeFile).mock.calls[index][1];
  expect(rawResult).toContain(successExport);
  expect(rawResult).toContain(errorExport);
};

describe('generateTypesDefinitions function', () => {
  global.console = { error: jest.fn() } as unknown as Console;
  const json = swaggerJson as unknown as ValidatedOpenaApiSchema;
  const outPath = './src/api';

  beforeEach(() => jest.clearAllMocks());

  it('should generate all the types', async () => {
    const result = await generateTypesDefinitions(outPath, json, false);

    expect(result).toStrictEqual({
      typesGenerated: true,
      endpointsCount: 5,
    });

    expect(writeFile).toHaveBeenCalledTimes(6);
    const rawResult = jest.mocked(writeFile).mock.calls[5][1] as string;

    expect(
      rawResult.startsWith('/* eslint-disable */\n/* tslint:disable */\n\n'),
    ).toBeTruthy();

    const exports = rawResult
      .split('/* eslint-disable */\n/* tslint:disable */\n\n')[1]
      .split('export ')
      .filter((el) => el !== '');

    expect(exports[0]).toBe('interface LoginBodyDto {\n  token: string;\n}\n');
    expect(exports[1]).toBe(
      'interface LoginResultDataDto {\n  token: string;\n}\n',
    );
    expect(exports[2]).toBe(
      'interface LoginResultDto {\n  data: LoginResultDataDto;\n}\n',
    );
    expect(exports[3]).toBe(
      'interface ApiResponseDto {\n  statusCode: number;\n  message: string;\n}\n',
    );
    expect(exports[4]).toBe(
      'interface ChapterMemberDto {\n' +
        '  idUser: number;\n' +
        '  userFullName: string;\n' +
        '  userEmail: string;\n' +
        '  userPictureUrl: string;\n' +
        '  role?: string;\n' +
        '}\n',
    );
    expect(exports[5]).toBe(
      'interface ChapterWithMembersDto {\n' +
        '  id: number;\n' +
        '  name: string;\n' +
        '  members: Array<ChapterMemberDto>;\n' +
        '}\n',
    );
    expect(exports[6]).toBe(
      'interface ChaptersWithMembersResultDto {\n' +
        '  data: Array<ChapterWithMembersDto>;\n' +
        '}\n',
    );
    expect(exports[7]).toBe(
      'interface DiscussionDto {\n' +
        '  id: number;\n' +
        '  idUser: number;\n' +
        '  userFullName: string;\n' +
        '  userEmail: string;\n' +
        '  comment: string;\n' +
        '  link: string;\n' +
        '  createdAt: string;\n' +
        '}\n',
    );
    expect(exports[8]).toBe(
      'interface SubjectWithDiscussionsDto {\n' +
        '  id: number;\n' +
        '  title: string;\n' +
        '  details: string;\n' +
        '  link: string;\n' +
        '  createdAt: string;\n' +
        '  closedAt: string;\n' +
        '  answer: string;\n' +
        '  chapterId: number;\n' +
        '  chapterName: string;\n' +
        '  discussion: Array<DiscussionDto>;\n' +
        '}\n',
    );
    expect(exports[9]).toBe(
      'interface SubjectsResultDto {\n  data: Array<SubjectWithDiscussionsDto>;\n}\n',
    );
    expect(exports[10]).toBe(
      'interface NewSubjectDto {\n' +
        '  idChapter: number;\n' +
        '  title: string;\n' +
        '  details: string;\n' +
        '  link: string;\n' +
        '}\n',
    );
    expect(exports[11]).toBe(
      'interface SubjectDto {\n' +
        '  id: number;\n' +
        '  title: string;\n' +
        '  details: string;\n' +
        '  link: string;\n' +
        '  createdAt: string;\n' +
        '  closedAt: string;\n' +
        '  answer: string;\n' +
        '  chapterId: number;\n' +
        '  chapterName: string;\n' +
        '}\n',
    );
    expect(exports[12]).toBe(
      'interface CreateSubjectResultDto {\n  data: SubjectDto;\n}\n',
    );
  });

  it('should export one path variable by exposed endpoint', async () => {
    await generateTypesDefinitions(outPath, json, false);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const pathExportRegex =
      /(export const path = `.*`;)|(export const getPath = (.*) => `.*`;)/;
    expectWriteFileCallToContain(0, pathExportRegex);
    expectWriteFileCallToContain(1, pathExportRegex);
    expectWriteFileCallToContain(2, pathExportRegex);
    expectWriteFileCallToContain(3, pathExportRegex);
    expectWriteFileCallToContain(4, pathExportRegex);
  });

  it('should import related types for each exposed endpoint', async () => {
    await generateTypesDefinitions(outPath, json, false);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const reExportingRegex = /import { .* } from '.\/..\/api-types';\n\n/;
    expectWriteFileCallToContain(0, reExportingRegex);
    expectWriteFileCallToContain(1, reExportingRegex);
    expectWriteFileCallToContain(2, reExportingRegex);
    expectWriteFileCallToContain(3, reExportingRegex);
    expectWriteFileCallToContain(4, reExportingRegex);
  });

  it('should use the import type syntax for imports', async () => {
    await generateTypesDefinitions(outPath, json, true);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const reExportingRegex = /import type { .* } from '.\/..\/api-types';\n\n/;
    expectWriteFileCallToContain(0, reExportingRegex);
    expectWriteFileCallToContain(1, reExportingRegex);
    expectWriteFileCallToContain(2, reExportingRegex);
    expectWriteFileCallToContain(3, reExportingRegex);
    expectWriteFileCallToContain(4, reExportingRegex);
  });

  it('should not include the api-types import', async () => {
    await generateTypesDefinitions(
      outPath,
      swaggerWithoutTypesJson as unknown as ValidatedOpenaApiSchema,
      false,
    );

    expect(writeFile).toHaveBeenCalledTimes(1);
    expect(jest.mocked(writeFile).mock.calls.join('')).not.toContain(
      `from './../api-types';`,
    );
  });

  it('should set success and error types as never', async () => {
    await generateTypesDefinitions(
      outPath,
      swaggerWithoutSuccessTypeJson as unknown as ValidatedOpenaApiSchema,
      false,
    );

    expect(writeFile).toHaveBeenCalledTimes(1);

    const output = jest.mocked(writeFile).mock.calls.join('');

    expect(output).toContain('export type LoginSuccess = never;');
    expect(output).toContain('export type LoginError = never;');
  });

  it('should generate jsdoc for each endpoint', async () => {
    await generateTypesDefinitions(outPath, json, false);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const jsDocRegex =
      /\/\*\* .*\n.*\* method: .*\n.*\* summary: .*\n.*\* description: .*\n.*\n\n/;
    expectWriteFileCallToContain(0, jsDocRegex);
    expectWriteFileCallToContain(1, jsDocRegex);
    expectWriteFileCallToContain(2, jsDocRegex);
    expectWriteFileCallToContain(3, jsDocRegex);
    expectWriteFileCallToContain(4, jsDocRegex);
  });

  it('should export one type by response', async () => {
    await generateTypesDefinitions(outPath, json, false);

    expect(writeFile).toHaveBeenCalledTimes(6);

    expectToContainSuccessAndError(
      0,
      'export type LoginSuccess = LoginResultDto;',
      'export type LoginError = ApiResponseDto;',
    );
    expectToContainSuccessAndError(
      1,
      'export type GetChaptersWithMembersSuccess = ChaptersWithMembersResultDto;',
      'export type GetChaptersWithMembersError = ApiResponseDto;',
    );
    expectToContainSuccessAndError(
      2,
      'export type GetSubjectsSuccess = SubjectsResultDto;',
      'export type GetSubjectsError = ApiResponseDto;',
    );
    expectToContainSuccessAndError(
      3,
      'export type GetChaptersSubjectsSuccess = SubjectsResultDto;',
      'export type GetChaptersSubjectsError = ApiResponseDto;',
    );
    expectToContainSuccessAndError(
      4,
      'export type CreateSubjectSuccess = CreateSubjectResultDto;',
      'export type CreateSubjectError = ApiResponseDto;',
    );
  });

  it('should export the request body type if any', async () => {
    await generateTypesDefinitions(outPath, json, false);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const requestBodyExportsRegex = /export type RequestBody = .*\n/;
    expectWriteFileCallToContain(0, requestBodyExportsRegex);
  });

  it('should generate valid typescript for types', async () => {
    await generateTypesDefinitions(outPath, json, false);

    expect(writeFile).toHaveBeenCalledTimes(6);
    const rawResult = jest.mocked(writeFile).mock.calls[5][1];
    const transpilationResult = await transpileRaw(rawResult);
    expect(transpilationResult).toHaveLength(0);
  });

  it('should display a warning if route has no name', async () => {
    await generateTypesDefinitions(
      outPath,
      swaggerJsonWithMissingRouteName as unknown as ValidatedOpenaApiSchema,
      false,
    );

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledTimes(1);
  });

  it('should not write anything', async () => {
    const result = await generateTypesDefinitions(
      outPath,
      {
        components: { schemas: {} },
        paths: [],
      },
      false,
    );

    expect(result).toStrictEqual({
      typesGenerated: false,
      endpointsCount: 0,
    });

    expect(writeFile).toHaveBeenCalledTimes(0);
  });
});
