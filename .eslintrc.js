module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    camelcase: 'off',
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
};
