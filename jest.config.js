/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  logHeapUsage: true,
  transform: {
    '^.+\\.ts$': ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'] }],
  },
  moduleFileExtensions: ["js", "json", "ts"],
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
    "src/**/*.ts",
    "!<rootDir>/node_modules/",
    "!<rootDir>/dist/",
    "!<rootDir>/src/index.ts",
    "!<rootDir>/src/types/**",
    "!<rootDir>/src/cli/generate-types-from-url.cli.ts",
    "!<rootDir>/src/workflows/**",
    "!<rootDir>/src/tests-related/**"
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist']
};