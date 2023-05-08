export interface ValidatedOpenaApiSchema {
  paths: Array<ApiPath>;
  components: {
    schemas: ApiSchemas;
  };
}

type Verbs = 'get' | 'post' | 'put' | 'delete';

type ApiPath = {
  [key in Verbs]: ApiOperation;
};

interface ApiOperation {
  operationId: string;
  summary: string;
  description: string;
  parameters: Array<ApiRouteParameter>;
  requestBody: ApiContent & { required: boolean };
  responses: {
    [key: string]: ApiContent & { description: string };
  };
}

export interface ApiRouteParameter {
  name: string;
  required: boolean;
  in: 'path';
  schema: ApiTypeDefinition;
}

export interface ApiContent {
  content:
    | {
        'application/json': {
          schema: ApiConditionalUnionTypeDefinition;
        };
      }
    | {
        'multipart/form-data': {
          schema: ApiConditionalUnionTypeDefinition;
        };
      };
}

export interface ApiSchemas {
  [key: string]: {
    type: string;
    properties: {
      [key: string]: ApiConditionalUnionTypeDefinition;
    };
    required: Array<string>;
  };
}

export type ApiConditionalUnionTypeDefinition =
  | ApiTypeDefinition
  | { oneOf: Array<ApiTypeDefinition> }
  | { allOf: Array<ApiTypeDefinition> }
  | { payload: ApiTypeDefinition };

export interface ApiTypeDefinition {
  type?: string;
  $ref?: string;
  properties?: ApiConditionalUnionTypeDefinition;
  items?: ApiTypeDefinition;
  required?: Array<string>;
  enum?: Array<string>;
  example?:
    | Record<string, unknown>
    | Array<unknown>
    | string
    | number
    | boolean;
}
