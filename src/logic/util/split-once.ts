export const splitOnce = (input: string, on: string) => {
  const [first, ...rest] = input.split(on);
  return [first, rest.length > 0 ? rest.join(on) : null];
};
