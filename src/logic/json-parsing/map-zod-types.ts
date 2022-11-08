export const mapZodTypes = (type: string): string => {
  switch (type) {
    case 'integer':
      return 'number';
    default:
      return type;
  }
};
