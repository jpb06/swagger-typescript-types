# swagger-typescript-types

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/hublo/swagger-typescript-types)
![npm bundle size](https://img.shields.io/bundlephobia/min/swagger-typescript-types)
![Github workflow](https://img.shields.io/github/actions/workflow/status/hublo/swagger-typescript-types/tests-scan.yml?branch=master&logo=github-actions&label=last%20workflow)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=hublo_swagger-typescript-types)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=hublo_swagger-typescript-types)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=security_rating)](https://sonarcloud.io/dashboard?id=hublo_swagger-typescript-types)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=hublo_swagger-typescript-types)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=coverage)](https://sonarcloud.io/dashboard?id=hublo_swagger-typescript-types)
![Coverage](./badges/coverage-jest%20coverage.svg)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=hublo_swagger-typescript-types)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=hublo_swagger-typescript-types)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=code_smells)](https://sonarcloud.io/dashboard?id=hublo_swagger-typescript-types)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=bugs)](https://sonarcloud.io/summary/new_code?id=hublo_swagger-typescript-types)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=hublo_swagger-typescript-types)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/swagger-typescript-types?label=snyk%20vulnerabilities)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=hublo_swagger-typescript-types&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=hublo_swagger-typescript-types)
![Last commit](https://img.shields.io/github/last-commit/hublo/swagger-typescript-types?logo=git)

Generating typescript types from swagger.

<!-- readme-package-icons start -->

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/Pnpm-Dark.svg" /></a>&nbsp;<a href="https://axios-http.com/fr/docs/intro" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/Axios-Dark.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/CommitLint.Dark.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/Eslint-Dark.svg" /></a>&nbsp;<a href="https://jestjs.io/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/Jest.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/Prettier-Dark.svg" /></a>&nbsp;<a href="https://swc.rs/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/hublo/hublo/master/icons/Swc-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ Purpose

Here is a little utility to generate typescript artifacts from swagger. This can be useful when you want to sync types between your backend and your frontend.

For example, we have [this backend](https://devfriends-backend.fly.dev) exposing a swagger. The `/devs/by-squads` route returns an array of `DevDto` which is a model described in swagger.

Now, I could just write the interface for it myself in the frontend codebase 🤔, right? This is simple enough in our example:

```typescript
export interface DevDto {
  id: number;
  idSquad: number;
  firstName: string;
  avatar: string;
}
```

But what if we could just extract these models and generate types instead? Oh...! 😏

### 🔶 Disclaimer

🚨 I wrote this for a stack based on [nestjs](https://nestjs.com/) for the backend and [react-query](https://react-query.tanstack.com/) for the frontend, so this tool may or may not suit your needs. If you think about another usecase, do not hesitate to drop an issue 🙃.

## ⚡ Installation

To install, use either yarn or npm:

```bash
yarn add -D swagger-typescript-types
```

```bash
npm i -D swagger-typescript-types
```

## ⚡ Typical use : cli

### 🔶 From an url

Let's say we have a backend exposing endpoints on this url: <https://devfriends-backend.fly.dev>.
Now, swagger exposes a json file on the [/-json](https://devfriends-backend.fly.dev/-json) path in this example.

Knowing this, we can add a script to our package.json:

```json
{
  "scripts": {
    "api:sync": "generateTypesFromUrl -u https://devfriends-backend.fly.dev/-json -o ./src/api/types [-t]"
  }
}
```

The `generateTypesFromUrl` task takes two arguments:

| name | description                                         | Example                                    |
| ---- | --------------------------------------------------- | ------------------------------------------ |
| u    | The url of the json exposed by the targeted swagger | <https://devfriends-backend.fly.dev/-json> |
| o    | Where to write our exposed types                    | ./src/api/types                            |

Optionally, you can use `-t` flag if you're using `importsNotUsedAsValues` in your tsconfig compiler options. It will generate imports like so:

```typescript
import type { ... } from ...
```

Our task will do a few things using these arguments when called:

```misc
✔️ Fetch the json exposed by our swagger (exposed in our example at the `-json` path).
✔️ Validate the json retrieved against [openapiv3 schema](https://github.com/APIDevTools/openapi-schemas).
✔️ Extract models and generate typings from them.
✔️ Write them on the path defined as second argument (./src/api/types/api-types.ts).
✔️ For each route, create a file containing the endpoint path and re-exporting parameters / request body / responses types.
✔️ Warn us if some specs are missing (missing response types, missing path parameters, etc.).
```

### 🔶 From a file

We can also generate types from a file:

```json
{
  "scripts": {
    "api:sync": "generateTypesFromFile -i ./specs/swagger.json -o ./src/api/types [-t]"
  }
}
```

The `generateTypesFromUrl` task takes two arguments:

| name | description                       | Example              |
| ---- | --------------------------------- | -------------------- |
| i    | The path of the swagger json file | ./specs/swagger.json |
| o    | Where to write our exposed types  | ./src/api/types      |

Optionally, you can use `-t` flag if you're using `importsNotUsedAsValues` in your tsconfig compiler options. It will generate imports like so:

```typescript
import type { ... } from ...
```

Again, our task will do the following:

```misc
✔️ Read the json file.
✔️ Validate it against [openapiv3 schema](https://github.com/APIDevTools/openapi-schemas).
✔️ Extract models and generate typings from it.
✔️ Write them on the path defined as second argument (./api-types.ts).
✔️ For each route, create a file containing the endpoint path and re-exporting parameters / request body / responses types.
✔️ Warn us if some specs are missing (missing response types, missing path parameters, etc.).
```

## ⚡ Generated files

Taking our example backend, let's check the files generated:

> ./api-types.ts

```Typescript
export interface SquadDto {
  id: number;
  name: string;
}
export interface AllSquadsResultDto {
  result: Array<SquadDto>;
}
export interface ApiResponseDto {
  statusCode: number;
  message: string;
}
export interface DevDto {
  id: number;
  idSquad: number;
  firstName: string;
  avatar: string;
}
export interface SquadsDevelopersResultDto {
  result: Array<DevDto>;
}
export interface BadRequestDto {
  statusCode: number;
  message: string | Array<string>;
  error: string;
}
export interface AllDevsResultDto {
  result: Array<DevDto>;
}
export interface ChangeSquadBodyDto {
  idDev: number;
  idSquad: number;
}
export interface ChangeSquadResultDto {
  result: string;
}
export interface DevelopersBySquadsBodyDto {
  idSquads: Array<number>;
}
export interface DevelopersBySquadsResultDto {
  result: Array<DevDto>;
}
```

Now let's check an [endpoint](https://devfriends-backend.fly.dev/#/squads/SquadsController_getSquadsDevelopers):

> ./SquadsController/getSquadsDevelopers.ts

```Typescript
/*
 * method: get
 * summary: Get the developers belonging to a squad
 * description: Retrieves the squad developers
 */

import { SquadsDevelopersResultDto, BadRequestDto, ApiResponseDto } from './../api-types';

export const getPath = (id: number): string => `/squads/${id}/devs`;

export type GetSquadsDevelopersSuccess = SquadsDevelopersResultDto;
export type GetSquadsDevelopersError = BadRequestDto | ApiResponseDto;
```

## ⚡ Api

On top of the cli, this package exposes the following functions:

### 🔶 Functions

#### 🌀 generateTypesFromUrl

This function generates types from a swagger exposed online. Typical use:

```typescript
const params = {
  swaggerJsonUrl: 'https://devfriends-backend.fly.dev/-json',
  outputPath './src/specs',
  importsNotUsedAsValues: false
};

const {
  typesGenerated, // boolean, specifies whether types have been extracted (./api-types.ts file)
  endpointsCount  // number of endpoints extracted
}: GenerationResult = await generateTypesFromUrl(params);
```

#### 🌀 generateTypesFromFile

This function generates types from a swagger json file. Typical use:

```typescript
const params = {
  inputPath: './src/api/swagger.json',
  outputPath './src/specs',
  importsNotUsedAsValues: false
};

const {
  typesGenerated, // boolean, specifies whether types have been extracted (./api-types.ts file)
  endpointsCount  // number of endpoints extracted
}: GenerationResult = await generateTypesFromFile(params);
```

#### 🌀 validateSchema

This function validates some arbitrary json against the [openapiv3 schema](https://github.com/APIDevTools/openapi-schemas). Typically use:

```typescript
const json: InputSwaggerJson = { ... };

const schema: ValidatedOpenaApiSchema = await validateSchema(data);
```

#### 🌀 generateTypesDefinitions

This function extracts models from the swagger json and generates typings from them. Typical use:

```typescript
const outPath = './src/api/types';
const schema: ValidatedOpenaApiSchema = { ... };
const importsNotUsedAsValues = true

await generateTypesDefinitions(outPath, schema, importsNotUsedAsValues);
```
