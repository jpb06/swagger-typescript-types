/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
   preset: "ts-jest",
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
      "!<rootDir>/src/tests-related/**"
   ],
   modulePathIgnorePatterns: ['<rootDir>/dist']
};