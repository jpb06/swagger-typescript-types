import axios from 'axios';

export const fetchSwaggerJson = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error('Unable to fetch swagger json');
  }
};
