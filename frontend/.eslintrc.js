module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs,ts,tsx}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    "plugins": [
        "react",
        "eslint-plugin-import",
        "simple-import-sort",
        'react-hooks',
        '@typescript-eslint',
        'prettier'
    ],
    "rules": {
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "variable",
                "format": ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"]
            }
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/space-before-function-paren": "off",
        "eqeqeq": ["error", "smart"],
        "import/no-deprecated": "warn",
        "no-debugger": "error",
        "no-var": "error",
        "prefer-const": "error",
        "no-duplicate-imports": "error",
        "no-useless-rename": "error",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "semi": "off",
        "@typescript-eslint/semi": ["error"],
        'prettier/prettier': 'error',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        "react/prop-types": 0
    }
}
