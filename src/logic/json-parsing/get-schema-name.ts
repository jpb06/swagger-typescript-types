export const getSchemaName = (path: string): string =>
  path.substring(path.lastIndexOf('/') + 1);
