module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'react-hooks', 'prettier', 'jsx-a11y', 'import'],
  env: {
    jest: true,
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-shadow': ['off'],
    'react/no-children-prop': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',

    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': 'warn',
    'no-undef': 'error',
    'no-restricted-syntax': ['error'],
  },
  ignorePatterns: ['node_modules/**'],
};
