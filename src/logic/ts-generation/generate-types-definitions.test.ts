import { execSync } from 'child_process';

import { remove, writeFile } from 'fs-extra';
import { mocked } from 'ts-jest/utils';

import swaggerJson from '../../tests-related/mock-data/swagger.json';
import { transpileRaw } from '../../tests-related/ts/transpile-raw';
import { ApiJson } from '../../types/swagger-schema.interfaces';
import { generateTypesDefinitions } from './generate-types-definitions';

jest.mock('fs-extra');
jest.mock('child_process');

const expectWriteFileCallToContain = (index: number, regex: RegExp): void => {
  const rawResult = mocked(writeFile).mock.calls[index][1];
  expect(regex.test(rawResult)).toBe(true);
};

const expectWriteFileCallToMatchTimes = (
  index: number,
  regex: RegExp,
  count: number,
): void => {
  const rawResult = mocked(writeFile).mock.calls[index][1];
  const arr = (rawResult as string).match(regex) || [];
  expect(arr).toHaveLength(count);
};

describe('generateTypesDefinitions function', () => {
  const json = swaggerJson as unknown as ApiJson;

  beforeEach(() => jest.clearAllMocks());

  it('should generate all the types', async () => {
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

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
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

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
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const reExportingRegex = /import { .* } from '.\/..\/api-types';\n\n/;
    expectWriteFileCallToContain(0, reExportingRegex);
    expectWriteFileCallToContain(1, reExportingRegex);
    expectWriteFileCallToContain(2, reExportingRegex);
    expectWriteFileCallToContain(3, reExportingRegex);
    expectWriteFileCallToContain(4, reExportingRegex);
  });

  it('should generate jsdoc for each endpoint', async () => {
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

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
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const exportsRegex = /(.*export type Response[0-9]{3} = .*;)/g;
    expectWriteFileCallToMatchTimes(0, exportsRegex, 3);
    expectWriteFileCallToMatchTimes(1, exportsRegex, 3);
    expectWriteFileCallToMatchTimes(2, exportsRegex, 3);
    expectWriteFileCallToMatchTimes(3, exportsRegex, 3);
    expectWriteFileCallToMatchTimes(4, exportsRegex, 3);
  });

  it('should export the request body type if any', async () => {
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

    expect(writeFile).toHaveBeenCalledTimes(6);

    const requestBodyExportsRegex = /export type RequestBody = .*\n/;
    expectWriteFileCallToContain(0, requestBodyExportsRegex);
  });

  it('should generate valid typescript for types', async () => {
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

    expect(writeFile).toHaveBeenCalledTimes(6);
    const rawResult = mocked(writeFile).mock.calls[5][1];
    const transpilationResult = await transpileRaw(rawResult);
    expect(transpilationResult).toHaveLength(0);
  });

  it('should not clear output path', async () => {
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

    expect(remove).toHaveBeenCalledTimes(0);
  });

  it('should clear output path', async () => {
    await generateTypesDefinitions('API_URL', json, 'out', true, false);

    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('should not use the linter', async () => {
    await generateTypesDefinitions('API_URL', json, 'out', false, false);

    expect(execSync).toHaveBeenCalledTimes(0);
  });

  it('should use the linter to format files', async () => {
    await generateTypesDefinitions('API_URL', json, 'out', false, true);

    expect(execSync).toHaveBeenCalledTimes(1);
  });
});
