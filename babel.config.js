module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['module-resolver',{
    root: ['.'],
    alias: {
      '@components': './src/components',
      '@hooks': './src/hooks',
        },
  }],
   'react-native-reanimated/plugin',
],
};
