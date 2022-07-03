import { readJson } from 'fs-extra';
import { mocked } from 'jest-mock';

import { readSwaggerJsonFile } from './read-swagger-json-file';

jest.mock('fs-extra');

describe('fetchSwaggerJson function', () => {
  const path = './path';

  it('should throw an error if json reading failed', async () => {
    mocked(readJson).mockRejectedValueOnce('Oh no!' as never);

    await expect(readSwaggerJsonFile(path)).rejects.toThrow(
      'Unable to read swagger file',
    );
  });

  it('should return json', async () => {
    const data = { cool: true };
    mocked(readJson).mockResolvedValueOnce(data as never);

    const json = await readSwaggerJsonFile(path);

    expect(json).toStrictEqual(data);
  });
});
