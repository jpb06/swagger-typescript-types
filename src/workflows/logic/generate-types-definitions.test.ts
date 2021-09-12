import { writeFile } from 'fs-extra';
import { mocked } from 'ts-jest/utils';

import swaggerJson from '../../tests-related/mock-data/swagger.json';
import { transpileRaw } from '../../tests-related/ts/transpile-raw';
import { ApiJson } from '../../types/swagger-schema.interfaces';
import { generateTypesDefinitions } from './generate-types-definitions';

jest.mock('fs-extra');

describe('generateTypesDefinitions function', () => {
  const json = swaggerJson as unknown as ApiJson;

  beforeEach(() => jest.clearAllMocks());

  it('should generate all the types', async () => {
    await generateTypesDefinitions(json, 'out');

    expect(writeFile).toHaveBeenCalledTimes(1);
    const rawResult = mocked(writeFile).mock.calls[0][1];
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

  it('should generate valid typescript', async () => {
    await generateTypesDefinitions(json, 'out');

    expect(writeFile).toHaveBeenCalledTimes(1);
    const rawResult = mocked(writeFile).mock.calls[0][1];
    const transpilationResult = await transpileRaw(rawResult);
    expect(transpilationResult).toHaveLength(0);
  });
});
