import { writeFile, ensureDir } from 'fs-extra';

import { GenerationResult } from '../../types/generation-result.interface';
import { ValidatedOpenaApiSchema } from '../../types/swagger-schema.interfaces';
import { displayWarning } from '../cli/console/console.messages';
import { getExposedEndpoints } from '../json-parsing/get-exposed-endpoints';
import { getRoutePath } from '../json-parsing/get-route-path';
import { getTypesDefinitions } from '../json-parsing/get-types-definitions';
import { splitOnce } from '../util/split-once';
import { getJsDoc } from './get-js-doc';
import { getRouteInputsExports } from './get-route-inputs-exports';
import { getRouteModels } from './get-route-models';
import { getRouteOutputsExports } from './get-route-outputs-exports';

export const generateTypesDefinitions = async (
  outPath: string,
  json: ValidatedOpenaApiSchema,
): Promise<GenerationResult> => {
  const typesDefinition = getTypesDefinitions(json.components.schemas);
  const endpoints = getExposedEndpoints(json);

  let endpointsCount = 0;
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
    const [controller, routeName] = splitOnce(id, '_');
    if (routeName === null) {
      displayWarning(`Missing route name in ${controller}`);
      continue;
    }

    const controllerPath = `${outPath}/${controller}`;
    await ensureDir(controllerPath);

    const models = getRouteModels(responses, parameters, bodyModel);
    const routePath = getRoutePath(id, routeName, rawPath, parameters);
    const inputsExports = getRouteInputsExports(bodyModel);
    const outputExports = getRouteOutputsExports(routeName, responses);
    const doc = getJsDoc(id, verb, summary, description);

    endpointsCount++;
    const maybeImport =
      models.length === 0
        ? ''
        : `import { ${models.join(', ')} } from './../api-types';\n\n`;
    await writeFile(
      `${controllerPath}/${routeName}.ts`,
      `/* eslint-disable */\n/* tslint:disable */\n\n${doc}\n\n${maybeImport}${routePath}\n\n${inputsExports}${outputExports}\n`,
    );
  }

  if (typesDefinition.length > 0) {
    await writeFile(
      `${outPath}/api-types.ts`,
      `/* eslint-disable */\n/* tslint:disable */\n\n${typesDefinition}`,
    );
  }

  return { typesGenerated: typesDefinition.length > 0, endpointsCount };
};
