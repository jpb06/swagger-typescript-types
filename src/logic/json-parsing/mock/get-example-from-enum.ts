export const getExampleFromEnum = (
  propName: string,
  _enum: string[],
): string => {
  return `'${_enum[0]}'`;
};
