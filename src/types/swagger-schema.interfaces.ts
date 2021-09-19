export interface ApiJson {
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
  content: {
    'application/json': {
      schema: ApiTypeDefinition;
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
  | { oneOf: Array<ApiTypeDefinition> };

export interface ApiTypeDefinition {
  type?: string;
  $ref?: string;
  items?: {
    $ref?: string;
    type?: string;
  };
}
