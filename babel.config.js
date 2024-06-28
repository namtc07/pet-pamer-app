module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    ['babel-plugin-react-docgen-typescript', { exclude: 'node_modules' }],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './components',
          '@context': './context',
        },
      },
    ],
  ],
};
