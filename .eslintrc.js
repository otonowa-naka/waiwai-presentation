module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions:{
        project:'./waiwai-web/tsconfig.json'
    },
    plugins:[
        '@typescript-eslint'
    ],
    extemds:[
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ]
}