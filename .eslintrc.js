module.exports = {
    extends: ['eslint-config-airbnb'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['react', 'json', 'html'],
    rules: {
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-quotes': ['error', 'prefer-single'],
        'jsx-a11y/no-noninteractive-tabindex': 0,
        'linebreak-style': 0,
    },
};
