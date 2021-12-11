/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  preset: "ts-jest",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  coverageReporters: [
    "json-summary",
    "text",
    "lcov"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/dist/",
    "!<rootDir>/src/index.ts",
    "!<rootDir>/src/cli/generate-types-from-url.cli.ts",
    "!<rootDir>/src/workflows/generate-types-from-url.ts",
    "!<rootDir>/src/tests-related/**"
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist']
};