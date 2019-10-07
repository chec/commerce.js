module.exports = {
  env: {
    'es6': true,
    'browser': true,
  },
  extends: [
    'prettier',
  ],
  plugins: [
    'prettier',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
