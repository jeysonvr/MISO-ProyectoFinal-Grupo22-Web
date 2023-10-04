module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "babel-jest"
  }
};
