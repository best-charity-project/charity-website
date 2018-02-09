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
        'linebreak-style': [2, 'windows'],
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/no-noninteractive-tabindex': 0,
    },
};
