module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
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
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "eslint-plugin-import",
        "simple-import-sort"
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
    }
}
