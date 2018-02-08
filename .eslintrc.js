module.exports = {
  extends: 'eslint-config-airbnb',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': 0,
  },
};
