module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint',"prettier"],
    "rules": {
        "prettier/prettier": "error"
    },
    extends: ['plugin:@typescript-eslint/recommended',"plugin:prettier/recommended","prettier"]
}