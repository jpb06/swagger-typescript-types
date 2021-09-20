import axios from 'axios';

import { InputSwaggerJson } from '../../types/input-swagger-json.interface';

export const fetchSwaggerJson = async (
  url: string,
): Promise<InputSwaggerJson> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error('Unable to fetch swagger json');
  }
};
