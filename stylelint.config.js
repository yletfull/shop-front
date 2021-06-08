module.exports = {
  extends: [
    '@ubic/stylelint-config',
    '@ubic/stylelint-config/modules',
    '@ubic/stylelint-config/scss',
  ],
  rules: {
    'scss/at-mixin-named-arguments': null,
    'scss/at-function-named-arguments': null,
    'order/order': null,
    'no-descending-specificity': null,
  },
};
