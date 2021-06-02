module.exports = {
  extends: ['@ubic/eslint-config/react'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/no-danger': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
  overrides: [
    {
      files: [
        '**/*.stories.*',
      ],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
