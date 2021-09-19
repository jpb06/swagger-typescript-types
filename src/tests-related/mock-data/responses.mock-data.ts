export const responsesMockData = [
  {
    statusCode: '200',
    model: 'UserDto',
    isPrimitiveModel: false,
  },
  {
    statusCode: '300',
    model: 'Array<YoloDto>',
    underlyingModel: 'YoloDto',
    isPrimitiveModel: false,
  },
  {
    statusCode: '400',
    model: 'string',
    isPrimitiveModel: true,
  },
  {
    statusCode: '500',
    model: 'Array<number>',
    underlyingModel: 'number',
    isPrimitiveModel: true,
  },
];
