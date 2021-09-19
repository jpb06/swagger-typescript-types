import { ApiRouteParameter } from '../../types/swagger-schema.interfaces';
import { BodyModel } from '../json-parsing/get-body-model';
import { RouteResponse } from '../json-parsing/get-route-responses';
import { getSchemaName } from '../json-parsing/get-schema-name';

const getRouteResponsesModels = (
  responses: Array<RouteResponse>,
): Array<string> =>
  responses.reduce<Array<string>>(
    (modelsList, { isPrimitiveModel, underlyingModel, model }) => {
      if (!isPrimitiveModel) {
        const modelToAdd = underlyingModel ?? model;
        if (modelsList.includes(modelToAdd)) {
          return modelsList;
        }

        return [...modelsList, modelToAdd];
      }

      return modelsList;
    },
    [],
  );

const getRouteParametersModels = (
  parameters: Array<ApiRouteParameter>,
): Array<string> =>
  parameters.reduce<Array<string>>((acc, curr) => {
    if (curr.schema.$ref !== undefined) {
      return [...acc, getSchemaName(curr.schema.$ref)];
    }
    if (curr.schema.items?.$ref !== undefined) {
      return [...acc, getSchemaName(curr.schema.items.$ref)];
    }

    return acc;
  }, []);

export const getRouteModels = (
  responses: Array<RouteResponse>,
  parameters: Array<ApiRouteParameter>,
  bodyModel?: BodyModel,
): Array<string> => {
  const parametersModels = getRouteParametersModels(parameters);
  const responsesModels = getRouteResponsesModels(responses);

  const models = [...parametersModels, ...responsesModels];

  if (bodyModel && !bodyModel.isPrimitiveModel) {
    models.unshift(bodyModel.underlyingModel ?? bodyModel.model);
  }

  return models;
};
