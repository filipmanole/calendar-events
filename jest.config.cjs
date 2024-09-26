/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", { useESM: true }],
  },
  // moduleDirectories: ["node_modules", "src", "tests"],
  moduleNameMapper: {
    // 'absolute-path': 'relative-path'
    "graphql-request":
      "<rootDir>/node_modules/graphql-request/src/entrypoints/main.ts",
  },
};
