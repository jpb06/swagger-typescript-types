import axios from 'axios';
import { mocked } from 'ts-jest/utils';

import { fetchSwaggerJson } from './fetch-swagger-json-file';

jest.mock('axios');

describe('fetchSwaggerJson function', () => {
  it('should throw an error if fetching json failed', () => {
    mocked(axios.get).mockRejectedValueOnce('Oh no!');

    expect(fetchSwaggerJson('url')).rejects.toThrow(
      'Unable to fetch swagger json',
    );
  });

  it('should return json', async () => {
    const data = { cool: true };
    mocked(axios.get).mockResolvedValueOnce({ data });

    const json = await fetchSwaggerJson('url');

    expect(json).toStrictEqual(data);
  });
});