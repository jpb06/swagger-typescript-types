import { parametersMockData } from '../../tests-related/mock-data/parameters.mock-data';
import { responsesMockData } from '../../tests-related/mock-data/responses.mock-data';

import { getRouteModels } from './get-route-models';

describe('getRouteModels function', () => {
  it('should return responses models', () => {
    const result = getRouteModels(responsesMockData, []);

    expect(result).toStrictEqual(['UserDto', 'YoloDto']);
  });

  it('should return parameters models', () => {
    const result = getRouteModels([], parametersMockData);

    expect(result).toStrictEqual(['UserDto', 'RightDto']);
  });

  it('should return body model', () => {
    const result = getRouteModels([], [], {
      isPrimitiveModel: false,
      model: 'UserDto',
    });

    expect(result).toStrictEqual(['UserDto']);
  });

  it('should return body underlying model', () => {
    const result = getRouteModels([], [], {
      isPrimitiveModel: false,
      model: 'Array<UserDto>',
      underlyingModel: 'UserDto',
    });

    expect(result).toStrictEqual(['UserDto']);
  });

  it('should return nothing', () => {
    const result = getRouteModels([], [], {
      isPrimitiveModel: true,
      model: 'Array<string>',
      underlyingModel: 'string',
    });

    expect(result).toStrictEqual([]);
  });
});
