import { writeFile, ensureDir } from 'fs-extra';

import { ApiJson } from '../../types/swagger-schema.interfaces';
import { outPath } from '../constants/out-path';
import { getExposedEndpoints } from '../json-parsing/get-exposed-endpoints';
import { getRoutePath } from '../json-parsing/get-route-path';
import { getTypesDefinitions } from '../json-parsing/get-types-definitions';
import { splitOnce } from '../util/split-once';
import { getJsDoc } from './get-js-doc';
import { getRouteInputsExports } from './get-route-inputs-exports';
import { getRouteModels } from './get-route-models';
import { getRouteOutputsExports } from './get-route-outputs-exports';

export const generateTypesDefinitions = async (
  envVarName: string,
  json: ApiJson,
): Promise<void> => {
  const typesDefinition = getTypesDefinitions(json.components.schemas);
  const endpoints = getExposedEndpoints(json);

  for (const {
    id,
    path: rawPath,
    verb,
    summary,
    description,
    parameters,
    bodyModel,
    responses,
  } of endpoints) {
    const [controller, route] = splitOnce(id, '_');

    const controllerPath = `${outPath}/${controller}`;
    await ensureDir(controllerPath);

    const models = getRouteModels(responses, parameters, bodyModel);
    const routePath = getRoutePath(envVarName, rawPath, parameters);
    const inputsExports = getRouteInputsExports(bodyModel);
    const outputExports = getRouteOutputsExports(responses);
    const doc = getJsDoc(id, verb, summary, description);

    await writeFile(
      `${controllerPath}/${route}.ts`,
      `${doc}\n\nimport { ${models.join(
        ', ',
      )} } from './../api-types';\n\n${routePath}\n\n${inputsExports}${outputExports}`,
    );
  }

  await writeFile(`${outPath}/api-types.ts`, typesDefinition);
};
