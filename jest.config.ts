module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    }
  },
};
