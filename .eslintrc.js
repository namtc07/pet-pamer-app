module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'react-hooks', 'prettier', 'jsx-a11y', 'import'],
  rules: {
    'no-unused-vars': 'warn',
    'no-shadow': ['off'],
    'react/no-children-prop': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': ['off'],
    'import/no-unresolved': ['off'],
    'import/extensions': ['off'],
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'no-undef': ['error'],
    'react/destructuring-assignment': ['off'],
    'react/jsx-no-constructed-context-values': ['off'],
    'no-restricted-syntax': [
      'warn',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
  ignorePatterns: ['node_modules/**'],
};
