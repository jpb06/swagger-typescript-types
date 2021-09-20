export interface InputSwaggerJson {
  openapi?: string;
  info?: unknown;
  tags?: Array<string>;
  server?: Array<unknown>;
  components?: {
    schemas?: {
      [key: string]: unknown;
    };
  };
  paths?: {
    [key: string]: unknown;
  };
}
