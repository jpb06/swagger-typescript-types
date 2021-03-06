import { readJson } from 'fs-extra';

import { InputSwaggerJson } from '../../types/input-swagger-json.interface';

export const readSwaggerJsonFile = async (
  inputPath: string,
): Promise<InputSwaggerJson> => {
  try {
    const data = await readJson(inputPath);
    return data;
  } catch (err) {
    throw new Error('Unable to read swagger file');
  }
};
