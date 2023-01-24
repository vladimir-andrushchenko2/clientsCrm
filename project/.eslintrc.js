module.exports = {
  root: true,
  extends: ['airbnb-base'],
  env: {
    browser: true,
  },
  rules: {
    'no-underscore-dangle': ['error', {
      allowAfterThis: true,
    }],
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
