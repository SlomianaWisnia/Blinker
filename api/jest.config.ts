export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  extensionsToTreatAsEsm: [".ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  verbose: true,
};