module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: ['plugin:vue/recommended', '@vue/prettier'],

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-v-html': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    'void': 'any',
                    normal: 'any',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
    },

    parserOptions: {
        parser: 'babel-eslint',
    },

    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],

    'extends': [
      'plugin:vue/recommended',
      '@vue/prettier',
      'plugin:vue/essential',
      '@vue/standard'
    ]
}
