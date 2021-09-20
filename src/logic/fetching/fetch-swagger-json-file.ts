import axios from 'axios';

import { SwaggerJson } from '../../types/swagger-json.interface';

export const fetchSwaggerJson = async (url: string): Promise<SwaggerJson> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error('Unable to fetch swagger json');
  }
};
