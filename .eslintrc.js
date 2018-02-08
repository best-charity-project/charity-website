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
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': [2, 'windows'],
  },
};
