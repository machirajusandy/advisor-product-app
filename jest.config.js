/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('ts-jest').JestConfigWithTsJest} */
const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  preset: "@shelf/jest-mongodb",
  transform: tsjPreset.transform,
  setupFilesAfterEnv: ["./setupTests.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  watchPathIgnorePatterns: ["globalConfig"],
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  testPathIgnorePatterns: ["<rootDir>/dist/"],
};
