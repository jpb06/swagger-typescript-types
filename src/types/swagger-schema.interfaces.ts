export interface ApiJson {
  paths: Array<ApiPath>;
  components: {
    schemas: ApiSchemas;
  };
}

interface ApiSchemas {
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

type Verbs = 'get' | 'post' | 'put' | 'delete';

type ApiPath = {
  [key in Verbs]: ApiOperation;
};

interface ApiOperation {
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

interface ApiResponseDetails {
  description: string;
  content: {
    'application/json': {
      schema: {
        $ref: string;
      };
    };
  };
}
