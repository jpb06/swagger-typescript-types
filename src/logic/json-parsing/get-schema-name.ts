export const getSchemaName = (path: string): string => {
  try {
    return path.substring(path.lastIndexOf('/') + 1);
  } catch (err) {
    console.error(path, err);
    throw err;
  }
};
