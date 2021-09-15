import { ApiRouteParameter } from '../../types/swagger-schema.interfaces';
import { BodyModel } from '../json-parsing/get-body-model';
import { RouteResponse } from '../json-parsing/get-route-responses';
import { getSchemaName } from '../json-parsing/get-schema-name';

const getRouteResponsesModels = (responses: Array<RouteResponse>) =>
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

const getRouteParametersModels = (parameters: Array<ApiRouteParameter>) =>
  parameters.reduce<Array<string>>((acc, curr) => {
    if (curr.schema.$ref !== undefined) {
      return [...acc, getSchemaName(curr.schema.$ref)];
    }
    if (curr.schema.items?.$ref !== undefined) {
      return [...acc, getSchemaName(curr.schema.items?.$ref)];
    }

    return acc;
  }, []);

export const getRouteModels = (
  responses: Array<RouteResponse>,
  parameters: Array<ApiRouteParameter>,
  bodyModel?: BodyModel,
) => {
  const responsesModels = getRouteResponsesModels(responses);
  const parametersModels = getRouteParametersModels(parameters);

  const models = [...responsesModels, ...parametersModels];

  if (bodyModel && !bodyModel.isPrimitiveModel) {
    models.push(bodyModel.underlyingModel ?? bodyModel.model);
  }

  return models;
};
