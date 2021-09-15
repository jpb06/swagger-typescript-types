import { BodyModel } from '../json-parsing/get-body-model';

export const getRouteInputsExports = (bodyModel?: BodyModel) => {
  if (bodyModel) {
    return `export type RequestBody = ${bodyModel.model};\n\n`;
  }

  return '';
};
