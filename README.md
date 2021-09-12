# swagger-typescript-types

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/jpb06/swagger-typescript-types)
![Coverage](./badges/coverage-global%20coverage.svg)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_swagger-typescript-types&metric=coverage)](https://sonarcloud.io/dashboard?id=jpb06_swagger-typescript-types)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_swagger-typescript-types&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=jpb06_swagger-typescript-types)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_swagger-typescript-types&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=jpb06_swagger-typescript-types)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_swagger-typescript-types&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpb06_swagger-typescript-types)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/swagger-typescript-types/Main%20workflow?label=last%20workflow&logo=github-actions)
![Last commit](https://img.shields.io/github/last-commit/jpb06/swagger-typescript-types?logo=git)

## :zap: Purpose

Here is a little utility to generate typescript artifacts from swagger. This can be useful when you want to sync types between your backend and your frontend.

For example, we have [this backend](https://workshop-react-back.herokuapp.com/) exposing a swagger. The `/devs/by-squads` route returns an array of `DevDto` which is a model described in swagger.

Now, I could just write the interface for it myself in the frontend codebase 🤔, right? This is simple enough in our example:

```typescript
export interface DevDto {
  id: number;
  firstName: string;
  squad: number;
}
```

But what if we could just extract these models and generate types instead? Oh...! 😏

## :zap: Installation

To install, use either yarn or npm:

```bash
yarn add -D swagger-typescript-types
```

```bash
npm i -D swagger-typescript-types
```

## :zap: Typical use

Let's add a script to our package.json:

```json
{
  "scripts": {
    "api:sync": "generateTypesFromUrl https://workshop-react-back.herokuapp.com/-json ./src/api.types.ts"
  }
}
```

The `generateTypesFromUrl` task takes two arguments:

1️⃣ The url of the json exposed by our swagger.

2️⃣ Where to write our extracted types.

Our task will do a few things using these arguments when called:

✔️ Fetch the json exposed by our swagger (exposed in our example at the `-json` path).

✔️ Validate the json retrieved against [openapiv3 schema](https://github.com/APIDevTools/openapi-schemas).

✔️ Extract models and generate typings from them.

✔️ Write them on the path defined as second argument.

## :zap: Api

On top of the cli, the package exposes the following functions, in case you would like to be on your own:

### :diamonds: Functions

#### :black_circle: fetchSwaggerJson

This function fetches the swagger json using axios. Typical use:

```typescript
await fetchSwaggerJson('https://workshop-react-back.herokuapp.com/-json');
```

#### :black_circle: validateSchema

This function validates some arbitrary json against the [openapiv3 schema](https://github.com/APIDevTools/openapi-schemas). Typically use:

```typescript
const data: any = { ... };
const schema = await validateSchema(data);
```

#### :black_circle: generateTypesDefinitions

This function extracts models from the swagger json and generates typings from them. Typical use:

```typescript
const schema: ApiJson = { ... };
await generateTypesDefinitions(schema, './src/api.types.ts');
```
