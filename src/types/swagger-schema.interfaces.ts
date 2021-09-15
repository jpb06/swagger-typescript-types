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
  parameters: Array<unknown>;
  requestBody: ApiRequestBody;
  responses: {
    [key: string]: ApiResponseDetails;
  };
}

interface ApiRequestBody {
  required: boolean;
  content: ApiResponseDetails;
}

export interface ApiResponseDetails {
  description: string;
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
      [key: string]: {
        type?: string;
        $ref?: string;
        items?: {
          $ref: string;
        };
      };
    };
    required: Array<string>;
  };
}
