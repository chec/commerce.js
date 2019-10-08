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
    ecmaVersion: 9,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
