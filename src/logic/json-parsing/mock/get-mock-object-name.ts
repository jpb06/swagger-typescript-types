export const getMockObjectName = (typeName: string): string =>
  `mock${typeName}`;

export const getMockObjectNameFromPath = (path: string): string =>
  getMockObjectName(path.substring(path.lastIndexOf('/') + 1));
