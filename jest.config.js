/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
  rootDir: 'tests',
  verbose: true,
  testRegex: '(/tests/unit/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    '**/src/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/tests/**',
  ],
};