module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'class-methods-use-this': 'off',
    'nonblock-statement-body-position': ['error', 'any'],
    curly: ['error', 'multi'],
    indent: 'off',
  },
};
