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
  schema: {
    $ref?: string;
    type?: string;
    items?: {
      $ref?: string;
      type?: string;
    };
  };
}

export interface ApiContent {
  content: {
    'application/json': {
      schema: {
        $ref?: string;
        type?: string;
        items?: {
          $ref?: string;
          type?: string;
        };
      };
    };
  };
}

export interface ApiSchemas {
  [key: string]: {
    type: string;
    properties: {
      [key: string]: ApiProperty;
    };
    required: Array<string>;
  };
}

export interface ApiProperty {
  type?: string;
  $ref?: string;
  items?: {
    $ref: string;
    type?: string;
  };
}
