import { writeFile } from 'fs-extra';
import { mocked } from 'ts-jest/utils';

import swaggerJsonWithMissingRouteName from '../../tests-related/mock-data/swagger-with-missing-routename.json';
import swaggerJson from '../../tests-related/mock-data/swagger.json';
import { transpileRaw } from '../../tests-related/ts/transpile-raw';
import { ValidatedOpenaApiSchema } from '../../types/swagger-schema.interfaces';
import { generateTypesDefinitions } from './generate-types-definitions';

jest.mock('fs-extra');

const expectWriteFileCallToContain = (index: number, regex: RegExp): void => {
  const rawResult = mocked(writeFile).mock.calls[index][1];
  expect(rawResult).toMatch(regex);
};

const expectToContainSuccessAndError = (
  index: number,
  successExport: string,
  errorExport: string,
): void => {
  const rawResult = mocked(writeFile).mock.calls[index][1];
  expect(rawResult).toContain(successExport);
  expect(rawResult).toContain(errorExport);
};

describe('generateTypesDefinitions function', () => {
  global.console = { error: jest.fn() } as unknown as Console;
  const json = swaggerJson as unknown as ValidatedOpenaApiSchema;
  const outPath = './src/api';

  beforeEach(() => jest.clearAllMocks());

  it('should generate all the types', async () => {
    const result = await generateTypesDefinitions('API_URL', outPath, json);

    expect(result).toStrictEqual({
      typesGenerated: true,
      endpointsCount: 5,
    });

    expect(writeFile).toHaveBeenCalledTimes(6);
    const rawResult = mocked(writeFile).mock.calls[5][1];
    const interfaces = (rawResult as string)
      .split('export ')
      .filter((el) => el !== '');

    expect(interfaces[0]).toBe(
      'interface LoginBodyDto {\n  token: string;\n}\n',
    );
    expect(interfaces[1]).toBe(
      'interface LoginResultDataDto {\n  token: string;\n}\n',
    );
    expect(interfaces[2]).toBe(
      'interface LoginResultDto {\n  data: LoginResultDataDto;\n}\n',
    );
    expect(interfaces[3]).toBe(
      'interface ApiResponseDto {\n  statusCode: number;\n  message: string;\n}\n',
    );
    expect(interfaces[4]).toBe(
      'interface ChapterMemberDto {\n' +
        '  idUser: number;\n' +
        '  userFullName: string;\n' +
        '  userEmail: string;\n' +
        '  userPictureUrl: string;\n' +
        '  role?: string;\n' +
        '}\n',
    );
    expect(interfaces[5]).toBe(
      'interface ChapterWithMembersDto {\n' +
        '  id: number;\n' +
        '  name: string;\n' +
        '  members: Array<ChapterMemberDto>;\n' +
        '}\n',
    );
    expect(interfaces[6]).toBe(
      'interface ChaptersWithMembersResultDto {\n' +
        '  data: Array<ChapterWithMembersDto>;\n' +
        '}\n',
    );
    expect(interfaces[7]).toBe(
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
    expect(interfaces[8]).toBe(
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
    expect(interfaces[9]).toBe(
      'interface SubjectsResultDto {\n  data: Array<SubjectWithDiscussionsDto>;\n}\n',
    );
    expect(interfaces[10]).toBe(
      'interface NewSubjectDto {\n' +
        '  idChapter: number;\n' +
        '  title: string;\n' +
        '  details: string;\n' +
        '  link: string;\n' +
        '}\n',
    );
    expect(interfaces[11]).toBe(
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
    expect(interfaces[12]).toBe(
      'interface CreateSubjectResultDto {\n  data: SubjectDto;\n}\n',
    );
  });

  it('should export one path variable by exposed endpoint', async () => {
    await generateTypesDefinitions('API_URL', outPath, json);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const pathExportRegex =
      /(export const path = `\${process\.env\.API_URL}.*`;)|(export const getPath = (.*) => `\${process\.env\.API_URL}.*`;)/;
    expectWriteFileCallToContain(0, pathExportRegex);
    expectWriteFileCallToContain(1, pathExportRegex);
    expectWriteFileCallToContain(2, pathExportRegex);
    expectWriteFileCallToContain(3, pathExportRegex);
    expectWriteFileCallToContain(4, pathExportRegex);
  });

  it('should import related types for each exposed endpoint', async () => {
    await generateTypesDefinitions('API_URL', outPath, json);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const reExportingRegex = /import { .* } from '.\/..\/api-types';\n\n/;
    expectWriteFileCallToContain(0, reExportingRegex);
    expectWriteFileCallToContain(1, reExportingRegex);
    expectWriteFileCallToContain(2, reExportingRegex);
    expectWriteFileCallToContain(3, reExportingRegex);
    expectWriteFileCallToContain(4, reExportingRegex);
  });

  it('should generate jsdoc for each endpoint', async () => {
    await generateTypesDefinitions('API_URL', outPath, json);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const jsDocRegex =
      /\/\*\* .*\n.*\* verb: .*\n.*\* summary: .*\n.*\* description: .*\n.*\n\n/;
    expectWriteFileCallToContain(0, jsDocRegex);
    expectWriteFileCallToContain(1, jsDocRegex);
    expectWriteFileCallToContain(2, jsDocRegex);
    expectWriteFileCallToContain(3, jsDocRegex);
    expectWriteFileCallToContain(4, jsDocRegex);
  });

  it('should export on type by response', async () => {
    await generateTypesDefinitions('API_URL', outPath, json);

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
    await generateTypesDefinitions('API_URL', outPath, json);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const requestBodyExportsRegex = /export type RequestBody = .*\n/;
    expectWriteFileCallToContain(0, requestBodyExportsRegex);
  });

  it('should generate valid typescript for types', async () => {
    await generateTypesDefinitions('API_URL', outPath, json);

    expect(writeFile).toHaveBeenCalledTimes(6);
    const rawResult = mocked(writeFile).mock.calls[5][1];
    const transpilationResult = await transpileRaw(rawResult);
    expect(transpilationResult).toHaveLength(0);
  });

  it('should display a warning if route has no name', async () => {
    await generateTypesDefinitions(
      'API_URL',
      outPath,
      swaggerJsonWithMissingRouteName as unknown as ValidatedOpenaApiSchema,
    );

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledTimes(1);
  });

  it('should not write anything', async () => {
    const result = await generateTypesDefinitions('API_URL', outPath, {
      components: { schemas: {} },
      paths: [],
    });

    expect(result).toStrictEqual({
      typesGenerated: false,
      endpointsCount: 0,
    });

    expect(writeFile).toHaveBeenCalledTimes(0);
  });
});
